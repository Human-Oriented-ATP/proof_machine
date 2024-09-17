import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.Jovan.Unification
import GadgetGameSolver.Jovan.ProofTree
import Lean

namespace JovanGadgetGame

open GadgetGame

inductive TermKey where
| var : Nat → TermKey
| app : String → Array TermKey → TermKey
deriving Inhabited, BEq, Hashable

/-- A goal in the tabled (type class) resolution. -/
structure GeneratorNode where
  goalId          : GoalId
  key             : TermKey
  mctx            : MetavarContext
  goalctx         : GoalContext
  axioms          : Array Axiom
  currInstanceIdx : Nat
  /--
  `goalHasMVars := true` if `goal` contains metavariables.
  We store this information to avoid searching for multiple solutions:
  We need to find at most one answer for this generator node if the type
  does not have metavariables.
  -/
  goalHasMVars    : Bool
  deriving Inhabited

structure ConsumerNode where
  goalId     : GoalId
  key        : TermKey
  mctx       : MetavarContext
  goalctx    : GoalContext
  subgoals   : List GoalId
  size       : Nat -- instance size so far
  deriving Inhabited

inductive Waiter where
  | consumerNode : ConsumerNode → Waiter
  | root         : Waiter

def Waiter.isRoot : Waiter → Bool
  | .consumerNode _ => false
  | .root           => true

/-!
  In tabled resolution, we creating a mapping from goals (e.g., `Coe Nat ?x`) to
  answers and waiters. Waiters are consumer nodes that are waiting for answers for a
  particular node.

  We implement this mapping using a `HashMap` where the keys are
  normalized Termessions. That is, we replace assignable metavariables
  with auxiliary free variables of the form `_tc.<idx>`. We do
  not declare these free variables in any local context, and we should
  view them as "normalized names" for metavariables. For example, the
  term `f ?m ?m ?n` is normalized as
  `f _tc.0 _tc.0 _tc.1`.

  This approach is structural, and we may visit the same goal more
  than once if the different occurrences are just definitionally
  equal, but not structurally equal.

  Remark: a metavariable is assignable only if its depth is equal to
  the metavar context depth.
-/


structure MkKeyState where
  nextIdx : Nat := 0
  map     : Std.HashMap String TermKey := {}

