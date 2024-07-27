import Lean
import GadgetGameSolver.Unification
import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.PrologParser
import GadgetGameSolver.GUIExport

namespace GadgetGame

open Lean

inductive GoalStatus where
  | ongoing
  -- | failed
  | solved (solution : ClosedProofTree)

abbrev GoalStatusCtx := HashMap Term GoalStatus

structure State where
  assignmentCtx : VarAssignmentCtx := .empty
  goalStatusCtx : GoalStatusCtx := .empty
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

instance : MonadStateOf GoalStatusCtx GadgetGameSolverM where
  get := do return (← get).goalStatusCtx
  set ctx := do modify ({ · with goalStatusCtx := ctx })
  modifyGet f := do
    modifyGet fun σ ↦
      let (a, ctx) := f σ.goalStatusCtx
      (a, { σ with goalStatusCtx := ctx })

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

def getCurrentGoal : ExceptT String GadgetGameSolverM Term := do
  let ⟨.goal goal, _⟩ ← getThe Location | throw "Expected the current location to be a goal."
  return goal

def getMatchingAxioms (term : Term) (sort? : Bool) : GadgetGameSolverM (List Axiom) := do
  let axioms := (← read).axioms
  Array.toList <$> Term.filterRelevantAxioms term axioms.toArray sort?

mutual

partial def workOnCurrentGoal : ExceptT String GadgetGameSolverM Unit := do
  let goal ← getCurrentGoal
  match (← getThe GoalStatusCtx).find? (← goal.instantiateVars) with
  | some (.solved proofTree) =>
      changeCurrentTree proofTree
  | some .ongoing => throw "Avoiding working on an open goal."
  | none =>
      modifyThe GoalStatusCtx (·.insert (← goal.instantiateVars) .ongoing)
      let choices ← getMatchingAxioms goal (← read).sort?
      applyAxioms choices

partial def applyAxiom («axiom» : Axiom) : ExceptT String GadgetGameSolverM Unit := do
  let goal ← getCurrentGoal
  let «axiom» ← «axiom».instantiateFresh (toString <| ← getStepCount)
  Term.unify «axiom».conclusion goal -- putting the axiom as the first argument ensures that its variables get instantiated to the ones in the goal
  incrementStepCount
  changeCurrentTree <| .node (← axiom.conclusion.instantiateVars) («axiom».hypotheses.toList.map .goal)
  forEachChild workOnCurrentGoal

partial def applyAxioms (axioms : List Axiom) : ExceptT String GadgetGameSolverM Unit := do
  let goal ← getCurrentGoal
  match axioms with
  | [] => throw "Out of choices."
  | choice :: choices =>
    let σ ← saveState
    try
      applyAxiom choice
      let ⟨proofTree, _⟩ ← getThe Location
      if h:(← goal.instantiateVars).isClosed ∧ proofTree.isClosed then
        modifyThe GoalStatusCtx <| (·.insert (← goal.instantiateVars) <| .solved ⟨proofTree, h.right⟩)
      else
        modifyThe GoalStatusCtx <| (·.erase goal)
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

#eval show MetaM _ from do
  let tree ← runDFSOnFile "../problems/tim_easy01.pl"
  let graph := tree.val.getGadgetGraph
  let out := toJson graph
  IO.FS.writeFile "../public/demo_diagram_props.json" out.pretty

end GadgetGame
