import GadgetGameSolver.Jovan.SearchM

namespace JovanGadgetGame

instance : Repr TracePos where
  reprPrec pos _ :=
    let args := Array.mkArray pos.cellColour.numArgs "_"
    let args := args.set! pos.position "·"
    let result := s! "{pos.cellColour.f}({", ".intercalate args.toList})"
    if pos.direction then
      s!"{result} →"
    else
      s!"← {result}"

def TracePos.revert (pos : TracePos) : TracePos := { pos with direction := !pos.direction }

abbrev TraceGraph := Std.HashMap TracePos (Std.HashSet TracePos)

abbrev TraceStarts := Array (TracePos × Function)


/--
Constructs the graph of traceable connections, and the start/end points
-/
def constructTraceGraph (mainGoal : Cell) : SearchM (TraceGraph × TraceStarts) := do
  let { axioms } ← read
  let mut graph : TraceGraph := {}
  let mut starts : TraceStarts := #[]
  for (_, axioms) in axioms do
    for ax in axioms do
      let gadget := ax.gadget
      /- When a variable appears as a sub-term in a cell, the same instantiation may appear somewhere else. -/
      let mut subMVars : Std.HashSet Nat := {}
      for (cell, isConcl) in gadget do
        for (position, term) in cell do
          if let .app f args := term then
            for i in (args.foldr AbstractedExpr.collectMVars {}).arr do
              subMVars := subMVars.insert i
            starts := starts.push ({
              cellColour := cellColour cell, position, direction := isConcl }, { f := f, numArgs := args.size })
      for i in [:gadget.varNames.size] do
        let isSubMVar := subMVars.contains i
        let mut positions : Array TracePos := #[]
        for (cell, isConcl) in gadget do
          for (position, term) in cell do
            if term == .mvar i then
              positions := positions.push {
                cellColour := cellColour cell, position, direction := isConcl }

        for (k, posK) in positions.enumerate do
          let posK := posK.revert
          let mut node := {}
          (graph, node) := graph.eraseGetD posK {}
          for (l, posL) in positions.enumerate do
            if k != l || isSubMVar then
              node := node.insert posL
          graph := graph.insert posK node

  for (position, term) in mainGoal do
    if let .app f args := term then
      starts := starts.push ({
        cellColour := cellColour mainGoal, position, direction := false }, { f := f, numArgs := args.size })
  return (graph, starts)

def setTraceInfo (mainGoal : Cell) : SearchM Unit := do
  let (graph, starts) ← constructTraceGraph mainGoal
  let mut combinations := {}
  let mut todo := starts
  while h : todo.size ≠ 0 do
    let (pos, f) := todo[todo.size - 1]
    todo := todo.pop
    unless combinations[pos]?.any (·.contains f) do
      combinations := combinations.modify' pos (·.getD {} |>.insert f)
      for pos' in graph.getD pos {} do
        todo := todo.push (pos', f)
  logMessage s!"{repr combinations}"
  modify %%.traceInfo fun _ => combinations

def Cell.traceAllows (c : Cell) : SearchM Bool := do
  let combinations := (← get).traceInfo
  let mut result := true
  for (pos, e) in c do
    if let .app f args := e then
      let pos1 : TracePos := { position := pos, cellColour := cellColour c, direction := true }
      let pos2 : TracePos := { position := pos, cellColour := cellColour c, direction := false }
      if !combinations[pos1]?.any (·.contains { f, numArgs := args.size })
          || !combinations[pos2]?.any (·.contains { f, numArgs := args.size }) then
        -- logMessage s!"problematic {repr pos}, {← e.toString}"
        result := false; break
  return result
