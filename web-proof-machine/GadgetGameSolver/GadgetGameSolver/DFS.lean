import Lean
import GadgetGameSolver.Unification
import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.PrologParser

namespace GadgetGame

open Lean

structure State where
  assignmentCtx : VarAssignmentCtx := .empty
  location : Location
  count : Nat := 0

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

instance : MonadReaderOf (List Axiom) GadgetGameSolverM where
  read := do return (← read).axioms

instance : MonadBacktrack VarAssignmentCtx GadgetGameSolverM where
  saveState := do return (← getThe VarAssignmentCtx)
  restoreState ctx := do set ctx

def getStepCount : GadgetGameSolverM Nat := do
  return (← get).count

def incrementStepCount : GadgetGameSolverM Unit := do
  modify (fun σ ↦ { σ with count := σ.count.succ })

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
  let «axiom» ← «axiom».instantiateFresh (toString <| ← getStepCount)
  Term.unify goal «axiom».conclusion
  incrementStepCount
  changeCurrentTree <| .node (← axiom.conclusion.instantiateVars) («axiom».hypotheses.toList.map .goal)
  forEachChild workOnCurrentGoal

partial def applyAxioms (axioms : List Axiom) : ExceptT String GadgetGameSolverM Unit := do
  match axioms with
  | [] => throw "Out of choices."
  | choice :: choices =>
    incrementStepCount
    let σ ← saveState
    try
      applyAxiom choice
    catch e =>
      restoreState σ
      applyAxioms choices

end

def runDFS (problemState : ProblemState) : ProofTree :=
  let (_, σ) := workOnCurrentGoal
      |>.run { location := ⟨.goal problemState.target, .root⟩ }
      |>.run { axioms := problemState.axioms.toList }
  σ.location.tree

def runDFSOnFile (file : System.FilePath) : MetaM ProofTree :=
  runDFS <$> parsePrologFile file

#eval runDFSOnFile "../problems/tim_easyproblem1.pl"

end GadgetGame
