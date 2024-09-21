import Lean
import GadgetGameSolver.Unification
import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.PrologParser
import GadgetGameSolver.GUIExport
import GadgetGameSolver.JovanSearch

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
    let annotatedMessage := s!"{← getStepCount} : {message}"
    modify (fun σ ↦ { σ with log := σ.log.push annotatedMessage })

def getCurrentGoal : ExceptT String GadgetGameSolverM Term := do
  let ⟨.goal goal, _⟩ ← getThe Location | throw "Expected the current location to be a goal."
  return goal

def getMatchingAxioms (term : Term) : GadgetGameSolverM (List Axiom) := do
  log s!"Finding axioms matching `{← term.instantiateVars}` ..."
  Array.toList <$> Term.filterRelevantAxioms term (← read).axioms.toArray (← read).sort?

def getApproximatelyMatchingAxioms : ExceptT String GadgetGameSolverM (List Axiom) := do
  let ⟨.goal _, .node youngerSiblings _ «axiom» _⟩ ← getThe Location |
    throw "Expected the current location to be a goal, different from the root."
  let term := «axiom».hypotheses[youngerSiblings.length]!
  deallocate term.collectVarsDedup
  log s!"Finding approximate axioms matching `{← term.instantiateVars}` ..."
  liftM <| getMatchingAxioms term

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
  incrementStepCount
  changeCurrentTree <| .node «axiom» (goals := ← «axiom».hypotheses.toList.mapM (.goal <$> ·.instantiateVars))

mutual

partial def workOnCurrentGoal : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  let goal ← getCurrentGoal
  log s!"Working on goal `{goal}` ..."
  match (← readThe OngoingGoalCtx).find? (Term.subsumes (← goal.instantiateVars) ·) with
  | some ongoingGoal =>
    goUp
    incrementStepCount
    log s!"The goal `{goal}` conflicts with the ongoing goal `{ongoingGoal}`."
    throw s!"Backtracking from `{goal}` due to conflict with the ongoing goal `{ongoingGoal}`."
  | none =>
    withTheReader OngoingGoalCtx (·.push (← goal.instantiateVars)) do
      log s!"Finding matching axioms for `{goal}` ..."
      let choices ← getMatchingAxioms goal -- TODO: load cached results here
      applyAxioms choices

partial def applyAxioms (axioms : List Axiom) (approx := false) : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  let goal ← getCurrentGoal
  match axioms with
  | [] =>
      if !approx then do
        log s!"No exact matches found for `{← goal.instantiateVars}`, trying approximate matches ..."
        let approxMatches ← getApproximatelyMatchingAxioms
        log <| toString approxMatches
        applyAxioms approxMatches (approx := true)
      else
        goUp
        incrementStepCount
        log s!"There are no axioms left to apply on `{goal}`."
        throw "Out of choices."
        -- TODO: mark goal as failed
  | choice :: choices =>
    let σ ← saveState
    try
      if approx then
        applyApproximateAxiom choice
      else
        applyAxiom choice
      -- TODO: order the goals
      forEachChild workOnCurrentGoal
      -- let ⟨proofTree, _⟩ ← getThe Location
      -- TODO: investigate the first condition
      -- if h:(← goal.instantiateVars).isClosed ∧ proofTree.isClosed then
      --   -- TODO: generalize the proof tree as much as possible and cache
      --   pure ()
      -- else
    catch e =>
      restoreState σ
      log s!"Error {e}: Failed to apply axiom {choice} on `{goal}`, trying the remaining ..."
      changeCurrentTree <| .goal goal
      applyAxioms choices (approx := approx)

partial def regrowProofTree (proofTree : ProofTree) : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  match proofTree with
  | .goal goal =>
    Term.unify (← getCurrentGoal) goal
    workOnCurrentGoal
  | .node «axiom» goals =>
    -- deallocate «axiom».collectVarsDedup -- TODO: check whether this line is necessary
    let σ ← saveState
    try
      applyAxiom «axiom»
      for (idx, tree) in goals.enum do
        visitChild idx
        regrowProofTree tree
        goUp
    catch e =>
      restoreState σ
      workOnCurrentGoal

partial def applyApproximateAxiom (approxAxiom : Axiom) : ExceptT String GadgetGameSolverM Unit := unless ← timedOut do
  let ⟨.goal _, .node youngerSiblings _ «axiom» _⟩ ← getThe Location |
    throw "Expected the current location to be a goal, different from the root."
  deallocate «axiom».collectVarsDedup

  log s!"Restoring parent tree state to `{«axiom»}` ..."
  goUp
  changeCurrentTree <| .goal «axiom».conclusion
  applyAxiom «axiom»
  -- TODO: re-order the goals

  log s!"Applying approximate axiom `{approxAxiom}` to child ..."
  visitChild youngerSiblings.length
  applyAxiom approxAxiom
  goUp

  log "Regrowing proof trees of siblings ..."
  for (idx, tree) in youngerSiblings.enum do
    visitChild idx
    regrowProofTree tree
    goUp

  visitChild youngerSiblings.length

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
elab stx:"#gadget_display" axioms?:("with_axioms")? name:str timeout?:(num)? : command => runTermElabM fun _ => do
  let problemState ← parsePrologFile s!"../problems/{name.getString}.pl"
  let (tree, numSteps, proofLog) ← JovanGadgetGame.runJovanSearch problemState (timeout?.map TSyntax.getNat)
    (config := { depthFirst := true, orderGoalsAndAxioms := true, prioritizeUndeepGoals := true })
  logInfoAt stx m!"number of steps: {numSteps}"
  logInfoAt stx m!"{proofLog}"
  if timeout?.isNone && !tree.isClosed then
    throwError "The proof tree is not closed."
  let initDiagram := ProofResult.getGadgetGraph ⟨problemState.target, tree⟩
  let initData : InitializationData := {
    initialDiagram := initDiagram,
    axioms := if axioms?.isSome then problemState.axioms else .empty
  }
  let jsonProps := Lean.toJson initData
  Widget.savePanelWidgetInfo (hash GadgetGraph.javascript)
    (return jsonProps) stx

#gadget_display with_axioms "tim_easy13"
/-
results:
tim_easy01: 6  - 5
tim_easy02: 40 - 29
tim_easy03: 40 - 11 - 13 - 5
tim_easy04: ∞  - 10 - 11
tim_easy05: ∞
tim_easy06: ∞
tim_easy07: 8  - 5
tim_easy08: ∞  - 42 - 15
tim_easy09: ∞  - 29 - ∞
tim_easy10: 14 - 8  - 5
tim_easy11: 3
tim_easy12: ∞  - 24 - 21 - 31
tim_easy13: 5 - 4

jacob25: 1439 - 329
-/
end GadgetGame
