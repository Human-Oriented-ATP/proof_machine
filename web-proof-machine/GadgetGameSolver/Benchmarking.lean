import Lean
import GadgetGameSolver.DFS

open Lean GadgetGame

def main (args : List String) : IO Unit := do
  let timeout? : Option Nat := do
    let arg ← args.get? 0 -- assumes that the first argument is the timeout
    arg.toNat?
  initSearchPath (← Lean.findSysroot) [
    "build/lib",
    "GadgetGameSolver"
    ]
  let env ← importModules #[{ module := `GadgetGameSolver.PrologParser }] .empty
  let problems ← System.FilePath.walkDir "../problems" -- TODO: allow customisation here through command-line arguments
  for problem in problems do
    let problemState ← parsePrologFile env problem
    let ⟨tree, count, _⟩ := runDFS problemState timeout?
    if timeout?.isNone && !tree.isClosed then
      IO.println s!"{problem} could not be solved."
    else
      IO.println s!"{problem} solved in {count} steps."
