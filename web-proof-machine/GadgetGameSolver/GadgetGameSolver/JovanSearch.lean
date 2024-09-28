import GadgetGameSolver.Jovan.SubGoalSorting
import GadgetGameSolver.Jovan.SpiralDetection
import Lean

namespace JovanGadgetGame

open GadgetGame

def TermHasVars : Term → Bool
| .var _ => true
| .app _ args => args.attach.any fun ⟨x, _⟩ => TermHasVars x

def mkGeneratorNode (goalId : GoalId) (axioms : Array AxiomApplication) : SearchM GeneratorNode := do
  let mctx ← getMCtx
  let goalctx ← getGCtx
  return {
    goalId, mctx, goalctx, axioms
    currAxiomIdx := axioms.size
  }

/--
  Create a new generator node for `mvar` and add `waiter` as its waiter.
  `key` must be `mkTableKey mctx mvarType`. -/
def newSubgoal (key : CellKey) (goalId : GoalId) (axioms : Array AxiomApplication) (waiter : Waiter) (priority : Priority) (isSpiral : Bool) : SearchM Unit := do
  let gNode ← mkGeneratorNode goalId axioms
  let entry := { gNode, waiters := #[waiter], loopyWaiters := #[], answers := #[], priority }
  logMessage s!"new{if isSpiral then " spiral" else ""} goal {← goalId.toString}, with goalId {goalId.id} and importance 1/{priority.numCases} and times {priority.times}"
  if !isSpiral then
    if (← get).generatorStack.find? priority |>.isSome then
      throw s! "OHNO duplicate {priority.times}"
    modify fun s => { s with
      generatorStack := s.generatorStack.insert priority key
      tableEntries   := s.tableEntries.insert key entry }
  else
    modify fun s => { s with
      loopyStack   := s.loopyStack.cons (.inr key)
      tableEntries := s.tableEntries.insert key entry }

/--
  Try to synthesize metavariable `mvar` using the axiom `ax`.
  Remark: `mctx` is set using `withMCtx`.
  If it succeeds, the result is a new updated metavariable context and a new list of subgoals.
  A subgoal is created for each hypothesis of `ax`. -/
def tryAxiom (goalId : GoalId) (ax : AxiomApplication) : SearchM (Option (Array GoalId)) := do
  let goalString ← goalId.toString
  if ← unify ax.gadget.conclusion (← goalId.getGoal!) then
    increment
    logMessage s!"applied axiom {← ax.gadget.toString} to {goalString}"
    let goals ← ax.gadget.hypotheses.mapM mkFreshGoalVar
    goalId.assign (.node ax.name ax.mvars goals)
    return goals.map (·.goalId!)
  else
    return none

/--
  Assign a precomputed answer to `mvar`.
  If it succeeds, the result is a new updated metavariable context and a new list of subgoals. -/
def useAnswer (answer : Answer) (goalId : GoalId) : SearchM Unit := do
  let (mvars, gadget) ← answer.cInfo.gadget.instantiateFresh
  if ← unify gadget.conclusion (← goalId.getGoal!) then
    goalId.assign (.node answer.cInfo.name mvars #[])
  else
    throw "failed to try anser"

/-- Move waiters that are waiting for the given answer to the resume stack. -/
def wakeUp (answer : Answer) (isLoopy : Bool) : Waiter → SearchM Unit
  | .root               => do
    modify fun s => { s with result? := answer.cInfo }
  | .consumerNode cNode => do
    if isLoopy then
      modify fun s => { s with loopyStack := s.loopyStack.cons (.inl (cNode, answer)) }
    else
      modify fun s => { s with resumeStack := s.resumeStack.push (cNode, answer) }

def isNewAnswer (oldAnswers : Array Answer) (answer : Answer) : Bool :=
  oldAnswers.all fun oldAnswer =>
    -- Remark: isDefEq here is too expensive. TODO: if `==` is too imprecise, add some light normalization to `resultType` at `addAnswer`
    -- iseq ← isDefEq oldAnswer.resultType answer.resultType; pure (!iseq)
    oldAnswer.cInfo.gadget.conclusion != answer.cInfo.gadget.conclusion

private def mkAnswer (goalId : GoalId) (size : Nat) : SearchM Answer := do
  return { cInfo := ← goalId.addFreshConstantInfo, size }

/--
  Create a new answer after `cNode` resolved all subgoals.
  That is, `cNode.subgoals == []`.
  And then, store it in the tabled entries map, and wakeup waiters. -/
def addAnswer (goalId : GoalId) (key : CellKey) (size : Nat) : SearchM Unit := do
  if (← read).maxResultSize.any (size ≥ ·) then
    logMessage s!"{← goalId.toString} has size {size}, which is big"
  else
    let answer ← mkAnswer goalId size
    -- Remark: `answer` does not contain assignable or assigned metavariables.
    let entry ← getEntry key
    if isNewAnswer entry.answers answer then
      let newEntry := { entry with answers := entry.answers.push answer }
      modify fun s => { s with tableEntries := s.tableEntries.insert key newEntry }
      entry.waiters.forM (wakeUp answer false)
      entry.loopyWaiters.forM (wakeUp answer true)
    else
      logMessage s!"answer {answer.cInfo.gadget.conclusion} isn't new"

/--
Checks whether `originalKey` can be reached from `key` during result propagation.
-/
partial def isLoopyKey (key originalKey : CellKey) : SearchM Bool := do
  if originalKey == key then
    logMessage "loop has been detected"
    return true
  else
    let { waiters, .. } ← getEntry key
    waiters.anyM fun
      | .root               => pure false
      | .consumerNode cNode => isLoopyKey cNode.key originalKey

def processSubgoal (cNode : ConsumerNode) (axioms : Array AxiomApplication) (priority : Priority) : SearchM Unit := do
  let waiter := Waiter.consumerNode cNode
  let goal ← cNode.nextSubgoalId.getInstantiatedGoal
  let key := goal.abstract
  let config@{ fewerCasesFirst, postponeLoopSearch, postponeSpiralSearch, .. } ← getConfig
  match ← findEntry? key with
  | none       =>
    let isSpiral ← if postponeSpiralSearch then isSpiral cNode else pure false
    newSubgoal key cNode.nextSubgoalId axioms waiter priority isSpiral
  | some entry =>
    logMessage s!"found goal in table: subgoal {← goal.toString} of {← cNode.goalId.toString}."
    let isLoopy ←
      if postponeLoopSearch then
        isLoopyKey cNode.key key
      else
        pure false


    if isLoopy then
      modify fun s => { s with
        loopyStack := entry.answers.foldl (fun s answer => s.cons (.inl (cNode, answer))) s.loopyStack }
    else
      modify fun s => { s with
        resumeStack := entry.answers.foldl (fun s answer => s.push (cNode, answer)) s.resumeStack }

    let entry ← do
      if fewerCasesFirst && (priority.cmp entry.priority config).isGT then
        modify fun s => { s with
          generatorStack := s.generatorStack.erase entry.priority |>.insert priority key }
        pure { entry with priority }
      else
        pure entry
    let entry :=
      if isLoopy then
        { entry with loopyWaiters := entry.loopyWaiters.push waiter }
      else
        { entry with waiters := entry.waiters.push waiter }
    modify fun s => { s with tableEntries := s.tableEntries.insert key entry }

/-- Process the next subgoal in the given consumer node. -/
def consume (goalId : GoalId) (key : CellKey) (subgoals : Array GoalId) (size : Nat) (times : Array Nat) : SearchM Unit := do
  let { orderSubgoalsAndAxioms, .. } ← getConfig
  match ← if orderSubgoalsAndAxioms then bestSubgoal subgoals else bestSubgoal' subgoals with
  | .error true =>
    logMessage s!"adding answer to goal {← goalId.toString}"
    addAnswer goalId key size
  | .error false =>
    logMessage s!"goal {← goalId.toString} is now unsolvable"
  | .ok ((nextSubgoalId, axioms), laterSubgoals) =>

    let proof   ← goalId.getInstantiatedAssignment
    let mctx    ← getMCtx
    let goalctx ← getGCtx
    let cNode := { goalId, key, proof, mctx, goalctx, nextSubgoalId, laterSubgoals, size, times }

    let { priority := { numCases, times := allTimes }, .. } ← getEntry key
    let priority := {
      numCases := numCases * (laterSubgoals.size + 1)
      -- size     := totalSize + size
      times    := allTimes.push times
    }
    processSubgoal cNode axioms priority
where
  bestSubgoal' (goals : Array GoalId) : SearchM (Except Bool ((GoalId × Array AxiomApplication) × Array GoalId)) := do
    if h : goals.size = 0 then
      return .error true
    else
      let goalId := goals[0]
      let goal ← goalId.getInstantiatedGoal
      let axioms ← getAxioms goal
      let axioms ← axioms.filterMapM fun cInfo => do
        let (mvars, gadget) ← cInfo.gadget.instantiateFresh
        let mctx ← getMCtx
        if ← unify gadget.conclusion goal then
          setMCtx mctx
          return some { gadget, name := cInfo.name, mvars : AxiomApplication }
        else
          return none
      return .ok ((goalId, axioms), goals[1:])

/-- Try the next instance in the node on the top of the generator stack. -/
@[specialize]
def generate (key : CellKey) (pop : SearchM Unit) : SearchM Unit := do
  let entry@{ gNode, .. } ← getEntry key
  if gNode.currAxiomIdx == 0  then
    pop
  else
    let idx    := gNode.currAxiomIdx - 1
    let ax     := gNode.axioms.get! idx
    let goalId := gNode.goalId
    setMCtx gNode.mctx
    setGCtx gNode.goalctx
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
    modify fun s => { s with tableEntries := s.tableEntries.insert key { entry with gNode.currAxiomIdx := idx }}
    if let some subgoals ← tryAxiom goalId ax then
      consume goalId key subgoals 1 #[← getUnique]

/--
  Given `(cNode, answer)` on the top of the resume stack, continue execution by using `answer` to solve the
  next subgoal. -/
def resume (pair : ConsumerNode × Answer) : SearchM Unit := do
  let (cNode, answer) := pair
  setMCtx cNode.mctx
  setGCtx cNode.goalctx
  useAnswer answer cNode.nextSubgoalId
  logMessage s! "propagating answer {answer.cInfo.gadget.conclusion} to subgoal {← cNode.nextSubgoalId.toString} of {← cNode.goalId.toString}"
  consume cNode.goalId cNode.key cNode.laterSubgoals (cNode.size + answer.size) (cNode.times.push (← getUnique))

def step : SearchM Bool := do
  let s ← get
  if !s.resumeStack.isEmpty then
    let r := s.resumeStack.back
    modify fun s => { s with resumeStack := s.resumeStack.pop }
    resume r
    return true
  else if let some (p, top) := s.generatorStack.top then
    generate top
      (modify fun s => { s with generatorStack := s.generatorStack.erase p })
    return true
  else if let some (x, loopyStack) := s.loopyStack.uncons? then
    increment
    logMessage "doing a loopy case"
    match x with
    | .inl r =>
      modify fun s => { s with loopyStack }
      resume r
      return true
    | .inr gNode =>
      generate gNode
        (modify fun s => { s with loopyStack })
      return true
  else
    return false

/-- BRUH this is so hacky. -/
@[inline]
instance (priority := high) {m : Type → Type} {ρ : Type} [Monad m] : Monad (ReaderT ρ m) where
  bind := ReaderT.bind

def getResult : SearchM (Option ConstantInfo) := return (← get).result?

def getPartialResult (goalId : GoalId) : SearchM ProofTree := do
  goalId.toProofTree

partial def synth (timeout? : Option Nat) (goalId : GoalId) : SearchM ProofTree := do
  if (← step) then
    match (← getResult) with
    | none        =>
      let { stepCount, .. } ← get
      if let some timeout := timeout? then
        if timeout ≤ stepCount then
          getPartialResult goalId
        else
          synth timeout? goalId
      else
        synth timeout? goalId
    | some cInfo =>
      cInfo.name.toProofTree
  else
    logMessage "finished with search :("
    getPartialResult goalId

def main (problemState : ProblemState) (timeout? : Option Nat) (config : Config) : BaseIO (ExceptT String Id ProofTree × Nat × Array String) := do
  let { axioms, target := goal } := problemState
  let action : SearchM ProofTree := do
    let axioms ← axioms.foldlM (init := {}) fun axioms ax => do
      if let .app f args := ax.conclusion then
        let cInfo ← ax.addFreshConstantInfo
        match axioms[(f, args.size)]? with
        | none => return axioms.insert (f, args.size) #[cInfo]
        | some axs => return axioms.insert (f, args.size) (axs.push cInfo)
      else
        return axioms
    withReader ({ · with axioms }) do
    let (goal, { varNames, .. }) := (abstractTermAsCell goal).run {}
    let goal := goal.instantiate (← varNames.mapM mkFreshMVar)
    let goalId := (← mkFreshGoalVar goal).goalId!
    let key := goal.abstract
    let { orderSubgoalsAndAxioms, .. } ← getConfig
    let axioms ←
      if orderSubgoalsAndAxioms then
        pure (← checkAxioms goal).2
      else
        let axioms ← getAxioms goal
        axioms.mapM fun cInfo => do
          let (mvars, gadget) ← cInfo.gadget.instantiateFresh
          return { gadget, name := cInfo.name, mvars }
    do-- try
      let t0 ← IO.monoNanosNow
      newSubgoal key goalId axioms Waiter.root rootPriority false
      let r ← synth timeout? goalId
      let t1 ← IO.monoNanosNow
      logMessage s!"measured time: {(← get).time/1000000}ms out of {(t1-t0)/1000000}ms"
      pure r
    -- catch e =>
    --   logMessage s!"error: {e}"
    --   try
    --     getPartialResult goalId
    --   catch e =>
    --     logMessage s!"error getting partial result: {e}"
    --     pure default
  let ref ← IO.mkRef { config }
  let r ← (action.run { maxResultSize := none, axioms := {} }) ref |>.toBaseIO
  let state ← ref.get
  pure (r, state.stepCount, state.log)

def runJovanSearch (problemState : ProblemState) (timeout? : Option Nat := none) (config : Config) : Lean.MetaM (ProofTree × Nat × Array String) := do
  match ← main problemState timeout? config with
  | (.ok proof, log) => return (proof, log)
  | (.error e, log) =>
    Lean.logInfo m! "{log}"
    throwError "{e}"


end JovanGadgetGame

/-
TODO:

- globally cache all results in a discrimination tree in their most general form,
and lookup in this in a way to not instantiate metavariables.
If possible, allow to instantiate non-shared metavariables. (Maybe use reference counting???)

- re-awaken spirally goals if they are needed again.
  In a table entry, besides answers there will also be the list of subgoals that have been
  put to sleep due to spirals. So then the spirals can be checked again.
  If there is no spiral, then pput the relevant key on the regular generator stack.

- stop using loopy waiters, and instead store all cycles globally.
  Then, when going up the directed graph of waiters, each waiter comes with a
  tree of bad directions. Therefore, each answer comes with a tree of bad directions.
  They can be stored in a `PathTree` data type:

inductive PathTree where
| node : Lean.AssocList WaiterIdx PathTree → PathTree
| nil  : PathTree

-/
