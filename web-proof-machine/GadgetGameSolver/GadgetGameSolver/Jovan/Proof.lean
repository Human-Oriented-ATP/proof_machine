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

inductive AbstractedProofTerm where
| goal : Nat → AbstractedProofTerm
| node : Name → Array AbstractedExpr → Array AbstractedProofTerm → AbstractedProofTerm
deriving Inhabited

structure AbstractedProof where
  proof    : AbstractedProofTerm
  numVars  : Nat
  numGoals : Nat
  deriving Inhabited

/-! Creating `AbstractedProof` from `Proof` -/

structure MkAbstractedProofState where
  exprMap  : Std.HashMap MVarId AbstractedExpr := {}
  proofMap : Std.HashMap GoalId AbstractedProofTerm := {}

def abstractProof (proof : Proof) : StateM MkAbstractedProofState AbstractedProofTerm := do
  match proof with
  | .goal goalId =>
    let s ← get
    match s.proofMap[goalId]? with
    | some proof => pure proof
    | none =>
      let proof := .goal s.proofMap.size
      set { s with proofMap := s.proofMap.insert goalId proof }
      pure proof
  | .node name vars proofs =>
    let proofs ← proofs.attach.mapM fun ⟨proof, _⟩ => abstractProof proof
    let (vars, { map := exprMap }) := vars.mapM abstractExpr |>.run { map := (← get).exprMap }
    modify ({ · with exprMap })
    return .node name vars proofs

def Proof.abstract (proof : Proof) : AbstractedProof :=
  let (proof, s) := (abstractProof proof).run {}
  { proof, numVars := s.exprMap.size, numGoals := s.proofMap.size }

/-! Instantiating abstracted proofs -/

def AbstractedProofTerm.instantiate (proof : AbstractedProofTerm) (subst : Array Expr) (subst' : Array Proof) : Proof :=
  match proof with
  | .goal i                => subst'[i]!
  | .node name vars proofs =>
    .node name (vars.map (instantiateExpr · subst)) (proofs.attach.map fun ⟨x, _⟩ => x.instantiate subst subst')

def AbstractedProof.instantiate (proof : AbstractedProof) (subst : Array Expr) (subst' : Array Proof) : Proof :=
  proof.proof.instantiate subst subst'
