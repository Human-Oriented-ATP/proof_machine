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
  let (tree, numSteps, proofLog) ← JovanGadgetGame.runJovanSearch problemState (timeout?.map TSyntax.getNat) {
    depthFirst := true
    fewerCasesFirst := true
    -- simplerSolutionsFirst := false
    orderSubgoalsAndAxioms := true
    postponeLoopSearch := true
    postponeSpiralSearch := true
    useOldSpiralDetect  := true
  }
  logInfoAt stx m!"num steps: {numSteps}"

  -- logInfoAt stx m!"{proofLog}"

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


-- #gadget_display with_axioms "tim_easy05" 

-- #exit 44a and 5a

#gadget_display with_axioms "tim_easy01" -- 6  - 5
#gadget_display with_axioms "tim_easy02" -- 40 - 29 | 32
#gadget_display with_axioms "tim_easy03" -- 40 - 11 - 13 - 5
#gadget_display with_axioms "tim_easy04" -- ∞  - 10 - 11
#gadget_display with_axioms "tim_easy05" -- ∞  - 59
#gadget_display with_axioms "tim_easy06" -- ∞  - 109
#gadget_display with_axioms "tim_easy07" -- 8  - 5
#gadget_display with_axioms "tim_easy08" -- ∞  - 42 - 15 | 36 - 96
#gadget_display with_axioms "tim_easy09" -- ∞  - 29 - ∞ - 34 - 36 - 34 | 40 - 28
#gadget_display with_axioms "tim_easy10" -- 14 - 8  - 5
#gadget_display with_axioms "tim_easy11" -- 3
#gadget_display with_axioms "tim_easy12" -- ∞  - 24 - 21 - 31 - 21 - 25 - 21 | 28
#gadget_display with_axioms "tim_easy13" -- 5  - 4

-- #gadget_display with_axioms "jovan_easy02" -- 20

-- #gadget_display with_axioms "tim44a"

#exit
#gadget_display with_axioms "tim03" -- ∞ - 42
#gadget_display with_axioms "tim04" -- 41 | 36
#gadget_display with_axioms "tim05a" -- ∞ - 299
#gadget_display with_axioms "tim07" -- ∞ - 239
#gadget_display with_axioms "tim08" -- 24 | 28
#gadget_display with_axioms "tim10" -- 23
#gadget_display with_axioms "tim11" -- 13
#gadget_display with_axioms "tim12" -- 213 | 307
#gadget_display with_axioms "tim14" -- ∞ - 39
#gadget_display with_axioms "tim16" -- 17 | 19
#gadget_display with_axioms "tim17" -- 28 | 9
#gadget_display with_axioms "tim18" -- 19 | 18
#gadget_display with_axioms "tim19" -- 12
#gadget_display with_axioms "tim20" -- ∞ - 364
#gadget_display with_axioms "tim22a" -- ∞ - 116
#gadget_display with_axioms "tim22c" -- ∞ - 116
#gadget_display with_axioms "tim23" -- 25
#gadget_display with_axioms "tim24" -- 15 | 11
#gadget_display with_axioms "tim25" -- 84 | 45
#gadget_display with_axioms "tim25a" -- 32 | 34
#gadget_display with_axioms "tim27" -- ∞ - 565
#gadget_display with_axioms "tim31" -- ∞ - 1550
#gadget_display with_axioms "tim33" -- 31 | 33
#gadget_display with_axioms "tim36" -- 12 | 15
#gadget_display with_axioms "tim43" -- 11
#gadget_display with_axioms "tim44" -- ∞ - 115
#gadget_display with_axioms "tim44a" -- ∞ - 143
#gadget_display with_axioms "tim46" -- 123 | 90

/-
results:
tim01: ∞
tim02: 295??
tim03: ∞
tim04: 41
tim05: ∞
tim05a: ∞
tim06: ∞
tim07: ∞
tim08: 36
tim09: ∞
tim10: 23
tim11: 13
tim12: 341
tim14: ∞
tim16: 19
tim17: 25
tim18: 19
tim19: 11
tim20: ∞
tim21: ∞
tim22: ∞
tim22a: ∞
tim22b: ∞
tim22c: ∞
tim23: 25
tim24: 15
tim25: 77
tim25a: 32
tim27: ∞
tim28: ∞
tim29: ∞
tim30: ∞
tim31: ∞
tim32: ∞
tim33: 33
tim34: ∞
tim35: ∞
tim36: 15
tim37: ∞
tim37a: ∞
tim38: ∞
tim39: ∞
tim40: 114
tim41: 93??
tim42: ∞
tim43: 11
tim44: ∞
tim46: 123

