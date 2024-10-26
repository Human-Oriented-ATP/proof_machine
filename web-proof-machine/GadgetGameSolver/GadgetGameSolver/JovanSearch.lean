import GadgetGameSolver.Jovan.SubGoalSorting
import GadgetGameSolver.Jovan.SpiralDetection
import GadgetGameSolver.Jovan.GoalGraph
import Batteries.Data.Sum.Basic

namespace JovanGadgetGame

/--
  Create a new generator node for `mvar` and add `waiter` as its waiter.
  `key` must be `mkTableKey mctx mvarType`. -/
def newSubgoal (gInfo : GoalInfo) (axioms : Array ConstantInfo)
    (firstWaiter : Option ConsumerNode) (posPriority : PosPriority) : SearchM Unit := do
  let gNode    := { gInfo, axioms, currAxiomIdx := axioms.size }
  let priority := .some posPriority
  let waiters ← match firstWaiter with
    | some waiter =>
      -- logMessage s!"inserted {← waiter.toString}"
      modifyOpenEntry waiter.gInfo.key %%.waitingFor (·.insert waiter)
      pure <| Std.HashMap.insert {} waiter priority
    | none =>
      pure {}
  let entry := {
    gNode, firstWaiter, priority, waiters,
    deadResumes := #[], waitingFor := {}, cycle := {gInfo.key}, answers := #[] }
  setOpenEntry gInfo.key entry
  logMessage <| s!"new goal {← gInfo.goalId.toString}," ++
    s!" with goalId {gInfo.goalId.id} and importance 1/{posPriority.numCases} and times {posPriority.times}"
  if (← get).generatorStack.find? posPriority |>.isSome then
    throw s! "OHNO duplicate {posPriority.times}"
  modify fun s => { s with
    generatorStack := s.generatorStack.insert posPriority gInfo.key }

/--
  Try to synthesize metavariable `mvar` using the axiom `ax`.
  Remark: `mctx` is set using `withMCtx`.
  If it succeeds, the result is a new updated metavariable context and a new list of subgoals.
  A subgoal is created for each hypothesis of `ax`. -/
def tryAxiom (gInfo : GoalInfo) (ax : ConstantInfo) : SearchM (Option (Array GoalId)) := do
  let (mvars, gadget) ← ax.gadget.instantiateFresh
  if ← unify gadget.conclusion gInfo.goal then
    increment
    logMessage s!"applied axiom {← gadget.toString} to {← gInfo.goal.toString}"
    let goals ← gadget.hypotheses.mapM mkFreshGoalVar
    gInfo.goalId.assign (.node (ax.name) mvars goals)
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

/-- Move waiter that is waiting for the given answer to the resume stack. -/
def wakeUp (cNode : ConsumerNode) (posPriority : PosPriority) (answer : Answer) : SearchM Unit := do
  modify %%.resumeStack (·.insert posPriority { cNode, answer, counts? := false })

/-- Move waiters that are waiting for the given answer to the resume stack. -/
def wakeUpWaiters (entry : OpenTableEntry) (answer : Answer) : SearchM Unit := do
  if entry.firstWaiter.isNone then
    if (← get).result?.isSome then
      throw "there is already a result?"
    else
      modify ({ · with result? := some answer.cInfo })
  entry.waiters.forM fun cNode priority =>
    let entry := { cNode, answer, counts? := entry.firstWaiter.all (· != cNode) }
    match priority with
    | .some posPriority =>
      modify %%.resumeStack (·.insert posPriority entry)
    | .useless =>
      modifyOpenEntry cNode.gInfo.key %%.deadResumes (·.push entry)



def isNewAnswer (oldAnswers : Array Answer) (answer : Answer) : Bool :=
  oldAnswers.all (·.cInfo.gadget.conclusion != answer.cInfo.gadget.conclusion)

def AbstractedExpr.subsumes (s : AbstractedExpr) (t : Expr) (map : Lean.AssocList Nat Expr) : Option (Lean.AssocList Nat Expr) := do
  match s with
  | .mvar mvarId =>
    match map.find? mvarId with
    | some t' => guard (t == t'); pure map
    | none => pure (map.cons mvarId t)
  | .app f args =>
    match t with
    | .mvar _ => failure
    | .app f' args' =>
      if h : f = f' ∧ args.size = args'.size then
        args.size.foldM' (init := map) fun i map =>
          args[i].subsumes args'[i] map
      else
        unreachable!

def AbstractedCell.subsumes (a : AbstractedCell) (c : Cell) : Bool :=
  if h : a.f = c.f ∧ a.args.size = c.args.size then
    Option.isSome do
    a.args.size.foldM' (init := Lean.AssocList.nil) fun i map =>
      a.args[i].subsumes c.args[i] map
  else
    unreachable!

