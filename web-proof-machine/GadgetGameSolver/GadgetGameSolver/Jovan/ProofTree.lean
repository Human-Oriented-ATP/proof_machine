import Lean
import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.Jovan.Unification

namespace JovanGadgetGame

open GadgetGame

inductive Proof where
| node : Axiom → Array Proof → Proof
deriving Inhabited, Repr

def Proof.toProofTree : Proof → ProofTree
| .node ax proofs => .node ax (proofs.attach.map fun ⟨x, _⟩ => x.toProofTree).toList


abbrev GoalId := Nat

inductive PartialProof where
| goal : GoalId → PartialProof
| node : Axiom → Array PartialProof → PartialProof
deriving Inhabited, Repr

structure GoalDecl where
  goal : Term
  proof : Option PartialProof
deriving Inhabited

abbrev GoalContext := Lean.PersistentHashMap GoalId GoalDecl


variable {m : Type → Type} [Monad m] [MonadStateOf MetavarContext m] [MonadStateOf GoalContext m] [MonadExceptOf String m]

def GoalId.toString (goalId : GoalId) : m String := do
  let some { goal, .. } := (← get).find? goalId | throw "oh no"
  pure s!"{goal}"


mutual

  partial def PartialProof.instantiate (proof : PartialProof) : m PartialProof := do
    match proof with
    | .goal goalId => goalId.instantiatedProof
    | .node ax proofs =>
      let proofs ← proofs.mapM (·.instantiate)
      return .node ax proofs

  partial def GoalId.instantiatedProof (goalId : GoalId) : m PartialProof := do
    let some goalDecl := (← get).find? goalId | throw "uh oh"
    match goalDecl.proof with
    | none => return .goal goalId
    | some proof =>
      let proof ← proof.instantiate
      modify (·.insert goalId { goalDecl with proof })
      pure proof

end

def PartialProof.toProof : PartialProof → m Proof
  | .node ax proofs => do
    let proofs ← proofs.attach.mapM fun ⟨x, _⟩ => x.toProof
    return .node ax proofs
  | .goal goalId => throw s!"goal {goalId} is unsolved"

def GoalId.getInstantiatedGoal (goalId : GoalId) : m Term := do
  let some { goal, proof } := (← get).find? goalId | throw "iao"
  let goal ← instantiateVars goal
  modify (·.insert goalId { goal, proof })
  pure goal
