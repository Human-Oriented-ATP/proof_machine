import GadgetGameSolver.Jovan.Unification
import GadgetGameSolver.Jovan.Basic

namespace JovanGadgetGame

partial def generalizeProof (proof : Proof) : SearchM Proof := do
  let (result, _) ← go proof
  return result
where
  go : Proof → SearchM (Proof × AbstractedCell × Array Expr)
  | .goal _ => throw "proof contains a hole"
  | .node name _ proofs => do
    let gadget := (← name.getConstInfo).gadget
    if h : proofs.size = gadget.hypotheses.size then
      let vars ← gadget.varNames.mapM mkFreshMVar
      let proofs ← proofs.size.foldM' (init := #[]) fun i newProofs => do
        let (newProof, proofResult, proofVars) ← go proofs[i]
        let proofResult := proofResult.instantiate proofVars
        let hypType := gadget.hypotheses[i].instantiate vars
        unless ← unify proofResult hypType do
          throw s!"mismatch: a proof of {← proofResult.toString} is applied to subgoal {← hypType.toString}"
        return newProofs.push newProof
      return (.node name vars proofs, gadget.conclusion, vars)
    else
      throw "incorrect number of proofs in proof node"

/-- Expands the `Environment` with a new proof constant. -/
def GoalId.addFreshConstantInfo (goalId : GoalId) : SearchM ConstantInfo := do
  let some proof ← goalId.getAssignment? | throw "goalId is unassigned"
  let proof ← generalizeProof (← proof.instantiate!)
  let proof ← proof.instantiate!
  let conclusion ← proof.inferType
  let gadget : Gadget := { conclusion, hypotheses := #[] }
  let cInfo := {
    name.name := ← getUnique
    gadget := ← gadget.abstract
    definition := .inr (← proof.abstract) }
  cInfo.addToEnv
  return cInfo


/--
Generalizes an implication, replacing all parameters with fresh metavariables.
Returns the hypothesis and conclusion types of the implication.
-/
partial def generalizeImplication (proof : Proof) (goalId : GoalId) : SearchM (Cell × Cell) := do
  let .node name _ proofs := proof | throw "implication proof is a hole"
  let (result, some hyp) ← go name proofs |>.run none
    | throw "given goal doesn't appear in proof"
  pure (hyp, result)
where
  go (name : Name) (proofs : Array Proof) : StateRefT (Option Cell) SearchM Cell := do
    let gadget := (← name.getConstInfo).gadget
    if h : proofs.size = gadget.hypotheses.size then
      let append := s!"_{← getUnique}"
      let vars ← gadget.varNames.mapM (mkFreshMVar s!"{·}{append}")
      proofs.size.forM' fun i => do
        let hypType := gadget.hypotheses[i].instantiate vars
        match proofs[i] with
        | .goal goalId' =>
          if goalId' == goalId then
            if (← get).isSome then
              throw "given goal appears multiple times"
            set (some hypType)
        | .node name _ proofs =>
          let proofType ← go name proofs
          unless ← unify proofType hypType do
            throw s!"mismatch: a proof of {← proofType.toString} is applied to subgoal {← hypType.toString}"
      return gadget.conclusion.instantiate vars
    else
      throw "incorrect number of proofs in proof node"