/--
  Create a new answer after `cNode` resolved all subgoals.
  That is, `cNode.subgoals == []`.
  And then, store it in the tabled entries map, and wakeup waiters. -/
def addAnswer (gInfo : GoalInfo) (proofKeys : List (ProofKeys × Bool)) : SearchM Unit := do
  let cInfo ← gInfo.goalId.mkConst
  let answer := { cInfo, proofKeys }
  let entry ← getOpenEntry gInfo.key
  if isNewAnswer entry.answers answer then
    answer.addToEnv
    wakeUpWaiters entry answer
    if cInfo.gadget.conclusion.subsumes gInfo.goal then
      setDoneEntry gInfo.key #[answer]
      entry.waiters.forM fun cNode _ => do
        modifyOpenEntry cNode.gInfo.key %%.waitingFor (·.erase cNode)
        /- TODO: find a way to track down all answers and consumernodes that depend on
        any alternative anwers from this entry, and kill them. -/
      entry.waitingFor.forM fun cNode => do
        modifyOpenEntry cNode.subgoalInfo.key %%.waiters (·.erase cNode)
        fixPriority cNode.subgoalInfo.key
      logMessage "fixing cycle"
      fixCycles entry
    else
      modifyOpenEntry gInfo.key %%.answers (·.push answer)
  else
    logMessage s!"answer {answer.cInfo.gadget.conclusion} isn't new"

def processSubgoal (cNode : ConsumerNode) (axioms : Array ConstantInfo) (posPriority : PosPriority) : SearchM Unit := do
  let key := cNode.subgoalInfo.key
  match ← findEntry? key with
  | none =>
    newSubgoal cNode.subgoalInfo axioms cNode posPriority
  | some (.done answers) =>
    logMessage s!"found finished goal in table. Answers: {answers.map (·.cInfo.gadget.conclusion)}"
    answers.forM (wakeUp cNode posPriority)
  | some (.openE entry) =>
    logMessage s!"found goal in table: subgoal {← cNode.subgoalInfo.goalId.toString} of {← cNode.gInfo.goalId.toString}. Answers: {entry.answers.map (·.cInfo.gadget.conclusion)}"
    entry.answers.forM (wakeUp cNode posPriority)
    let priority := .some posPriority
    modifyOpenEntry key %%.waiters (·.insert cNode priority)
    modifyOpenEntry cNode.gInfo.key %%.waitingFor (·.insert cNode)
    fixPriority key
    fixCycles (← getOpenEntry key)

/-- Process the next subgoal in the given consumer node.
assumes that the `TableEntry` for `gInfo` is open. -/
def consume (gInfo : GoalInfo) (proofKeys : List (ProofKeys × Bool))
    (times : Array Nat) (posPriority : PosPriority) (instGoalMVars : Option (Array MVarId))
    (subgoals : Array GoalId) : SearchM Unit := do
  match ← if (← getConfig).orderSubgoalsAndAxioms then bestSubgoal subgoals else bestSubgoal' subgoals with
  | .error true =>
    logMessage s!"adding answer to goal {← gInfo.goal.toString}"
    addAnswer gInfo proofKeys
  | .error false =>
    logMessage s!"goal {← gInfo.goal.toString} is now unsolvable"
  | .ok ((subgoalId, todo), laterSubgoals) =>
    let subgoalInfo   ← mkGoalInfo subgoalId
    let numApps    := subgoalInfo.goal.size
    let proof         ← gInfo.goalId.getInstantiatedAssignment
    let instGoalMVars ← instGoalMVars.bindM (OptionT.run <| ·.mapM (·.instantiateHead))
    let { postponeSpiralSearch, useOldSpiralDetect, .. } ← getConfig
    let isSpiral ← if postponeSpiralSearch then
      (if useOldSpiralDetect then isSpiralDeprecated else Iterate.isSpiral) gInfo subgoalInfo proof
      else pure false
    let priorityMod  := { numApps, times := times.push (← getUnique), casesFactor := laterSubgoals.size + 1, isSpiral }
    let cNode := { gInfo, subgoalInfo, proof, proofKeys, laterSubgoals, instGoalMVars, priorityMod }
    let posPriority := posPriority.modify priorityMod
    match todo with
    | .inl axioms =>
      processSubgoal cNode axioms posPriority
    | .inr answer =>
      increment
      wakeUp cNode posPriority answer
      -- we've been given a full proof, so we can close this table entry.
      if let some (.openE entry) ← findEntry? subgoalInfo.key then
        wakeUpWaiters entry answer
        setDoneEntry subgoalInfo.key #[answer]
        entry.waiters.forM fun cNode _ => do
          modifyOpenEntry cNode.gInfo.key %%.waitingFor (·.erase cNode)
          /- TODO: find a way to track down all answers and consumernodes that depend on
          any alternative anwers from this entry, and kill them. -/
        entry.waitingFor.forM fun cNode => do
          modifyOpenEntry cNode.subgoalInfo.key %%.waiters (·.erase cNode)
          fixPriority cNode.subgoalInfo.key
        fixCycles entry

