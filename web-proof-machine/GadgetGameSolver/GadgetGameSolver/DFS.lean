import Lean
import GadgetGameSolver.Unification
import GadgetGameSolver.ProofTreeZipper

namespace GadgetGame

open Lean

variable [Monad M] [MonadStateOf Location M] [MonadStateOf VarAssignmentCtx M] [MonadBacktrack VarAssignmentCtx M] [MonadFinally M]

def getMatchingAxioms (term : Term) : M (List Axiom) := sorry

-- partial def DFS : M (Except String Unit) := do
--   let ⟨.goal term, path⟩ ← getThe Location | return (.error "Expected the current location to be a goal.")
--   let goal ← term.instantiateVars
--   let choices ← getMatches goal
--   match choices with
--   | [] => return (.error "No applicable axioms.")
--   | choice :: choices =>
--     let σ ← getThe VarAssignmentCtx
--     let «axiom» ← choice.instantiateFresh ""
--     let .ok () ← Term.unify goal «axiom».conclusion | unreachable!
--     modifyThe Location <| change (tree := .node (← axiom.conclusion.instantiateVars) («axiom».hypotheses.toList.map .goal))

--     (List.range «axiom».hypotheses.size).foldlM (init := pure ()) fun acc idx ↦ do
--       goDownTo idx
--       let resultAtIdx ← DFS
--       return acc >>= (fun () ↦ resultAtIdx)

mutual

partial def workOnCurrentGoal : ExceptT String M Unit := do
  let ⟨.goal goal, _⟩ ← getThe Location | throw "Expected the current location to be a goal."
  let choices ← getMatchingAxioms goal
  applyAxioms choices

partial def applyAxiom («axiom» : Axiom) : ExceptT String M Unit := do
  let ⟨.goal goal, _⟩ ← getThe Location | throw "Expected the current location to be a goal."
  let «axiom» ← «axiom».instantiateFresh "" -- TODO: Get a fresh variable name here
  Term.unify goal «axiom».conclusion
  changeCurrentTree <| .node (← axiom.conclusion.instantiateVars) («axiom».hypotheses.toList.map .goal)
  forEachChild workOnCurrentGoal

partial def applyAxioms (axioms : List Axiom) : ExceptT String M Unit := do
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