jacob25: 1439 - 329 - ∞
-/
end GadgetGame


/-

157: new spiral goal g(7, xg(2, xg(4, 1)), 7)
183: new spiral goal g(7, xg(7, xg(2, xg(4, 1))), 7)
201: new spiral goal g(7, 7, xg(xg(2, xg(4, 1)), 7))
239: new spiral goal g(F, xg(xg(2, xg(4, 1)), B), C)
240: new spiral goal g(7, xg(xg(2, xg(4, 1)), B), C)
263: new spiral goal g(7, xg(7, xg(xg(2, 4), 1)), 7)
276: new spiral goal g(7, 7, xg(xg(xg(2, 4), 1), 7))
296: new spiral goal g(7, 7, xg(1, xg(2, 4)))
297: new spiral goal g(7, xg(1, xg(2, 4)), 7)


-/


/-

33: new spiral goal g(xg(2, 4), A, F)
42: new spiral goal g(xg(2, 4), D, 7)
48: new spiral goal g(xg(2, 4), D, 5)
68: new spiral goal g(F, 6, xg(5, 3))
111: new spiral goal g(7, xg(6, xg(5, 3)), 7)
112: new spiral goal g(7, 7, xg(6, xg(5, 3)))
116: new spiral goal g(F, 7, xg(5, 3))
119: new spiral goal g(xg(6, xg(5, 3)), D, C)
126: new spiral goal g(F, B, xg(5, 3))
142: new spiral goal g(xg(6, xg(5, 3)), B, 7)
143: new spiral goal g(7, B, xg(6, xg(5, 3)))
176: new spiral goal g(7, 7, xg(xg(6, 5), 3))
231: new spiral goal g(F, B, xg(6, 5))
253: new spiral goal g(7, xg(xg(xg(6, 5), 1), 2), 7)
259: new spiral goal g(F, B, xg(xg(xg(6, 5), 1), 2))
270: new spiral goal g(7, xg(xg(6, 5), 1), B)
289: new spiral goal g(7, B, xg(xg(5, 3), 6))
295: new spiral goal g(F, B, xg(xg(5, 3), 6))
317: new spiral goal g(7, xg(7, xg(xg(xg(6, 5), 1), 2)), 7)
330: new spiral goal g(7, 7, xg(xg(xg(xg(6, 5), 1), 2), 7))
353: new spiral goal g(7, 7, xg(2, xg(xg(6, 5), 1)))
372: new spiral goal g(F, B, xg(xg(6, 5), 1))
381: new spiral goal g(7, xg(2, xg(xg(6, 5), 1)), 7)
383: new spiral goal g(7, xg(2, xg(xg(6, 5), 1)), B)
385: new spiral goal g(xg(2, xg(xg(6, 5), 1)), D, C)
398: new spiral goal g(7, xg(xg(2, xg(6, 5)), 1), B)
399: new spiral goal g(7, 7, xg(xg(2, xg(6, 5)), 1))

--
`A₁ := A₀`, `A₁ := f B₀` => `A₀ := f B₀` => `A₀ := A₋₁` `A₋₁ := f B₀`
`A₁ := f A₀`, `B₁ := f B₀`, `A₁ := f B₀`
`A₁ := A₀`, `B₁ := B₀`, `A₁ := B₀`

`f B₀` =?= `f B₋₁`

`A₀ := f f f A₃` and `A₂ := f A₃`.
`A₁ := f f A₃`
nodes  `x₀ := {A₃}`, `x₁ := {A₂, f x₀}` and `x₂ := {A₀, f f x₁}`
`x := {A₀, f f (x+2), f (x+1)}`



I implemented the above described unification algorithm.

One tricky thing is that I had to take more care to ensure that the unification algorithm terminated. For example, if we have `A₁ := A₀` and `A₁ := f B₀` (`Xᵢ` should be read as  `Xₙ₊ᵢ`, with `n` universally quantified over `ℕ`) , merging these assignments gives `A₁ := A₀` and `A₀ := f B₀`, which gives `A₀ := A₋₁` and `A₋₁ := f B₀`, which keeps going. But, I found a way around this: if a variable is assigned to itself, and we merge a 'normal' assignment, then instead we unify the 'normal' assignment with its own shifted version, so in this case we get `A₀ := f B₀` and `f B₁` =?= `f B₀`.

