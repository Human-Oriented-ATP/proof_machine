import Lean
import GadgetGameSolver.Unification
import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.PrologParser

namespace GadgetGame

open Lean

inductive GoalStatus where
  | ongoing
  | failed
  | solved (solution : ClosedProofTree)

abbrev GoalStatusCtx := HashMap Term GoalStatus

structure State where
  assignmentCtx : VarAssignmentCtx := .empty
  goalStatus : GoalStatusCtx := .empty
  location : Location
  count : Nat := 0

structure Context where
  sort? : Bool
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

instance : MonadBacktrack VarAssignmentCtx GadgetGameSolverM where
  saveState := do return (← getThe VarAssignmentCtx)
  restoreState ctx := do set ctx

def getStepCount : GadgetGameSolverM Nat := do
  return (← get).count

def incrementStepCount : GadgetGameSolverM Unit := do
  modify (fun σ ↦ { σ with count := σ.count.succ })

def getMatchingAxioms (term : Term) (sort? : Bool) : GadgetGameSolverM (List Axiom) := do
  let axioms := (← read).axioms
  Array.toList <$> Term.filterRelevantAxioms term axioms.toArray sort?

mutual

partial def workOnCurrentGoal : ExceptT String GadgetGameSolverM Unit := do
  let ⟨.goal goal, _⟩ ← getThe Location | throw "Expected the current location to be a goal."
  let choices ← getMatchingAxioms goal (← read).sort?
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
    let σ ← saveState
    try
      applyAxiom choice
    catch e =>
      restoreState σ
      applyAxioms choices

end

def runDFS (problemState : ProblemState) : ClosedProofTree :=
  let (_, σ) := workOnCurrentGoal
      |>.run { location := ⟨.goal problemState.target, .root⟩ }
      |>.run { sort? := false, axioms := problemState.axioms.toList }
  let proofTree := σ.location.tree
  if h : proofTree.isClosed then
    ⟨proofTree, h⟩
  else
    panic! "Invalid proof tree, expected no open goals."

def runDFSOnFile (file : System.FilePath) : MetaM ClosedProofTree :=
  runDFS <$> parsePrologFile file

#eval runDFSOnFile "../problems/tim_easyproblem1.pl"

end GadgetGame
