import GadgetGameSolver.Jovan.DiscrTree
import GadgetGameSolver.ProofTreeZipper
import GadgetGameSolver.Jovan.Unification

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

/-- The tree of `CellKey` that are used in a proof.
We use it to detect circular patterns in proof propagation.
The `Bool` indicates whether the subgoal created a metavariable assignment in the goal.
This is relevant for differentiating repeating cycles from cycles that generate new solutions.

Oh wait, that only really works for cycles of length 1.
How to tell appart cycles that create the same solution, and ones that create different solutions?
answer: do the unifications along the cycle, and compare instantiated forms of the start and end:
The start cannot have instantiated variables, but the end could. if it does, then we have new solutions.
otherwise, we can compute the number of applications that lead to a repetition, and allow that amount of propagations.
 -/
inductive ProofKeys where
| node : CellKey → List (ProofKeys × Bool) → ProofKeys
deriving Inhabited

/-! Instantiating abstracted proofs -/

def AbstractedProofTerm.instantiate (proof : AbstractedProofTerm) (subst : Array Expr) (subst' : Array Proof) : Proof :=
  match proof with
  | .goal i                => subst'[i]!
  | .node name vars proofs =>
    .node name (vars.map (·.instantiate subst)) (proofs.attach.map fun ⟨x, _⟩ => x.instantiate subst subst')

def AbstractedProof.instantiate (proof : AbstractedProof) (subst : Array Expr) (subst' : Array Proof) : Proof :=
  proof.proof.instantiate subst subst'


/-! The environment containing the globally known proofs and axioms -/

attribute [local instance] Sum.inhabitedLeft

structure ConstantInfo where
  name       : Name
  gadget     : AbstractedGadget
  definition : GadgetGame.Axiom ⊕ AbstractedProof
  deriving Inhabited

structure Answer where
  cInfo     : ConstantInfo -- this constant must have 0 hypotheses.
  proofKeys : List (ProofKeys × Bool)
  deriving Inhabited

structure Environment where
  proofs    : Std.HashMap Name ConstantInfo := {}
  discrTree : DiscrTree Answer := {}

class MonadEnv (m : Type → Type) where
  getEnv : m Environment
  modifyEnv : (Environment → Environment) → m Unit

export MonadEnv (getEnv modifyEnv)

instance (m n) [MonadLift m n] [MonadEnv m] : MonadEnv n where
  getEnv      := liftM (getEnv : m _)
  modifyEnv f := liftM (modifyEnv f : m _)


variable {m : Type → Type} [Monad m] [MonadUnique m] [MonadEnv m] [MonadConfig m]

def Name.getConstInfo (name : Name) : m ConstantInfo := do
  return (← getEnv).proofs[name]!

def ConstantInfo.addToEnv (cInfo : ConstantInfo) : m Unit := do
  modifyEnv fun env => { env with proofs := env.proofs.insert cInfo.name cInfo }

def Answer.cacheIt (answer : Answer) : m Unit := do
  if (← getConfig).cacheSolutions then
    modifyEnv fun env => { env with discrTree := env.discrTree.insertAbstractedCell answer.cInfo.gadget.conclusion answer }

def Answer.addToEnv (answer : Answer) : m Unit := do
  answer.cInfo.addToEnv
  answer.cacheIt

/-- Freshly adds a given axiom to the proof context. -/
def _root_.GadgetGame.Axiom.addFreshConstantInfo (ax : GadgetGame.Axiom) : m ConstantInfo := do
  let gadget := ax.abstract
  let cInfo := {
    gadget
    name.name  := ← getUnique
    definition := .inl ax }
  cInfo.addToEnv
  if gadget.hypotheses.isEmpty then
    ({ cInfo, proofKeys := [] : Answer }).cacheIt
  return cInfo

def Cell.getCached? (c : Cell) : m (Option Answer) := do
  return ((← getEnv).discrTree.getMatch c)[0]?

-- /-- Finds the cached proof of a `Cell` if it is available. Uses a discrimination tree. -/
-- def Cell.findCachedProof? [MonadMCtx m] [MonadExceptOf String m] (c : Cell) : m (Option (Proof × Answer)) := do
--   let some answer ← c.getCached? | return none
--   let (mvars, gadget) ← answer.cInfo.gadget.instantiateFresh
--   if ← unify gadget.conclusion c then
--     return some (.node answer.cInfo.name mvars #[], answer)
--   else
--     throw "failed to use cached anser"
