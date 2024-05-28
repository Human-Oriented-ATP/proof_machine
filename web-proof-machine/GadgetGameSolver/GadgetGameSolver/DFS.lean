import Lean
import GadgetGameSolver.Unification
import GadgetGameSolver.ProofTreeZipper

namespace GadgetGame

open Lean

structure State where
  assignmentCtx : VarAssignmentCtx := .empty
  location : Location
  count : Nat

structure Context where
  axioms : List Axiom

abbrev GadgetGameSolverM := StateT State <| ReaderM Context

instance (priority := high) : MonadState State GadgetGameSolverM := inferInstance

instance : MonadStateOf VarAssignmentCtx GadgetGameSolverM where
  get := do return (← get).assignmentCtx
  set ctx := do modify ({ · with assignmentCtx := ctx })
  modifyGet f := do
    modifyGet fun σ ↦
      let (a, ctx) := f σ.assignmentCtx
      (a, { σ with assignmentCtx := ctx })

instance : MonadStateOf Location GadgetGameSolverM where
  get := do return (← get).location
  set loc := do modify ({ · with location := loc })
  modifyGet f := do
    modifyGet fun σ ↦
      let (a, loc) := f σ.location
      (a, { σ with location := loc })

instance : MonadStateOf Nat GadgetGameSolverM where
  get := do return (← get).count
  set count := do modify ({ · with count := count })
  modifyGet f := do
    modifyGet fun σ ↦
      let (a, count) := f σ.count
      (a, { σ with count := count })

instance : MonadReaderOf (List Axiom) GadgetGameSolverM where
  read := do return (← read).axioms

instance : MonadBacktrack VarAssignmentCtx GadgetGameSolverM where
  saveState := do return (← getThe VarAssignmentCtx)
  restoreState ctx := do set ctx

def getMatchingAxioms (term : Term) : GadgetGameSolverM (List Axiom) := do
  let axioms ← readThe (List Axiom)
  axioms.filterM (term.unifiable? ·.conclusion)

mutual

partial def workOnCurrentGoal : ExceptT String GadgetGameSolverM Unit := do
  let ⟨.goal goal, _⟩ ← getThe Location | throw "Expected the current location to be a goal."
  let choices ← getMatchingAxioms goal
  applyAxioms choices

partial def applyAxiom («axiom» : Axiom) : ExceptT String GadgetGameSolverM Unit := do
  let ⟨.goal goal, _⟩ ← getThe Location | throw "Expected the current location to be a goal."
  let «axiom» ← «axiom».instantiateFresh "" -- TODO: Get a fresh variable name here
  Term.unify goal «axiom».conclusion
  changeCurrentTree <| .node (← axiom.conclusion.instantiateVars) («axiom».hypotheses.toList.map .goal)
  forEachChild workOnCurrentGoal

partial def applyAxioms (axioms : List Axiom) : ExceptT String GadgetGameSolverM Unit := do
  match axioms with
  | [] => throw "Out of choices."
  | choice :: choices =>
    let σ ← saveState
    try
      applyAxiom choice
    catch e =>
      restoreState σ
      applyAxioms choices

end

end GadgetGame