A bigger problem lies in keeping track of the boundary conditions, i.e. for which values of `n` does the assignment hold? We don't really want to consider variables with a negative index. That is because we only want to consider gadgets `n` for natural numbers `n`. (The specific unifications are the conclusion of the `n+1`th gadget with the hypothesis of the `n`th gadget, and the conclusion of the `0`th gadget with the current goal). But in some cases this algorithm does extend the range to negatives, in particular when merging two assignments that hold in a different range. For example if `A₀ := f 5` and `A₁ := f B₀`, instead of simply assigning `B₀ := 5`, in order to merge it will also assign `A₀ := f B₋₁`. I'm still thinking about the best way to fix this.

In the meantime, I tested the new algorithm on some problems. It didn't change anything for most problems. However, the number of steps to solve tim5a surprisingly went up from 299 to 391. Taking a closer look, we can see why. I attached a screenshot of the position after 33 steps. Here, the algorithm focusses of the goal `g(xg(2, 4), _, _)` (where `9 = xg(2, 4)`). The argument that created this from the original goal  `g(4, 6, 5)` generalizes to an argument that turns a goal `g(A, 6, _)` into a goal `g(xg(2, A), _, _)`. So, the new loop detection is able to see this as a spiral. Unfortunately, This search branch is actually correct, and that goal should be closed with a simple `g(xg(2, 4), 2, 4)`. Instead my program does some other search. Fortunately though, at a later point the same goal is found in a different place and therefore it will still be considered, so the goal does get solved, but with some delay.





The algorithm could be modified to improve the behaviour on this, but the fundamental problem persists. Ideally, we would have an algorithm which can perfectly keep track of the range in which an equality is forced to hold, instead of being forced to guess that the range is bigger. To illustrate why this doesn't work in general, let's look at the assignments `A₀ := f f A₂` and `A₁ := f A₂`. My algorithm would first have to guess to lower the second condition to `A₀ := f A₁`. What a human would do instead is to notice that we can do a rewrite in order to prove that `A₀ := f A₁`. This is the kind of reasoning that we need: rewriting one equality in another one.

To solve this problem, we might do the unification in a way that ignores the boundary conditions, and afterwards, do a proof search to prove where the assignments must hold. The only issue with this is that a variable might have different assignments near the boundary (e.g `A₀ := f f A₂` and `Aₙ := f Aₙ₊₁` for `n ≥ 1`), but I think this isn't possible when working with just one boundary condition (i.e. not on an interval bounded from both sides). I think such an approach might work.

However, a more ambitious goal is to not just find the possibility of a spiral, but also to understand the general form of the spiral. This would require solving the unification with 2 boundary conditions: there is a first and a last





Luckily, there exists a data structure that supports this kind of reasoning: e-graphs. So I think e-graphs are the better way of dealing with this problem. When using an e-graph, instead of storing an equivalence relation on ground terms (normal expressions), it stores an equivalence relation on e-nodes (a function application in which the arguments are equivalence classes (e-classes) instead of ground terms). So in this example, naively creating the e-graph of the terms we've been given would result in the nodes nodes  `x₀ := {A₃}`, `x₁ := {A₂, f x₀}` and `x₂ := {A₀, f f x₁}`, from which it is obvious to see that `A₀ := f f A₂`. However, this naive approach doesn't take shifts into account. And you might have spotted already that by concluding `A₁ := f f A₃`, we are able to rewrite our way to the final result of `A₀ := f A₁`. So we need to have an e-graph with support for adding an integer to its e-classes. in that case, we would get a single e-class `x := {A₀, f f (x+2), f (x+1)}`, which would get transformed into

Whereas before, we were only able to reason using the rules of transitivity (a=b & b=c => a=c) and injectivity (f(a,b) = f(c,d) => a=c & b=d), e-graphs now also give the power of congruence (or `congrArg` in Lean jargon): a=c & b=d => f(a,b) = f(c,d). And my hypothesis is that using these rules is sufficient for these kinds of unification problems. A key feature of e-graphs that I'm also using here is their ability to keep track of proofs, or other pieces of explanation related to a proved equality. In this case, that piece of explanation is the range in which an equality holds.
