import GadgetGameSolver.Jovan.Unification
import GadgetGameSolver.Jovan.Basic

namespace JovanGadgetGame

section Proving
universe u v

@[inline] def foldMNat {α : Type u} {m : Type u → Type v} [Monad m] (n : Nat) (f : (i : Nat) → α → {_ : i < n} → m α) (init : α) : m α :=
  let rec @[specialize] loop (i : Nat) (h : i ≤ n) (a : α) :=
    match i with
    | 0   => pure a
    | i+1 => @f (n-1-i) a (Nat.sub_one_sub_lt h) >>= loop i (Nat.le_of_succ_le h)
  loop n (Nat.le_refl n) init

@[inline] def forMNat {m : Type → Type u} [Monad m] (n : Nat) (f : (i : Nat) → {_ : i < n} → m Unit) : m Unit :=
  let rec @[specialize] loop (i : Nat) (h : i ≤ n) :=
    match i with
    | 0   => pure ()
    | i+1 => do @f (n-1-i) (Nat.sub_one_sub_lt h); loop i (Nat.le_of_succ_le h)
  loop n (Nat.le_refl n)

end Proving


/-! Expanding the `Environment` -/

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
      let proofs ← foldMNat proofs.size (init := #[]) fun i newProofs => do
        let (newProof, proofResult, proofVars) ← go proofs[i]
        let proofResult := proofResult.instantiate proofVars
        let hypType := gadget.hypotheses[i].instantiate vars
        unless ← unify proofResult hypType do
          throw s!"mismatch: a proof of {← proofResult.toString} is applied to subgoal {← hypType.toString}"
        return newProofs.push newProof
      return (.node name vars proofs, gadget.conclusion, vars)
    else
      throw "incorrect number of proofs in proof node"

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
      let vars ← gadget.varNames.mapM mkFreshMVar
      forMNat proofs.size fun i => do
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
