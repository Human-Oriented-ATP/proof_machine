import Lean
import GadgetGameSolver.Unification
import GadgetGameSolver.ProofTreeZipper

namespace GadgetGame

open Lean

variable [Monad M] [MonadStateOf Location M] [MonadStateOf VarAssignmentCtx M] [MonadBacktrack VarAssignmentCtx M] [MonadFinally M] [MonadReaderOf (List Axiom) M]

def getMatchingAxioms (term : Term) : M (List Axiom) := do
  let axioms ← readThe (List Axiom)
  axioms.filterM (term.unifiable? ·.conclusion)

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
