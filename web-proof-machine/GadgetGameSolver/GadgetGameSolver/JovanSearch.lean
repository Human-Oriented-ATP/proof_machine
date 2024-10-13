import GadgetGameSolver.Jovan.SubGoalSorting
import GadgetGameSolver.Jovan.SpiralDetection
import Lean
import Batteries.Data.Sum.Basic

namespace JovanGadgetGame

def mkGeneratorNode (goalId : GoalId) (goal : Cell) (axioms : Array AxiomApplication) : SearchM GeneratorNode := do
  let mctx ← getMCtx
  let goalctx ← getGCtx
  return {
    goalId, mctx, goalctx, axioms
    mvars := goal.collectMVars {} |>.arr
    currAxiomIdx := axioms.size
  }

/--
  Create a new generator node for `mvar` and add `waiter` as its waiter.
  `key` must be `mkTableKey mctx mvarType`. -/
def newSubgoal (key : CellKey) (goalId : GoalId) (goal : Cell) (axioms : Array AxiomApplication)
    (waiter : Waiter) (priority : Priority) (isSpiral : Bool) : SearchM Unit := do
  let gNode ← mkGeneratorNode goalId goal axioms
  let entry := { gNode, waiters := #[waiter], answers := #[], priority, isSolved := false }
  logMessage <| s!"new{if isSpiral then " spiral" else ""} goal {← goalId.toString}," ++
    s!" with goalId {goalId.id} and importance 1/{priority.numCases} and times {priority.times}"
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
def tryAxiom (goalId : GoalId) (goal : Cell) (ax : AxiomApplication) : SearchM (Option (Array GoalId)) := do
  let goalString ← goal.toString
  if ← unify ax.gadget.conclusion goal then
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
def useAnswer (cInfo : ConstantInfo) (goalId : GoalId) : SearchM Unit := do
  let (mvars, gadget) ← cInfo.gadget.instantiateFresh
  if ← unify gadget.conclusion (← goalId.getGoal!) then
    goalId.assign (.node cInfo.name mvars #[])
  else
    throw "failed to use anser"

/-- Move waiters that are waiting for the given answer to the resume stack. -/
def wakeUp (answer : Answer) (counts? : Bool) : Waiter → SearchM Unit
  | .root               => do
    modify fun s => { s with result? := answer.cInfo }
  | .consumerNode cNode => do
    let { cInfo, allSubgoals } := answer
    let entry := { cNode, cInfo, allSubgoals, counts? }
    if allSubgoals[cNode.key]? = some true then
      setMCtx cNode.mctx
      setGCtx cNode.goalctx
      logMessage s!"loopy answer {cInfo.gadget.conclusion} for subgoal of {← cNode.goalId.toString}"
      modify fun s => { s with loopyStack := s.loopyStack.cons (.inl entry) }
    else
      modify fun s => { s with resumeStack := s.resumeStack.push entry }

def wakeUpWaiters (entry : TableEntry) (answer : Answer) : SearchM Unit :=
  discard do
  entry.waiters.foldlM (init := false) fun counts? waiter => do
    wakeUp answer counts? waiter
    pure true

def isNewAnswer (oldAnswers : Array Answer) (answer : Answer) : Bool :=
  oldAnswers.all fun oldAnswer =>
    oldAnswer.cInfo.gadget.conclusion != answer.cInfo.gadget.conclusion

/--
  Create a new answer after `cNode` resolved all subgoals.
  That is, `cNode.subgoals == []`.
  And then, store it in the tabled entries map, and wakeup waiters. -/
def addAnswer (goalId : GoalId) (key : CellKey) (allSubgoals : Std.HashMap CellKey Bool) : SearchM Unit := do
  let answer ← goalId.mkAnswer allSubgoals
  let entry ← getEntry key
  if entry.isSolved then
    throw "oops"
  if isNewAnswer entry.answers answer then
    answer.cInfo.addToEnv
    let newEntry := { entry with answers := entry.answers.push answer }
    modify fun s => { s with tableEntries := s.tableEntries.insert key newEntry }
    discard <| entry.waiters.foldlM (init := false) fun counts? waiter => do
      wakeUp answer counts? waiter
      pure true
  else
    logMessage s!"answer {answer.cInfo.gadget.conclusion} isn't new"

def processSubgoal (cNode : ConsumerNode) (axioms : Array AxiomApplication) (priority : Priority) : SearchM Unit := do
  let waiter := Waiter.consumerNode cNode
  let goal ← cNode.nextSubgoalId.getInstantiatedGoal
  let key := goal.abstract
  let config@{ fewerCasesFirst, postponeSpiralSearch, useOldSpiralDetect, .. } ← getConfig
  match ← findEntry? key with
  | none       =>
    let isSpiral ← if postponeSpiralSearch then if useOldSpiralDetect then isSpiralDeprecated cNode else Iterate.isSpiral cNode goal--Deprecated cNode
      else pure false
    newSubgoal key cNode.nextSubgoalId goal axioms waiter priority isSpiral
  | some entry =>
    logMessage s!"found goal in table: subgoal {← goal.toString} of {← cNode.goalId.toString}."
    if entry.isSolved then
      throw "whoopsies"
    else
    entry.answers.forM fun answer =>
      wakeUp answer true (.consumerNode cNode)
    let entry ← do
      if fewerCasesFirst && (priority.cmp entry.priority config).isGT then
        modify fun s => { s with
          generatorStack := s.generatorStack.erase entry.priority |>.insert priority key }
        pure { entry with priority }
      else
        pure entry
    let entry := { entry with waiters := entry.waiters.push waiter }
    modify fun s => { s with tableEntries := s.tableEntries.insert key entry }

/-- Process the next subgoal in the given consumer node. -/
def consume (goalId : GoalId) (key : CellKey) (origMVars : Array MVarId)
    (subgoals : Array GoalId) (allSubgoals : Std.HashMap CellKey Bool) (times : Array Nat) : SearchM Unit := do
  let { orderSubgoalsAndAxioms, .. } ← getConfig
  match ← if orderSubgoalsAndAxioms then bestSubgoal subgoals else bestSubgoal' subgoals with
  | .error true =>
    logMessage s!"adding answer to goal {← goalId.toString}"
    addAnswer goalId key allSubgoals
  | .error false =>
    logMessage s!"goal {← goalId.toString} is now unsolvable"
  | .ok ((nextSubgoalId, todo), laterSubgoals) =>
    let proof   ← goalId.getInstantiatedAssignment
    let mctx    ← getMCtx
    let goalctx ← getGCtx
    let anyAssigned ← origMVars.anyM (·.isHeadAssigned?)
    let cNode := { goalId, key, origMVars, anyAssigned, proof, mctx, goalctx, nextSubgoalId, laterSubgoals, allSubgoals, times }
    match todo with
    | .inr cInfo =>
      let goal ← cNode.nextSubgoalId.getInstantiatedGoal
      let key := goal.abstract
      /- no need to worry about allSubgoals when the answer doesn't instantiate variables. -/
      let answer := { cInfo, allSubgoals := {} }
      if let some entry ← findEntry? key then
        unless entry.isSolved do
          let entry := { entry with isSolved := true }
          modify fun s => { s with tableEntries := s.tableEntries.insert key entry }
          entry.waiters.forM (wakeUp answer true)
      wakeUp answer true (.consumerNode cNode)

    | .inl axioms =>
      let { priority := { numCases, times := allTimes, .. }, .. } ← getEntry key
      let priority := {
        isEZ     := axioms.size = 1
        numCases := numCases * (laterSubgoals.size + 1)
        -- size     := totalSize + size
        times    := allTimes.push times
      }
      processSubgoal cNode axioms priority
where
  bestSubgoal' (goals : Array GoalId) : SearchM (Except Bool ((GoalId × (Array AxiomApplication ⊕ ConstantInfo)) × Array GoalId)) := do
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
      return .ok ((goalId, .inl axioms), goals[1:])

/-- Try the next instance in the node on the top of the generator stack. -/
@[specialize]
def generate (key : CellKey) (pop : SearchM Unit) : SearchM Unit := do
  let entry@{ gNode, isSolved := false , .. } ← getEntry key | pop
  if gNode.currAxiomIdx == 0  then
    pop
  else
    let idx      := gNode.currAxiomIdx - 1
    let ax       := gNode.axioms.get! idx
    let goalId   := gNode.goalId
    let mvars    := gNode.mvars
    setMCtx gNode.mctx
    setGCtx gNode.goalctx

    let goal ← goalId.getInstantiatedGoal -- instantiate to make the log look better
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
    modify fun s => { s with tableEntries := s.tableEntries.insert key { entry with gNode.currAxiomIdx := idx }}
    if let some subgoals ← tryAxiom goalId goal ax then
      consume goalId key mvars subgoals (.insert {} key false) #[← getUnique]

/--
  Given `(cNode, answer)` on the top of the resume stack, continue execution by using `answer` to solve the
  next subgoal. -/
def resume (entry : ResumeEntry) : SearchM Unit := do
  let { cNode, cInfo, allSubgoals, counts? } := entry
  if (← getEntry cNode.key).isSolved then
    return
  if counts? then
    increment
  setMCtx cNode.mctx
  setGCtx cNode.goalctx
  let goalId        := cNode.goalId
  let key           := cNode.key
  let origMVars     := cNode.origMVars
  let nextSubgoalId := cNode.nextSubgoalId
  let laterSubgoals := cNode.laterSubgoals
  /- we need to possibly set to true the values in allSubgoals, based on whether the variables in cNode are instantiated.-/
  let allSubgoals   := allSubgoals.fold (init := cNode.allSubgoals) fun allSubgoals key instantiated =>
    match allSubgoals[key]? with
    | some instantiated' =>
      if instantiated' || !(instantiated || cNode.anyAssigned) then
        allSubgoals
      else
        allSubgoals.insert key true
    | none =>
      allSubgoals.insert key (instantiated || cNode.anyAssigned)
  let times         := cNode.times
  useAnswer cInfo nextSubgoalId
  logMessage s! "propagating answer {cInfo.gadget.conclusion} to subgoal {← nextSubgoalId.toString} of {← goalId.toString}"
  consume goalId key origMVars laterSubgoals allSubgoals (times.push (← getUnique))

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
    -- throw "LOOP LOOP"
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

open GadgetGame

def getPartialResult (goalId : GoalId) : SearchM ProofTree := do
  goalId.toProofTree

partial def synth (timeout? : Option Nat) (goalId : GoalId) : SearchM ProofTree := do
  let { stepCount, .. } ← get
  if timeout?.any (· ≤ stepCount) then
    getPartialResult goalId
  else
  if (← step) then
    match (← getResult) with
    | none        =>
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
      newSubgoal key goalId goal axioms Waiter.root rootPriority false
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
  let r ← (action.run { axioms := {} }) ref |>.toBaseIO
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
