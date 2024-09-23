import Lean
import GadgetGameSolver.Unification
import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.PrologParser
import GadgetGameSolver.GUIExport

namespace GadgetGame

open Lean

abbrev OngoingGoalCtx := Array Term

structure State where
  assignmentCtx : VarAssignmentCtx := .empty
  location : Location
  count : Nat := 0
  log : Array String := #[]

structure Context where
  sort? : Bool
  ongoingGoalCtx : OngoingGoalCtx := .empty
  target : Term
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

instance (priority := low) : MonadReaderOf OngoingGoalCtx (ExceptT String GadgetGameSolverM) where
  read := do return (← read).ongoingGoalCtx

instance (priority := low) : MonadWithReaderOf OngoingGoalCtx (ExceptT String GadgetGameSolverM) where
  withReader mod act := do
    withReader (fun σ ↦ { σ with ongoingGoalCtx := mod σ.ongoingGoalCtx }) do
      act

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

def log (message : String) : GadgetGameSolverM Unit := do
  if (← read).verbose then
    let annotatedMessage := s!"{← getStepCount}|{← getCurrentHeadTerm}: {message}"
    modify (fun σ ↦ { σ with log := σ.log.push annotatedMessage })

def getMatchingAxioms (term : Term) : GadgetGameSolverM (List Axiom) := do
  log s!"Finding axioms matching `{← term.instantiateVars}` ..."
  Array.toList <$> Term.filterRelevantAxioms term (← read).axioms.toArray (← read).sort?

def timedOut : GadgetGameSolverM Bool := do
  match (← read).timeout? with
  | none => return false
  | some timeout => return (← getStepCount) ≥ timeout

partial def reorderGoals (goals : List Term) : GadgetGameSolverM Unit := sorry
-- TODO: this probably requires adding a permutation order into the proof tree zipper

def applyAxiom («axiom» : Axiom) : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  let goal ← getCurrentGoal
  log s!"Applying axiom `{«axiom»}` to goal `{goal}` ..."
  let «axiom» ← «axiom».instantiateFresh (toString <| ← getStepCount)
  Term.unify «axiom».conclusion goal -- putting the axiom as the first argument ensures that its variables get instantiated to the ones in the goal
  changeCurrentTree <| .node «axiom» (← saveState) (goals := ← «axiom».hypotheses.toList.mapM (.goal <$> ·.instantiateVars))
  -- TODO: Order the goals

def resetProblem : ExceptT String GadgetGameSolverM Unit := do
  goToRoot
  changeCurrentTree <| .goal (← read).target

def resetCurrentTree : ExceptT String GadgetGameSolverM Unit := do
  log "Resetting the current tree ..."
  if ← isRoot then do
    resetProblem
  else atParent do
    let ⟨.node _ ctx _, _⟩ ← getThe Location | throw "The parent node cannot be a goal."
    restoreState ctx

mutual

partial def workOnCurrentGoal : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  let goal ← getCurrentGoal
  log s!"Working on goal `{goal}` ..."
  match (← readThe OngoingGoalCtx).find? (Term.subsumes goal ·) with
  | some ongoingGoal =>
    goUp
    log s!"The goal `{goal}` conflicts with the ongoing goal `{ongoingGoal}`."
    throw s!"Backtracking from `{goal}` due to conflict with the ongoing goal `{ongoingGoal}`."
  | none =>
    withTheReader OngoingGoalCtx (·.push goal) do
      log s!"Finding matching axioms for `{goal}` ..."
      let choices ← getMatchingAxioms goal -- TODO: load cached results here
      applyAxioms choices

partial def workWithAxiom («axiom» : Axiom) : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  incrementStepCount
  applyAxiom «axiom»
  -- TODO: order the new goals
  forEachChild workOnCurrentGoal

partial def applyAxioms (axioms : List Axiom) : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  let goal ← getCurrentGoal
  match axioms with
  | [] =>
      if goal == (← getCurrentHypothesis) then
        goUp
        log s!"There are no axioms left to apply on `{goal}`."
        throw "Out of choices."
        -- TODO: mark goal as failed
      else
        log s!"No exact matches found for `{goal}`, trying approximate matches ..."
        resetCurrentTree
        workOnCurrentGoal
        log "Repairing previous proof stubs ..."
        unless ← isRoot do
          atParent repairProofTree
  | choice :: choices =>
    let σ ← saveState
    try
      log s!"Trying to apply axiom `{choice}` on `{goal}` ..."
      workWithAxiom choice
      -- let ⟨proofTree, _⟩ ← getThe Location
      -- TODO: investigate the first condition
      -- if h:(← goal.instantiateVars).isClosed ∧ proofTree.isClosed then
      --   -- TODO: generalize the proof tree as much as possible and cache
      --   pure ()
      -- else
    catch e =>
      restoreState σ
      log s!"Error {e}: Failed to apply axiom `{choice}` on `{goal}`, trying the remaining ..."
      changeCurrentTree <| .goal goal
      applyAxioms choices

partial def repairProofTree : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  log "Repairing the proof tree ..."
  unless ← isGoal do
    forEachChild do
      let hyp ← getCurrentHypothesis
      try
        Term.unify hyp (← getCurrentHeadTerm)
        repairProofTree
      catch e =>
        log s!"Error {e}: Unification failed, repairing the mismatched tree ..."
        changeCurrentTree <| .goal hyp
        workOnCurrentGoal

end

def runDFS (problemState : ProblemState) (timeout? : Option Nat := none) : ProofTree × Nat × Array String :=
  let (_, σ) := workOnCurrentGoal
      |>.run { location := ⟨.goal problemState.target, .root⟩ }
      |>.run { sort? := false, target := problemState.target, axioms := problemState.axioms.toList, timeout? := timeout?, verbose := true }
  let proofTree := σ.location.tree
  (proofTree, σ.count, σ.log)

def runDFSOnFile (file : System.FilePath) : MetaM (ProofTree × Nat × Array String) := do
  runDFS <$> parsePrologFile (← getEnv) file

open Lean Elab Meta Term Elab Command in
elab stx:"#gadget_display" axioms?:("with_axioms")? name:str timeout?:(num)? : command => runTermElabM fun _ => do
  let problemState ← parsePrologFile (← getEnv) s!"../problems/{name.getString}.pl"
  let ⟨tree, count, proofLog⟩ := runDFS problemState (timeout?.map TSyntax.getNat)
  logInfoAt stx m!"{proofLog}"
  if timeout?.isNone && !tree.isClosed then
    throwError "The proof tree is not closed."
  else
    logInfoAt stx s!"Finished proof in {count} steps."
  let initDiagram := ProofResult.getGadgetGraph ⟨problemState.target, tree⟩
  let initData : InitializationData := {
    initialDiagram := initDiagram,
    axioms := if axioms?.isSome then problemState.axioms else .empty
  }
  let jsonProps := Lean.toJson initData
  Widget.savePanelWidgetInfo (hash GadgetGraph.javascript)
    (return jsonProps) stx

-- #gadget_display with_axioms "tim_easy09"

end GadgetGame
