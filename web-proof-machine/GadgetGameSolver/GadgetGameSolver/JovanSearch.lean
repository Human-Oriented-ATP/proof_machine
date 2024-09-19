import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.Jovan.Unification
import GadgetGameSolver.Jovan.ProofTree
import Lean

namespace JovanGadgetGame

open GadgetGame

inductive TermKey where
| var : Nat → TermKey
| app : UInt64 → String → Array TermKey → TermKey
deriving Inhabited, BEq

instance : Hashable TermKey where
  hash
    | .var n => hash n
    | .app h _ _ => h

def TermKey.mkApp (f : String) (args : Array TermKey) : TermKey :=
  let hash := args.foldl (init := hash f) (mixHash · <| hash ·)
  .app hash f args

/-- A goal in the tabled (type class) resolution. -/
structure GeneratorNode where
  goalId          : GoalId
  key             : TermKey
  priority        : Nat
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
    return .mkApp f args

/-- Remark: `mkTableKey` assumes `e` does not contain assigned metavariables. -/
def mkTableKey (e : Term) : TermKey :=
  toTermKey e |>.run' {}

structure Answer where
  proof : LazyPartialProof
  goal  : Term
  size  : Nat
  deriving Inhabited

structure TableEntry where
  waiters : Array Waiter
  answers : Array Answer := #[]
  /-- The priority is a number at least 1, with 1 being the highest priority. -/
  priority : Nat

structure Context where
  maxResultSize : Option Nat
  axioms        : Std.HashMap String (Array Axiom)

structure State where
  uniqueNum      : Nat := 1
  stepCount      : Nat := 0
  result?        : Option PartialProof := none
  generatorStack : Array GeneratorNode            := #[]
  resumeStack    : Array (ConsumerNode × Answer)  := #[]
  tableEntries   : Std.HashMap TermKey TableEntry := {}
  log            : Array String := #[]
  time           : Nat := 0


abbrev SearchM := ReaderT Context $ StateRefT State $ StateRefT MetavarContext $ StateRefT GoalContext (EIO String)
instance : Inhabited (SearchM α) := ⟨throw default⟩

def timeit (k : SearchM α) : SearchM α := do
  let t0 ← IO.monoNanosNow
  let a ← k
  let t1 ← IO.monoNanosNow
  modify fun s => { s with time := s.time + (t1 - t0) }
  pure a

def getUnique : SearchM Nat := modifyGet fun s => (s.uniqueNum, { s with uniqueNum := s.uniqueNum + 1 })

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

def mkGeneratorNode? (key : TermKey) (goalId : GoalId) (goal : Term) (priority : Nat) : SearchM (Option GeneratorNode) := do
  let .app cls _ := goal | throw s!"goal is a metavariable: {goal}"
  match (← read).axioms[cls]? with
  | none => return none
  | some axioms =>
    let mctx ← getThe MetavarContext
    let goalctx ← getThe GoalContext
    return some {
      goalId, key, mctx, goalctx, axioms, priority
      goalHasMVars := TermHasVars goal
      currInstanceIdx := axioms.size
    }

/--
  Create a new generator node for `mvar` and add `waiter` as its waiter.
  `key` must be `mkTableKey mctx mvarType`. -/
