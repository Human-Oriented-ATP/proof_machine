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

mutual
inductive LazyPartialProof where
| mk
  (goalId  : GoalId)
  (goalctx : Std.HashMap.Raw GoalId GoalDecl)
deriving Inhabited

inductive GoalDecl where
| mk
  (goal : Term)
  (proof : Option (PartialProof ⊕ LazyPartialProof))
deriving Inhabited
end

abbrev GoalContext := Std.HashMap.Raw GoalId GoalDecl

variable {m : Type → Type} [Monad m] [MonadStateOf MetavarContext m] [MonadStateOf GoalContext m] [MonadExceptOf String m]

def GoalId.toString (goalId : GoalId) : m String := do
  let some (.mk goal _) := (← get)[goalId]? | throw s!"oh no: goalId {goalId}"
  pure s!"{goal}"

def addGoal (goalId : GoalId) (goal : Term) (proof : Option (PartialProof ⊕ LazyPartialProof)) : m Unit :=
  modify (·.insert goalId (.mk goal proof))

mutual

  partial def PartialProof.instantiate (proof : PartialProof) : m PartialProof := do
    match proof with
    | .goal goalId => goalId.instantiatedProof
    | .node ax proofs =>
      let proofs ← proofs.mapM (·.instantiate)
      return .node ax proofs

  partial def GoalId.instantiatedProof (goalId : GoalId) : m PartialProof := do
    let some (.mk goal proof) := (← get)[goalId]? | throw "uh oh"
    match proof with
    | none => return .goal goalId
    | some proof =>
      let proof ← match proof with
        | .inl proof => pure proof
        | .inr proof => proof.eval
      let proof ← proof.instantiate
      modify (·.insert goalId (.mk goal (some (.inl proof))))
      pure proof

  partial def LazyPartialProof.eval : LazyPartialProof → m PartialProof
  | .mk goalId mctx => do
    let mctx' ← get
    set (mctx:GoalContext)
    let proof ← goalId.instantiatedProof
    set mctx'
    pure proof

end

def GoalId.getInstantiatedGoal (goalId : GoalId) : m Term := do
  let some (.mk goal proof) := (← get)[goalId]? | throw "iao"
  let goal ← instantiateVars goal
  modify (·.insert goalId (.mk goal proof))
  pure goal

def PartialProof.toProof : PartialProof → m Proof
  | .node ax proofs => do
    let proofs ← proofs.attach.mapM fun ⟨x, _⟩ => x.toProof
    return .node ax proofs
  | .goal goalId => throw s!"goal {goalId} is unsolved"

def PartialProof.toProofTree : PartialProof → m ProofTree
| .goal goalId => do
  let goal ← goalId.getInstantiatedGoal
  return .goal goal
| .node ax proofs => do
  let proofs ← proofs.attach.mapM fun ⟨x, _⟩ => x.toProofTree
  return .node ax proofs.toList
