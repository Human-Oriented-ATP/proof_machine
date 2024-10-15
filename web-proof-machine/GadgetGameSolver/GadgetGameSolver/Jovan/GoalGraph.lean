import GadgetGameSolver.Jovan.SearchM

namespace JovanGadgetGame


partial def fixPriority (key : CellKey) : SearchM Unit := do
  let entry ← getOpenEntry key
  let priority := entry.priority
  let cfg ← getConfig
  let priority' := entry.waiters.fold (init := .useless) fun priority _ priority' => priority.max priority' cfg
  if priority != priority' then
    if let .some posPriority := priority' then
      modify fun s => { s with generatorStack := s.generatorStack.insert posPriority key}
    setOpenEntry key { entry with priority := priority' }
    entry.waitingFor.forM fun cNode => do
      let priority := priority.modify cNode.priorityMod
      let key      := cNode.subgoalInfo.key
      let entry     ← getOpenEntry key
      unless entry.waiters.contains cNode do
        throw "uh oh"
      let waiters := entry.waiters.insert cNode priority
      setOpenEntry key { entry with waiters }
      fixPriority key


/-- Returns the representative of the cyclic connected component of `key` in the goal graph. -/
def findCycleRep (key : CellKey) : SearchM CellKey := do
  return (← getOpenEntry key).cycle.1

/-- Returns the representative of the cyclic connected component of `key` in the goal graph. -/
def findCycleSet (key : CellKey) : SearchM (Std.HashSet CellKey) := do
  return (← getOpenEntry key).cycle.2

partial def findCycle (key : CellKey) (rest cycle : Std.HashSet CellKey) :
    SearchM (Std.HashSet CellKey × Std.HashSet CellKey) := do
  if cycle.contains key then
    return (rest, cycle)
  else
    let rest := rest.erase key
    let cycle    := cycle.insert key
    let { waiters, .. } ← getOpenEntry key
    waiters.foldM (init := (rest, cycle)) fun (rest, cycle) cNode _ => do
      findCycle cNode.gInfo.key rest cycle

private def _root_.Std.HashSet.first? {α : Type} [BEq α] [Hashable α] (m : Std.HashSet α) : Except α Unit :=
  m.forM Except.error

partial def fixCycles (rest : Std.HashSet CellKey) : SearchM Unit := do
  let .error key := rest.first? | return
  let rest := rest.erase key
  let .openE { waiters, .. } ← getEntry key | fixCycles rest
  let (rest, cycle) ← waiters.foldM (init := (rest, {key})) fun (rest, cycle) cNode _ =>
    findCycle cNode.gInfo.key rest cycle
  cycle.forM fun key =>
    modifyOpenEntry key ({ · with cycle := (key, cycle) })
  fixCycles rest
