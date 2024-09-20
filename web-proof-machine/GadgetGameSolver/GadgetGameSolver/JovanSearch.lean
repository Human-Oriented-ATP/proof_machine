import GadgetGameSolver.Jovan.SubGoalSorting
import GadgetGameSolver.Jovan.Unification
import GadgetGameSolver.Jovan.TableKey
import Lean

namespace JovanGadgetGame

open GadgetGame

def TermHasVars : Term → Bool
| .var _ => true
| .app _ args => args.attach.any fun ⟨x, _⟩ => TermHasVars x

def mkGeneratorNode (key : TermKey) (goalId : GoalId) (axioms : Array Axiom) (priority : Nat) : SearchM GeneratorNode := do
  let mctx ← getThe MetavarContext
  let goalctx ← getThe GoalContext
  return {
    goalId, key, mctx, goalctx, axioms, priority
    currAxiomIdx := axioms.size
  }

/--
  Create a new generator node for `mvar` and add `waiter` as its waiter.
  `key` must be `mkTableKey mctx mvarType`. -/
def newSubgoal (key : TermKey) (goalId : GoalId) (axioms : Array Axiom) (waiter : Waiter) (priority : Nat) : SearchM Unit := do
  let gNode ← mkGeneratorNode key goalId axioms priority
  let entry : TableEntry := { waiters := #[waiter], priority }
  logMessage s!"new goal {← goalId.toString}, with goalId {goalId}"
  let { config := { depthFirst } , .. } ← read
  modify fun s =>
    let stack := if depthFirst then s.generatorStack.push gNode else #[gNode] ++ s.generatorStack
    { s with
      generatorStack := stack.insertionSort (·.priority > ·.priority)
      tableEntries   := s.tableEntries.insert key entry }

def findEntry? (key : TermKey) : SearchM (Option TableEntry) := do
  return (← get).tableEntries[key]?

def getEntry (key : TermKey) : SearchM TableEntry := do
  match (← findEntry? key) with
  | none       => panic! "invalid key at gadget search"
  | some entry => pure entry

/--
  Try to synthesize metavariable `mvar` using the axiom `ax`.
  Remark: `mctx` is set using `withMCtx`.
  If it succeeds, the result is a new updated metavariable context and a new list of subgoals.
  A subgoal is created for each hypothesis of `ax`. -/
def tryAxiom (goalId : GoalId) (ax : Axiom) : SearchM (Array GoalId) := do
  -- let ax := AxiomInstantiateFresh (toString (← getUnique)) ax
  let goal ← goalId.getInstantiatedGoal
  if ← unify ax.conclusion goal then
    increment
    logMessage s!"applied axiom {ax} to {← goalId.toString}"
    let goalIds ← ax.hypotheses.mapM fun hyp => do
      let goalId : GoalId ← getUnique
      setGoal goalId hyp none
      pure goalId
    setGoal goalId goal (some <| .inl <| .node ax (goalIds.map .goal))
    return goalIds
  else
    throw "failed to apply axiom"

/--
  Assign a precomputed answer to `mvar`.
  If it succeeds, the result is a new updated metavariable context and a new list of subgoals. -/
def useAnswer (answer : Answer) (goalId : GoalId) : SearchM Unit := do
  let answerGoal := TermInstantiateFresh (toString (← getUnique)) answer.goal
  let goal ← goalId.getInstantiatedGoal
  if ← unify answerGoal goal then
    setGoal goalId goal (some <| .inr answer.proof)
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

private def mkAnswer (goalId : GoalId) (size : Nat) : SearchM Answer := do
  let proof := LazyPartialProof.mk goalId (← getThe GoalContext)
  let goal ← goalId.getInstantiatedGoal
  let goal ← goal.instantiateVars
  return { proof, goal, size := size + 1 }

/--
  Create a new answer after `cNode` resolved all subgoals.
  That is, `cNode.subgoals == []`.
  And then, store it in the tabled entries map, and wakeup waiters. -/
def addAnswer (goalId : GoalId) (key : TermKey) (size : Nat) : SearchM Unit := do
  if (← read).maxResultSize.any (size ≥ ·) then
    logMessage s!"{← goalId.toString} has size {size}, which is big"
    pure ()
  else
    let answer ← mkAnswer goalId size
    -- Remark: `answer` does not contain assignable or assigned metavariables.
    let { waiters, answers, priority } ← getEntry key
    if isNewAnswer answers answer then
      let newEntry := { waiters, answers := answers.push answer, priority }
      modify fun s => { s with tableEntries := s.tableEntries.insert key newEntry }
      waiters.forM (wakeUp answer)

/-- Process the next subgoal in the given consumer node. -/
def consume (key : TermKey) (goalId : GoalId) (subgoals : Array GoalId) (size : Nat) : SearchM Unit := do
  match ← bestSubGoal subgoals with
  | .error true =>
    logMessage s!"adding answer to {← goalId.toString}"
    addAnswer goalId key size
  | .error false =>
    logMessage s!"goal {← goalId.toString} is unsolvable :o"
  | .ok ((nextSubgoalId, axioms), laterSubgoals) =>
    let mctx ← getThe MetavarContext
    let goalctx ← getThe GoalContext
    let cNode : ConsumerNode := { goalId, key, mctx, goalctx, nextSubgoalId, laterSubgoals, size }
    let waiter := Waiter.consumerNode cNode
    let { priority, .. } ← getEntry key
    let priority := priority * (laterSubgoals.size + 1)
    let subgoal ← nextSubgoalId.getInstantiatedGoal
    let key := mkTableKey subgoal
    match ← findEntry? key with
    | none       =>
      newSubgoal key nextSubgoalId axioms waiter priority
    | some entry =>
      logMessage s!"found key in table: {subgoal}."
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
  if gNode.currAxiomIdx == 0  then
    modify fun s => { s with generatorStack := s.generatorStack.pop }
  else
    let key    := gNode.key
    let idx    := gNode.currAxiomIdx - 1
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
    modifyTop fun gNode => { gNode with currAxiomIdx := idx }
    let subgoals ← tryAxiom goalId ax
    consume key goalId subgoals 0

def getNextToResume : SearchM (ConsumerNode × Answer) := do
  let r := (← get).resumeStack.back
  modify fun s => { s with resumeStack := s.resumeStack.pop }
  return r

/--
  Given `(cNode, answer)` on the top of the resume stack, continue execution by using `answer` to solve the
  next subgoal. -/
def resume : SearchM Unit := do
  -- if (← get).stepCount = 26 then
  --   throw "woopwoop"
  let (cNode, answer) ← getNextToResume
  set cNode.mctx
  set cNode.goalctx
  useAnswer answer cNode.nextSubgoalId
  logMessage s! "propagating answer {answer.goal} to subgoal {← cNode.nextSubgoalId.toString} of {← cNode.goalId.toString}"
  consume cNode.key cNode.goalId cNode.laterSubgoals (cNode.size + answer.size)

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

def main (problemState : ProblemState) (timeout? : Option Nat) (config : Config) : BaseIO (ExceptT String Id ProofTree × Nat × Array String) := do
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
    setGoal goalId goal none
    let key := mkTableKey goal
    let (_, axioms) ← checkAxioms goal
    try
      let t0 ← IO.monoNanosNow
      newSubgoal key goalId axioms Waiter.root (priority := 1)
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
  let r ← (action.run { maxResultSize := none, axioms, config }) ref |>.run' {} |>.run' {} |>.toBaseIO
  let state ← ref.get
  pure (r, state.stepCount, state.log)

def runJovanSearch (problemState : ProblemState) (timeout? : Option Nat := none) (config : Config) : BaseIO (ProofTree × Nat × Array String) := do
  pure <| match ← main problemState timeout? config with
  | (.ok proof, log) => (proof, log)
  | _ => unreachable!


end JovanGadgetGame

/-
TODO:

- globally cache all results in a discrimination tree in their most general form,
and lookup in this in a way to not instantiate metavariables.
If possible, allow to instantiate non-shared metavariables. (Maybe use reference counting???)

-/
