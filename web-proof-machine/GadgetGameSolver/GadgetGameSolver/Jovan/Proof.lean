import GadgetGameSolver.Jovan.Term
import GadgetGameSolver.ProofTreeZipper

namespace JovanGadgetGame

structure Name where
  name : Nat
  deriving Inhabited, BEq

instance : Hashable Name where
  hash n := hash n.name

structure GoalId where
  id : Nat
  deriving Inhabited, BEq

instance : Hashable GoalId where
  hash goalId := hash goalId.id

inductive Proof where
| goal : GoalId → Proof
| node : Name → Array Expr → Array Proof → Proof
deriving Inhabited

def Proof.goalId! : Proof → GoalId
  | goal goalId => goalId
  | _ => panic! "goal expected"

inductive AbstractedProofTerm where
| goal : Nat → AbstractedProofTerm
| node : Name → Array AbstractedExpr → Array AbstractedProofTerm → AbstractedProofTerm
deriving Inhabited

structure AbstractedProof where
  proof    : AbstractedProofTerm
  varNames : Array String
  goals    : Array AbstractedCell
  deriving Inhabited

/-! Instantiating abstracted proofs -/

def AbstractedProofTerm.instantiate (proof : AbstractedProofTerm) (subst : Array Expr) (subst' : Array Proof) : Proof :=
  match proof with
  | .goal i                => subst'[i]!
  | .node name vars proofs =>
    .node name (vars.map (instantiateExpr · subst)) (proofs.attach.map fun ⟨x, _⟩ => x.instantiate subst subst')

def AbstractedProof.instantiate (proof : AbstractedProof) (subst : Array Expr) (subst' : Array Proof) : Proof :=
  proof.proof.instantiate subst subst'
