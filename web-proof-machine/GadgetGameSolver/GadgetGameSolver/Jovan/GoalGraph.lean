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


abbrev Depth := Nat

private inductive CycleEntry where
| loop
| part : Depth → CellKey → CycleEntry
deriving Inhabited

private structure CycleState where
  stack   : Array CellKey := #[]
  visited : Std.HashMap CellKey CycleEntry := {}
  result  : Array CellKey := #[]

def initCycleState (key : CellKey) : CycleState where
  stack   := #[]
  visited := .insert {} key .loop
  result  := #[key]

@[inline]
private def getExceptSelf {α} : Except α α → α
  | .ok a | .error a => a

partial def findCycle (entry : OpenTableEntry) (s : CycleState)
    (cond : OpenTableEntry → Bool := fun _ => true) : SearchM CycleState :=
  if !cond entry then return s else
  entry.waiters.foldM (init := s) fun s { gInfo := { key, .. }, .. } _ => do
    match s.visited[key]? with
    | none =>
      let depth := s.stack.size
      let s := { s with
        stack   := s.stack.push key
        visited := s.visited.insert key (.part depth key) }
      let s ← findCycle (← getOpenEntry key) s
      return { s with stack := s.stack.pop }
    | some .loop =>
      return getExceptSelf <| s.stack.foldrM (init := s) fun key s =>
        match s.visited[key]! with
        | .loop => .error s
        | _     => .ok { s with
          result  := s.result.push key
          visited := s.visited.insert key .loop }
    | some entry@(.part depth key) =>
      if let some key' := s.stack[depth]? then
        if key == key' then
          return getExceptSelf <| s.stack.foldrM (init := s) fun key s =>
            match s.visited[key]! with
            | .loop          => .error s
            | .part depth' _ =>
              if depth < depth' then
                .ok { s with visited := s.visited.insert key entry }
              else
                .error s
      return s

private def _root_.Std.HashSet.first? {α : Type} [BEq α] [Hashable α] (m : Std.HashSet α) : Option α :=
  match m.forM Except.error with
  | .ok ()   => none
  | .error a => some a

partial def fixCyclesAux (keys : Std.HashSet CellKey) : SearchM Unit := do
  let some key := keys.first? | return
  let .openE entry ← getEntry key | fixCyclesAux (keys.erase key)
  let cycleArr := (← findCycle entry (initCycleState key)).result
  let cycle    := Std.HashSet.ofArray cycleArr
  cycleArr.forM fun key => modifyOpenEntry key ({ · with cycle })
  fixCyclesAux (cycleArr.foldl .erase keys)

def fixCycles (entry : OpenTableEntry) : SearchM Unit :=
  fixCyclesAux entry.cycle
