import Lean
import GadgetGameSolver.Unification
import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.PrologParser
import GadgetGameSolver.GUIExport

namespace GadgetGame

open Lean

-- inductive GoalStatus where
--   | ongoing
--   -- | failed
--   | solved (solution : ClosedProofTree)

-- abbrev GoalStatusCtx := HashMap Term GoalStatus

abbrev OngoingGoalCtx := Array Term

structure State where
  assignmentCtx : VarAssignmentCtx := .empty
  ongoingGoalCtx : OngoingGoalCtx := .empty
  location : Location
  count : Nat := 0
  log : Array String := #[]

structure Context where
  sort? : Bool
  axioms : List Axiom
  timeout? : Option Nat := none
  verbose : Bool := true

abbrev GadgetGameSolverM := StateT State <| ReaderM Context

instance (priority := high) : MonadState State GadgetGameSolverM := inferInstance

instance : MonadStateOf VarAssignmentCtx GadgetGameSolverM where
  get := do return (← get).assignmentCtx
  set ctx := do modify ({ · with assignmentCtx := ctx })
  modifyGet f := do
    modifyGet fun σ ↦
      let (a, ctx) := f σ.assignmentCtx
      (a, { σ with assignmentCtx := ctx })

instance : MonadStateOf OngoingGoalCtx GadgetGameSolverM where
  get := do return (← get).ongoingGoalCtx
  set ctx := do modify ({ · with ongoingGoalCtx := ctx })
  modifyGet f := do
    modifyGet fun σ ↦
      let (a, ctx) := f σ.ongoingGoalCtx
      (a, { σ with ongoingGoalCtx := ctx })


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

def timedOut : GadgetGameSolverM Bool := do
  match (← read).timeout? with
  | none => return false
  | some timeout => return (← getStepCount) ≥ timeout

def log (message : String) : GadgetGameSolverM Unit := do
  if (← read).verbose then
    let annotatedMessage := s!"{← getStepCount} : {message}"
    modify (fun σ ↦ { σ with log := σ.log.push annotatedMessage })

mutual

partial def workOnCurrentGoal : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  let goal ← getCurrentGoal
  log s!"Working on goal `{goal}` ..."
  match (← getThe OngoingGoalCtx).find? (Term.subsumes (← goal.instantiateVars) ·) with
  | some ongoingGoal =>
    goUp
    incrementStepCount
    log s!"The goal `{goal}` conflicts with the ongoing goal {ongoingGoal}."
    throw s!"Backtracking from `{goal}` due to conflict with the ongoing goal {ongoingGoal}."
  | none =>
    modifyThe OngoingGoalCtx (·.push (← goal.instantiateVars))
    log s!"Finding matching axioms for `{goal}` ..."
    let choices ← getMatchingAxioms goal (← read).sort? -- TODO: load cached results here
    applyAxioms choices

partial def applyAxiom («axiom» : Axiom) : ExceptT String GadgetGameSolverM Unit := do
  let goal ← getCurrentGoal
  log s!"Applying axiom `{«axiom»}` to goal `{goal}` ..."
  let «axiom» ← «axiom».instantiateFresh (toString <| ← getStepCount)
  Term.unify «axiom».conclusion goal -- putting the axiom as the first argument ensures that its variables get instantiated to the ones in the goal
  incrementStepCount
  changeCurrentTree <| .node «axiom»
    (term := ← «axiom».conclusion.instantiateVars)
    (goals := ← «axiom».hypotheses.toList.mapM (.goal <$> ·.instantiateVars))
  forEachChild workOnCurrentGoal

partial def applyAxioms (axioms : List Axiom) : ExceptT String GadgetGameSolverM Unit := do
  let goal ← getCurrentGoal
  match axioms with
  | [] =>
      goUp
      incrementStepCount
      modifyThe OngoingGoalCtx (·.erase goal)
      log s!"There are no axioms left to apply on `{goal}`."
      throw "Out of choices."
      -- TODO: mark goal as failed
  | choice :: choices =>
    let σ ← saveState
    try
      applyAxiom choice
      let ⟨proofTree, _⟩ ← getThe Location
      -- TODO: investigate the first condition
      -- if h:(← goal.instantiateVars).isClosed ∧ proofTree.isClosed then
      --   -- TODO: generalize the proof tree as much as possible and cache
      --   pure ()
      -- else
      modifyThe OngoingGoalCtx (·.erase goal)
    catch e =>
      restoreState σ
      log s!"Error {e}: Failed to apply axiom {choice} on `{goal}`, trying the remaining ..."
      changeCurrentTree <| .goal goal
      applyAxioms choices

end

def runDFS (problemState : ProblemState) (timeout? : Option Nat := none) : ProofTree × Array String :=
  let (_, σ) := workOnCurrentGoal
      |>.run { location := ⟨.goal problemState.target, .root⟩ }
      |>.run { sort? := false, axioms := problemState.axioms.toList, timeout? := timeout?, verbose := true }
  let proofTree := σ.location.tree
  (proofTree, σ.log)

def runDFSOnFile (file : System.FilePath) : MetaM (ProofTree × Array String) :=
  runDFS <$> parsePrologFile file

open Lean Elab Meta Term Elab Command in
elab stx:"#gadget_display" name:str timeout?:(num)? : command => runTermElabM fun _ => do
  let problemState ← parsePrologFile s!"../problems/{name.getString}.pl"
  let ⟨tree, proofLog⟩ := runDFS problemState (timeout?.map TSyntax.getNat)
  logInfoAt stx m!"{proofLog}"
  if timeout?.isNone && !tree.isClosed then
    throwError "The proof tree is not closed."
  let initDiagram := tree.getGadgetGraph
  let initData : InitializationData := {
    initialDiagram := initDiagram,
    axioms := problemState.axioms
  }
  let jsonProps := Lean.toJson initData
  Widget.savePanelWidgetInfo (hash GadgetGraph.javascript)
    (return jsonProps) stx

#gadget_display "tim_easy01"

end GadgetGame