where
  bestSubgoal' (goals : Array GoalId) : SearchM (Except Bool ((GoalId × (Array ConstantInfo ⊕ _)) × Array GoalId)) := do
    if h : goals.size = 0 then
      return .error true
    else
      let goalId := goals[0]
      let goal ← goalId.getInstantiatedGoal
      let axioms ← getApplicableAxioms goal
      return .ok ((goalId, .inl axioms), goals[1:])

/-- Try the next instance in the node on the top of the generator stack. -/
@[specialize]
def generate (posPriority : Option PosPriority) (key : CellKey) (pop : SearchM Unit) : SearchM Unit := do
  let .openE entry@{ gNode, priority := .some posPriority', .. } ← getEntry key | pop
  if gNode.currAxiomIdx == 0  then
    pop
  else
  if let some posPriority := posPriority then
    match posPriority'.cmp posPriority (← getConfig) with
    | .lt => pop
    | .gt => throw "bad priority stack :("
    | .eq => go entry gNode posPriority
  else
    go entry gNode posPriority'
where
  go entry gNode posPriority := do
    let idx      := gNode.currAxiomIdx - 1
    let ax       := gNode.axioms.get! idx
    setMCtx gNode.gInfo.mctx
    setGCtx gNode.gInfo.goalctx
    setOpenEntry key { entry with gNode.currAxiomIdx := idx }
    if let some subgoals ← tryAxiom gNode.gInfo ax then
      consume gNode.gInfo [] #[] posPriority gNode.gInfo.mvars subgoals

section Circles

partial def relevantProofKeys (cycle : Std.HashSet CellKey) (result : Std.HashMap CellKey Bool)
    (proofKeys : ProofKeys) (spirals? : Bool := false) : SearchM (Std.HashMap CellKey Bool) := do
  let .node key proofs := proofKeys
  if cycle.contains key then
    proofs.foldlM (init := result.insert key spirals?) fun result (proofKeys, spirals?') =>
      relevantProofKeys cycle result proofKeys (spirals? || spirals?')
  else
    return result

partial def possiblyNoLoop (cycle : Std.HashSet CellKey) (used : Std.HashMap CellKey Bool) (key : CellKey)
    (stack : List CellKey) : SearchM Bool := do
  if used.contains key || stack.contains key then
    logMessage s!"poor {key}"
    return false
  -- else
  --   return true
  if !cycle.contains key then
    return true
  let stack := key :: stack
  let { waiters, firstWaiter := some _, .. } ← getOpenEntry key | return true
  for (cNode, _) in waiters do
    if ← possiblyNoLoop cycle used cNode.gInfo.key stack then
      return true
  return false

-- TODO: look at variable assignments, and only mark a loop if they return to the same place
/-- If `possiblyNoLoop` returned false, then we check if there is a loop that moves the instanitations. -/
partial def possiblySpiral (used : Std.HashMap CellKey Bool) (key : CellKey)
    (stack : List CellKey) (spirals? : Bool := false) : SearchM Bool := do
  match used[key]? with
  | some spirals?' => return spirals? || spirals?'
  | none =>

    if stack.contains key then
      return false
    let stack := key :: stack
    let { waiters, .. } ← getOpenEntry key
    for (cNode, _) in waiters do
      if ← possiblySpiral used cNode.gInfo.key stack spirals? then
        return true
    return false

end Circles

/--
  Given `(cNode, answer)` on the top of the resume stack, continue execution by using `answer` to solve the
  next subgoal. -/
def resume (entry : ResumeEntry) (loopyCase : Bool) : SearchM Unit := do
  let { cNode, answer := { cInfo, proofKeys }, counts? } := entry
  let key := cNode.gInfo.key
  let .openE oentry ← getEntry key | logMessage s!"propagating a result for {key} is unnecessary"
  let .some posPiority := oentry.priority
    | modifyOpenEntry key %%.deadResumes (·.push entry)
  let gInfo := cNode.subgoalInfo
  let answerProofKeys := .node gInfo.key proofKeys
  let propagate : SearchM Unit := do
    if counts? then
      increment
    setMCtx gInfo.mctx
    setGCtx gInfo.goalctx
    let proofKeys     := (answerProofKeys, cNode.instGoalMVars.isNone) :: cNode.proofKeys
    let laterSubgoals := cNode.laterSubgoals
    let times         := cNode.priorityMod.times
    useAnswer cInfo gInfo.goalId
    logMessage s! "propagating answer {cInfo.gadget.conclusion} to subgoal {← gInfo.goalId.toString} of {← cNode.gInfo.goalId.toString}"
    consume cNode.gInfo proofKeys times posPiority cNode.instGoalMVars laterSubgoals

  if loopyCase then
    propagate
  else
  let cycle := (← getOpenEntry key).cycle
  let usedKeys ← relevantProofKeys cycle {} answerProofKeys
  /- check whether resuming this waiter can lead to a non-loop. -/
  if usedKeys.isEmpty then
    propagate
  else if ← possiblyNoLoop cycle usedKeys key [] then
    propagate
  else
    /- if not, check that resuming this waiter can lead to a loop which instantiates variables. -/
    if ← possiblySpiral usedKeys key [] then
      modify %%.loopyStack (·.cons (.inl entry))

def step : SearchM Bool := do
  let s ← get
  if let some (p, top) := s.resumeStack.top then
    match top with
    | [] =>
      modify %%.resumeStack (·.erase p)
      return true
    | top :: rest =>
      modify %%.resumeStack (·.insert' p rest)
      resume top false
      return true
  else if let some (p, top) := s.generatorStack.top then
    generate p top
      (modify %%.generatorStack (·.erase p))
    return true
  else if let some (x, loopyStack) := s.loopyStack.uncons? then
    increment
    -- throw "LOOP LOOP"
    logMessage "doing a loopy case"
    match x with
    | .inl r =>
      modify ({ · with loopyStack })
      resume r true
      return true
    | .inr gNode =>
      generate none gNode
        (modify ({ · with loopyStack }))
      return true
  else
    return false

/-- BRUH this is so hacky. -/
@[inline]
instance (priority := high) {m : Type → Type} {ρ : Type} [Monad m] : Monad (ReaderT ρ m) where
  bind := ReaderT.bind

def getResult : SearchM (Option ConstantInfo) := return (← get).result?

open GadgetGame

def getPartialResult (goalId : GoalId) (msg : String) : SearchM (Option String × ProofTree) := do
  return (msg, ← goalId.toProofTree)

partial def synth (timeout? : Option Nat) (goalId : GoalId) : SearchM (Option String × ProofTree) := do
  if ← IO.checkCanceled then
    throw "Cancel culture hits hard"
  if (← step) then
    match (← getResult) with
    | none        =>
      let { stepCount, .. } ← get
      if timeout?.any (· ≤ stepCount) then
        getPartialResult goalId "interrupted"
      else
      synth timeout? goalId
    | some cInfo =>
      return (none, ← cInfo.name.toProofTree)
  else
    getPartialResult goalId "finished with search"

def main (problemState : ProblemState) (timeout? : Option Nat) (config : Config) : BaseIO (Except String (Option String × ProofTree) × Nat × Array String) := do
  let { axioms, target := goal } := problemState
  let action : SearchM (Option String × ProofTree) := do
    let axioms ← axioms.foldlM (init := {}) fun axioms ax => do
      if let .app f args := ax.conclusion then
        let cInfo ← ax.addFreshConstantInfo
        let colour := { f, numArgs := args.size }
        let (axioms, axs) := axioms.eraseGetD colour #[]
        return axioms.insert colour (axs.push cInfo)
      else
        return axioms
    withReader ({ · with axioms }) do
    let (goal, { varNames, .. }) := (abstractTermAsCell goal).run {}
    let goal := goal.instantiate (← varNames.mapM mkFreshMVar)
    setTraceInfo goal
    let goalId := (← mkFreshGoalVar goal).goalId!
    let gInfo ← mkGoalInfo goalId
    let { orderSubgoalsAndAxioms, .. } ← getConfig
    let axioms ←
      if orderSubgoalsAndAxioms then
        pure (← checkAxioms goal).2
      else
        getApplicableAxioms goal
    do-- try
      let t0 ← IO.monoNanosNow
      newSubgoal gInfo axioms none rootPriority
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
  let ref ← IO.mkRef { config, currspiralState := default }
  let r ← (action.run { axioms := {} }) ref |>.toBaseIO
  let state ← ref.get
  pure (r, state.stepCount, state.log)

def runJovanSearch (problemState : ProblemState) (timeout? : Option Nat := none) (config : Config) : Lean.MetaM (ProofTree × Nat × Array String) := do
  match ← main problemState timeout? config with
  | (.ok (msg?, proof), log) =>
    if let some msg := msg? then
      Lean.logError msg
    return (proof, log)
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