def newSubgoal (key : TermKey) (goalId : GoalId) (goal : Term) (waiter : Waiter) (priority : Nat) : SearchM Unit := do
    match ← mkGeneratorNode? key goalId goal priority with
    | none      => logMessage s!"no new subgoals for {← goalId.toString}"
    | some gNode =>
      let entry : TableEntry := { waiters := #[waiter], priority }
      logMessage s!"new goal {← goalId.toString}, with goalId {goalId}"
      modify fun s =>
       { s with
         generatorStack := s.generatorStack.push gNode |>.insertionSort (·.priority > ·.priority)
         tableEntries   := s.tableEntries.insert key entry }

def findEntry? (key : TermKey) : SearchM (Option TableEntry) := do
  return (← get).tableEntries[key]?

def getEntry (key : TermKey) : SearchM TableEntry := do
  match (← findEntry? key) with
  | none       => panic! "invalid key at gadget search"
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
  Try to synthesize metavariable `mvar` using the axiom `ax`.
  Remark: `mctx` is set using `withMCtx`.
  If it succeeds, the result is a new updated metavariable context and a new list of subgoals.
  A subgoal is created for each hypothesis of `ax`. -/
def tryResolve (goalId : GoalId) (ax : Axiom) : SearchM (Option (List GoalId)) := do
  let ax := AxiomInstantiateFresh (toString (← getUnique)) ax

  let goal ← goalId.getInstantiatedGoal
  if ← unify ax.conclusion goal then
    logMessage s!"applied axiom {ax} to {← goalId.toString}"
    let goalIds ← ax.hypotheses.mapM fun hyp => do
      let goalId : GoalId ← getUnique
      addGoal goalId hyp none
      pure goalId
    addGoal goalId goal (some <| .inl <| .node ax (goalIds.map .goal))
    return some goalIds.toList
  return none

/--
  Assign a precomputed answer to `mvar`.
  If it succeeds, the result is a new updated metavariable context and a new list of subgoals. -/
def useAnswer (goalId : GoalId) (answer : Answer) : SearchM Unit := do
  let answerGoal := TermInstantiateFresh (toString (← getUnique)) answer.goal
  let goal ← goalId.getInstantiatedGoal
  if ← unify answerGoal goal then
    addGoal goalId goal (some <| .inr answer.proof)
  else
    throw "failed to try anser"

/-- Move waiters that are waiting for the given answer to the resume stack. -/
def wakeUp (answer : Answer) : Waiter → SearchM Unit
  | .root               => do
    let proof ← answer.proof.eval
    modify fun s => { s with result? := proof }
  | .consumerNode cNode =>
    modify fun s => { s with resumeStack := s.resumeStack.push (cNode, answer) }

def isNewAnswer (oldAnswers : Array Answer) (answer : Answer) : Bool :=
  oldAnswers.all fun oldAnswer =>
    -- Remark: isDefEq here is too expensive. TODO: if `==` is too imprecise, add some light normalization to `resultType` at `addAnswer`
    -- iseq ← isDefEq oldAnswer.resultType answer.resultType; pure (!iseq)
    oldAnswer.goal != answer.goal

private def mkAnswer (cNode : ConsumerNode) : SearchM Answer := do
  let proof := LazyPartialProof.mk cNode.goalId (← getThe GoalContext)
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
  else
    let answer ← mkAnswer cNode
    -- Remark: `answer` does not contain assignable or assigned metavariables.
    let key := cNode.key
    let { waiters, answers, priority } ← getEntry key
    if isNewAnswer answers answer then
      let newEntry := { waiters, answers := answers.push answer, priority }
      modify fun s => { s with tableEntries := s.tableEntries.insert key newEntry }
      waiters.forM (wakeUp answer)

/-- Process the next subgoal in the given consumer node. -/
def consume (cNode : ConsumerNode) : SearchM Unit := do
  match cNode.subgoals with
  | []      => logMessage s!"adding answer {← cNode.goalId.toString}"; addAnswer cNode
  | goalId :: _ =>
    let waiter := Waiter.consumerNode cNode
    let goal ← goalId.getInstantiatedGoal
    let key := mkTableKey goal
    let { priority, .. } ← getEntry cNode.key
    let priority := priority * cNode.subgoals.length
    match ← findEntry? key with
    | none       =>
      newSubgoal key goalId goal waiter priority
    | some entry =>
      logMessage s!"found key in table: {goal}."
      if priority < entry.priority then
        modify fun s =>
          let generatorStack := s.generatorStack.size.foldRev (init := s.generatorStack) fun i stack =>
            let gNode := stack[i]!
            if gNode.key == key then
              stack.set! i { gNode with priority }
            else
              stack
          let generatorStack := generatorStack.insertionSort (·.priority > ·.priority)
          { s with generatorStack }
      modify fun s =>
      { s with
        resumeStack  := entry.answers.foldl (fun s answer => s.push (cNode, answer)) s.resumeStack,
        tableEntries := s.tableEntries.insert key { entry with waiters := entry.waiters.push waiter, priority := min priority entry.priority } }

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
    useAnswer goalId answer
    logMessage s! "propagating answer {answer.goal} to subgoal {← goalId.toString}"
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
      let { stepCount, .. } ← get
      if let some timeout := timeout? then
        if timeout ≤ stepCount then
          let s ← get
          logMessage s! "stack size: {s.generatorStack.size}, unique numbers: {s.uniqueNum}"
          getPartialResult goalId
        else
          synth timeout? goalId
      else
        synth timeout? goalId
    | some result => return result.toProofTree
  else
    logMessage "finished with search :("
    getPartialResult goalId

def main (problemState : ProblemState) (timeout? : Option Nat) : BaseIO (ExceptT String Id ProofTree × Nat × Array String) := do
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
    addGoal goalId goal none
    let key := mkTableKey goal
    try
      let t0 ← IO.monoNanosNow
      newSubgoal key goalId goal Waiter.root (priority := 1)
      let r ← synth timeout? goalId
      let t1 ← IO.monoNanosNow
      logMessage s!"measured time: {(← get).time/1000000}ms out of {(t1-t0)/1000000}ms"
      pure r
    catch e =>
      logMessage s!"error: {e}"
      try
        getPartialResult goalId
      catch e =>
        logMessage s!"error getting partial result: {e}"
        pure default
  let ref ← IO.mkRef {}
  let r ← (action.run { maxResultSize := none, axioms }) ref |>.run' {} |>.run' {} |>.toBaseIO
  let state ← ref.get
  pure (r, state.stepCount, state.log)

def runJovanSearch (problemState : ProblemState) (timeout? : Option Nat := none) : BaseIO (ProofTree × Nat × Array String) := do
  pure <| match ← main problemState timeout? with
  | (.ok proof, log) => (proof, log)
  | _ => unreachable!


end JovanGadgetGame