def toTermKey (e : Term) : StateM MkKeyState TermKey := do
  match e with
  | .var v =>
    let s ← get
    match s.map[v]? with
    | some e' => pure e'
    | none =>
      let e' := .var s.nextIdx
      set { s with nextIdx := s.nextIdx + 1, map := s.map.insert v e' }
      pure e'
  | .app f args =>
    let args ← args.attach.mapM fun ⟨x, _⟩ => toTermKey x
    return .app f args

/-- Remark: `mkTableKey` assumes `e` does not contain assigned metavariables. -/
def mkTableKey (e : Term) : TermKey :=
  toTermKey e |>.run' {}

structure Answer where
  proof : PartialProof
  goal  : Term
  size  : Nat
  deriving Inhabited

structure TableEntry where
  waiters : Array Waiter
  answers : Array Answer := #[]

structure Context where
  maxResultSize : Option Nat
  axioms        : Std.HashMap String (Array Axiom)

/--
  Remark: the SynthInstance.State is not really an extension of `Meta.State`.
  The field `postponed` is not needed, and the field `mctx` is misleading since
  `synthInstance` methods operate over different `MetavarContext`s simultaneously.
  That being said, we still use `extends` because it makes it simpler to move from
  `M` to `MetaM`.
-/
structure State where
  unique         : Nat := 1
  stepCount      : Nat := 0
  -- mctx           : MetavarContext  := {}
  result?        : Option PartialProof    := none
  generatorStack : Array GeneratorNode            := #[]
  resumeStack    : Array (ConsumerNode × Answer)  := #[]
  tableEntries   : Std.HashMap TermKey TableEntry := {}
  log            : Array String := #[]



abbrev SearchM := ReaderT Context $ StateRefT State $ StateRefT MetavarContext $ StateRefT GoalContext (EIO String)
instance : Inhabited (SearchM α) := ⟨throw default⟩

def getUnique : SearchM Nat := modifyGet fun s => (s.unique, { s with unique := s.unique + 1 })

def logMessage (msg : String) : SearchM Unit := modify fun s => { s with log := s.log.push msg }

def increment : SearchM Unit := modify fun s => { s with stepCount := s.stepCount + 1 }

/-- Return globals and locals instances that may unify with `goal` -/
def getAxioms (goal : Term) : SearchM (Array Axiom) := do
  let .app cls _ := goal | throw s!"goal is a metavariable: {goal}"
  match (← read).axioms[cls]? with
  | none => return #[]
  | some axioms => return axioms

def TermHasVars : Term → Bool
| .var _ => true
| .app _ args => args.attach.any fun ⟨x, _⟩ => TermHasVars x

def mkGeneratorNode? (key : TermKey) (goalId : GoalId) (goal : Term) : SearchM (Option GeneratorNode) := do
  let .app cls _ := goal | throw s!"goal is a metavariable: {goal}"
  match (← read).axioms[cls]? with
  | none => return none
  | some axioms =>
    let mctx ← getThe MetavarContext
    let goalctx ← getThe GoalContext
    return some {
      goalId, key, mctx, goalctx, axioms
      goalHasMVars := TermHasVars goal
      currInstanceIdx := axioms.size
    }

/--
  Create a new generator node for `mvar` and add `waiter` as its waiter.
  `key` must be `mkTableKey mctx mvarType`. -/
def newSubgoal (key : TermKey) (goalId : GoalId) (goal : Term) (waiter : Waiter) : SearchM Unit := do
    match ← mkGeneratorNode? key goalId goal with
    | none      => logMessage s!"no new subgoals for {← goalId.toString}"
    | some node =>
      let entry : TableEntry := { waiters := #[waiter] }
      logMessage s!"new goal {← goalId.toString}"
      modify fun s =>
       { s with
         generatorStack := s.generatorStack.push node
         tableEntries   := s.tableEntries.insert key entry }

def findEntry? (key : TermKey) : SearchM (Option TableEntry) := do
  return (← get).tableEntries[key]?

def getEntry (key : TermKey) : SearchM TableEntry := do
  match (← findEntry? key) with
  | none       => panic! "invalid key at synthInstance"
  | some entry => pure entry


partial def TermInstantiateFresh (extension : String) : Term → Term
  | .var v => .var s!"{v}_{extension}"
  | .app f args => .app f (args.map (TermInstantiateFresh extension))

def AxiomInstantiateFresh (extension : String) (ax : Axiom) : Axiom :=
  let { hypotheses, conclusion } := ax
    let conclusion := TermInstantiateFresh extension conclusion
    let hypotheses := hypotheses.map (TermInstantiateFresh extension)
    { hypotheses, conclusion }


/--
  Try to synthesize metavariable `mvar` using the instance `inst`.
  Remark: `mctx` is set using `withMCtx`.
  If it succeeds, the result is a new updated metavariable context and a new list of subgoals.
  A subgoal is created for each instance implicit parameter of `inst`. -/
def tryResolve (goalId : GoalId) (ax : Axiom) : SearchM (Option (List GoalId)) := do
  let ax := AxiomInstantiateFresh (toString (← getUnique)) ax
  logMessage s!"apply axiom {ax} to {← goalId.toString}"

  let goal ← goalId.getInstantiatedGoal
  if ← unify ax.conclusion goal then
    let goalIds ← ax.hypotheses.mapM fun hyp => do
      let goalId : GoalId ← getUnique
      modifyThe GoalContext  (·.insert goalId { goal := hyp, proof := none })
      pure goalId
    modifyThe GoalContext (·.insert goalId { goal, proof := some <| .node ax (goalIds.map .goal) })
    return some goalIds.toList
  logMessage "failed!"
  return none

/--
  Assign a precomputed answer to `mvar`.
  If it succeeds, the result is a new updated metavariable context and a new list of subgoals. -/
def tryAnswer (goalId : GoalId) (answer : Answer) : SearchM Bool := do
  let answerGoal := TermInstantiateFresh (toString (← getUnique)) answer.goal
  let goal ← goalId.getInstantiatedGoal
  if ← unify answerGoal goal then
    modifyThe GoalContext (·.insert goalId { goal, proof := answer.proof })
    pure true
  else
    pure false

/-- Move waiters that are waiting for the given answer to the resume stack. -/
def wakeUp (answer : Answer) : Waiter → SearchM Unit
  | .root               => do
    /- Recall that we now use `ignoreLevelMVarDepth := true`. Thus, we should allow solutions
       containing universe metavariables, and not check `answer.result.paramNames.isEmpty`.
       We use `openAbstractMVarsResult` to construct the universe metavariables
       at the correct depth. -/
    modify fun s => { s with result? := answer.proof }
  | .consumerNode cNode =>
    modify fun s => { s with resumeStack := s.resumeStack.push (cNode, answer) }

def isNewAnswer (oldAnswers : Array Answer) (answer : Answer) : Bool :=
  oldAnswers.all fun oldAnswer =>
    -- Remark: isDefEq here is too expensive. TODO: if `==` is too imprecise, add some light normalization to `resultType` at `addAnswer`
    -- iseq ← isDefEq oldAnswer.resultType answer.resultType; pure (!iseq)
    oldAnswer.goal != answer.goal

private def mkAnswer (cNode : ConsumerNode) : SearchM Answer := do
  let proof ← cNode.goalId.instantiatedProof
  let goal ← cNode.goalId.getInstantiatedGoal
  let goal ← goal.instantiateVars
  return { proof, goal, size := cNode.size + 1 }

/--
  Create a new answer after `cNode` resolved all subgoals.
  That is, `cNode.subgoals == []`.
  And then, store it in the tabled entries map, and wakeup waiters. -/
def addAnswer (cNode : ConsumerNode) : SearchM Unit := do
  if (← read).maxResultSize.any (cNode.size ≥ ·) then
    logMessage s!"{← cNode.goalId.toString} has size {cNode.size}, which is big"
    pure ()
    -- trace[Meta.synthInstance.answer] "{crossEmoji} {← instantiateMVars (← inferType cNode.mvar)}{Format.line}(size: {cNode.size} ≥ {(← read).maxResultSize})"
  else
    -- withTraceNode `Meta.synthInstance.answer
    --   (fun _ => return m!"{checkEmoji} {← instantiateMVars (← inferType cNode.mvar)}") do
    let answer ← mkAnswer cNode
    -- Remark: `answer` does not contain assignable or assigned metavariables.
    let key := cNode.key
    let { waiters, answers } ← getEntry key
    if isNewAnswer answers answer then
      let newEntry := { waiters, answers := answers.push answer }
      modify fun s => { s with tableEntries := s.tableEntries.insert key newEntry }
      waiters.forM (wakeUp answer)

/-- Process the next subgoal in the given consumer node. -/
def consume (cNode : ConsumerNode) : SearchM Unit := do
  /- Filter out subgoals that have already been assigned when solving typing constraints.
    This may happen when a local instance type depends on other local instances.
    For example, in Mathlib, we have
    ```
    @Submodule.setLike : {R : Type u_1} → {M : Type u_2} →
      [_inst_1 : Semiring R] →
      [_inst_2 : AddCommMonoid M] →
      [_inst_3 : @ModuleS R M _inst_1 _inst_2] →
      SetLike (@Submodule R M _inst_1 _inst_2 _inst_3) M
    ```
  -/
  match cNode.subgoals with
  | []      => logMessage s!"adding answer {← cNode.goalId.toString}"; addAnswer cNode
  | goalId :: _ =>
    let waiter := Waiter.consumerNode cNode
    let goal ← goalId.getInstantiatedGoal
    let key := mkTableKey goal
    match ← findEntry? key with
    | none       =>
      newSubgoal key goalId goal waiter
    | some entry =>
      logMessage s!"found key in table: {goal}."

      modify fun s =>
      { s with
        resumeStack  := entry.answers.foldl (fun s answer => s.push (cNode, answer)) s.resumeStack,
        tableEntries := s.tableEntries.insert key { entry with waiters := entry.waiters.push waiter } }

def getTop : SearchM GeneratorNode :=
  return (← get).generatorStack.back

@[inline] def modifyTop (f : GeneratorNode → GeneratorNode) : SearchM Unit :=
  modify fun s => { s with generatorStack := s.generatorStack.modify (s.generatorStack.size - 1) f }

/-- Try the next instance in the node on the top of the generator stack. -/
def generate : SearchM Unit := do
  let gNode ← getTop
  if gNode.currInstanceIdx == 0  then
    modify fun s => { s with generatorStack := s.generatorStack.pop }
  else
    let key    := gNode.key
    let idx    := gNode.currInstanceIdx - 1
    let ax     := gNode.axioms.get! idx
    let goalId := gNode.goalId
    set gNode.mctx
    set gNode.goalctx
    /- See comment at `typeHasMVars` -/
    -- unless gNode.goalHasMVars do
    --   if let some entry := (← get).tableEntries[key]? then
    --     if entry.answers.any fun answer => answer.result.numMVars == 0 then
    --       /-
    --       We already have an answer that:
    --         1. its result does not have metavariables.
    --         2. its types do not have metavariables.

    --       Thus, we can skip other solutions because we assume instances are "morally canonical".
    --       We have added this optimization to address issue #3996.

    --       Remark: Condition 1 is important since root nodes only take into account results
    --       that do **not** contain metavariables. This extra check was added to address issue #4213.
    --       -/
    --       modify fun s => { s with generatorStack := s.generatorStack.pop }
    --       return
    -- discard do withMCtx mctx do
      -- withTraceNode `Meta.synthInstance
      --   (return m!"{exceptOptionEmoji ·} apply {ax.val} to {← instantiateMVars (← inferType goal)}") do
    modifyTop fun gNode => { gNode with currInstanceIdx := idx }
    if let some subgoals ← tryResolve goalId ax then
      increment
      consume { key, goalId, subgoals, mctx := ← getThe MetavarContext, goalctx := ← getThe GoalContext, size := 0 }

def getNextToResume : SearchM (ConsumerNode × Answer) := do
  let r := (← get).resumeStack.back
  modify fun s => { s with resumeStack := s.resumeStack.pop }
  return r

/--
  Given `(cNode, answer)` on the top of the resume stack, continue execution by using `answer` to solve the
  next subgoal. -/
def resume : SearchM Unit := do
  let (cNode, answer) ← getNextToResume
  set cNode.mctx
  set cNode.goalctx
  match cNode.subgoals with
  | []         => panic! "resume found no remaining subgoals"
  | goalId::rest =>
    if ← tryAnswer goalId answer then
      logMessage s! "propagating answer {answer.goal} to subgoal {← goalId.toString}"
      -- withTraceNode `Meta.synthInstance.resume
      --   (fun _ => withMCtx cNode.mctx do
      --     return m!"propagating {← instantiateMVars answer.resultType} to subgoal {← instantiateMVars subgoal} of {← instantiateMVars goal}") do
      -- trace[Meta.synthInstance.resume] "size: {cNode.size + answer.size}"
      consume { cNode with
        subgoals := rest,
        mctx := ← getThe MetavarContext,
        goalctx := ← getThe GoalContext,
        size := cNode.size + answer.size }

def step : SearchM Bool := do
  let s ← get
  if !s.resumeStack.isEmpty then
    resume
    return true
  else if !s.generatorStack.isEmpty then
    generate
    return true
  else
    return false

def getResult : SearchM (Option Proof) := do
  (← get).result?.mapM (·.toProof)

def getPartialResult (goalId : GoalId) : SearchM ProofTree := do
  let proof ← goalId.instantiatedProof
  proof.toProofTree

partial def synth (timeout? : Option Nat) (goalId : GoalId) : SearchM ProofTree := do
  if (← step) then
    match (← getResult) with
    | none        =>
      increment
      let { stepCount, .. } ← get
      if let some timeout := timeout? then
        if timeout ≤ stepCount then
          getPartialResult goalId
        else
          synth timeout? goalId
      else
        synth timeout? goalId
    | some result => return result.toProofTree
  else
    getPartialResult goalId

def main (problemState : ProblemState) (timeout? : Option Nat) : BaseIO (ExceptT String Id ProofTree × Array String) := do
  let { axioms, target := goal } := problemState
  let axioms := axioms.foldl (init := {}) fun axioms ax =>
    if let .app cls _ := ax.conclusion then
      match axioms[cls]? with
      | none => axioms.insert cls #[ax]
      | some axs => axioms.insert cls (axs.push ax)
    else
      axioms
  let action : SearchM ProofTree := do
    let goalId : GoalId := 0
    modifyThe GoalContext (·.insert goalId { goal, proof := none })
    let key := mkTableKey goal
    try
      newSubgoal key goalId goal Waiter.root
      synth timeout? goalId
    catch e =>
      logMessage s!"error: {e}"
      getPartialResult goalId
  let ref ← IO.mkRef {}
  let r ← (action.run { maxResultSize := none, axioms }) ref |>.run' {} |>.run' {} |>.toBaseIO
  pure (r, (← ref.get).log)

def runJovanSearch (problemState : ProblemState) (timeout? : Option Nat := none) : BaseIO (ProofTree × Array String) := do
  pure <| match ← main problemState timeout? with
  | (.ok proof, log) => (proof, log)
  | _ => unreachable!


end JovanGadgetGame
