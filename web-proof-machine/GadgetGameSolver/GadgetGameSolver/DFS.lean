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
  lateralBacktrack : Bool := true
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

def getCurrentGoal : ExceptT String GadgetGameSolverM Term := do
  let ⟨.goal goal, _⟩ ← getThe Location | throw "Expected the current location to be a goal."
  return goal

def getMatchingAxioms (term : Term) : GadgetGameSolverM (List Axiom) := do
  Array.toList <$> Term.filterRelevantAxioms term (← read).axioms.toArray (← read).sort?

def getApproximatelyMatchingAxioms : ExceptT String GadgetGameSolverM (List Axiom) := do
  let ⟨.goal _, .node youngerSiblings _ «axiom» _⟩ ← getThe Location |
    throw "Expected the current location to be a goal, different from the root."
  liftM <| getMatchingAxioms «axiom».hypotheses[youngerSiblings.length]!

def timedOut : GadgetGameSolverM Bool := do
  match (← read).timeout? with
  | none => return false
  | some timeout => return (← getStepCount) ≥ timeout

def log (message : String) : GadgetGameSolverM Unit := do
  if (← read).verbose then
    let annotatedMessage := s!"{← getStepCount} : {message}"
    modify (fun σ ↦ { σ with log := σ.log.push annotatedMessage })

partial def reorderGoals (goals : List Term) : GadgetGameSolverM Unit := sorry
-- TODO: this probably requires adding a permutation order into the proof tree zipper

partial def applyAxiom («axiom» : Axiom) : ExceptT String GadgetGameSolverM Unit := do
  let goal ← getCurrentGoal
  log s!"Applying axiom `{«axiom»}` to goal `{goal}` ..."
  let «axiom» ← «axiom».instantiateFresh (toString <| ← getStepCount)
  Term.unify «axiom».conclusion goal -- putting the axiom as the first argument ensures that its variables get instantiated to the ones in the goal
  incrementStepCount
  changeCurrentTree <| .node «axiom» (goals := «axiom».hypotheses.toList.map .goal)

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

partial def applyAxioms (axioms : List Axiom) : ExceptT String GadgetGameSolverM Unit := do
  let goal ← getCurrentGoal
  match axioms with
  | [] =>
      -- if (← read).lateralBacktrack then
      --   log s!"No exact matches found for `{goal}`, trying approximate matches ..."
      --   withReader ({· with lateralBacktrack := false}) do
      --     applyApproximateAxioms (← getApproximatelyMatchingAxioms)
      -- else
        goUp
        incrementStepCount
        log s!"There are no axioms left to apply on `{goal}`."
        throw "Out of choices."
        -- TODO: mark goal as failed
  | choice :: choices =>
    let σ ← saveState
    try
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
      applyAxioms choices

partial def regrowProofTree (proofTree : ProofTree) : ExceptT String GadgetGameSolverM Unit := do
  match proofTree with
  | .goal goal =>
    Term.unify (← getCurrentGoal) goal
    workOnCurrentGoal
  | .node «axiom» goals =>
    applyAxiom «axiom»
    for (idx, tree) in goals.enum do
      visitChild idx
      regrowProofTree tree
      goUp

partial def applyApproximateAxiom (approxAxiom : Axiom) : ExceptT String GadgetGameSolverM Unit := do
  let ⟨.goal _, .node youngerSiblings _ «axiom» elderSiblings⟩ ← getThe Location |
    throw "Expected the current location to be a goal, different from the root."
  deallocate «axiom».collectVarsDedup

  goUp
  changeCurrentTree <| .goal «axiom».conclusion
  applyAxiom «axiom»
  -- TODO: re-order the goals

  visitChild youngerSiblings.length
  applyAxiom approxAxiom
  goUp

  for (idx, tree) in youngerSiblings.enum do
    visitChild idx
    regrowProofTree tree
    goUp

  visitChild youngerSiblings.length
  forEachChild workOnCurrentGoal

  for (idx, tree) in elderSiblings.enum do
    visitChild (youngerSiblings.length.succ + idx)
    regrowProofTree tree
    goUp

partial def applyApproximateAxioms (axioms : List Axiom) : ExceptT String GadgetGameSolverM Unit := do
  pure ()

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
  let ⟨tree, proofLog⟩ := runDFS problemState (timeout?.map TSyntax.getNat)
  logInfoAt stx m!"{proofLog}"
  if timeout?.isNone && !tree.isClosed then
    throwError "The proof tree is not closed."
  let initDiagram := tree.getGadgetGraph
  let initData : InitializationData := {
    initialDiagram := initDiagram,
    axioms := if axioms?.isSome then problemState.axioms else .empty
  }
  let jsonProps := Lean.toJson initData
  Widget.savePanelWidgetInfo (hash GadgetGraph.javascript)
    (return jsonProps) stx

#gadget_display with_axioms "tim_easy03"

end GadgetGame
