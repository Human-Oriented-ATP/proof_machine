import GadgetGameSolver.Jovan.Proof

namespace JovanGadgetGame

/-! Proof metavariables -/

structure GoalDecl where
  goal     : Cell
  deriving Inhabited

structure GoalContext where
  decls       : Lean.PersistentHashMap GoalId GoalDecl := {}
  assignments : Lean.PersistentHashMap GoalId Proof := {}
  deriving Inhabited

class MonadGCtx (m : Type → Type) where
  getGCtx    : m GoalContext
  modifyGCtx : (GoalContext → GoalContext) → m Unit

export MonadGCtx (getGCtx modifyGCtx)

@[always_inline]
instance (m n) [MonadLift m n] [MonadGCtx m] : MonadGCtx n where
  getGCtx      := liftM (getGCtx : m _)
  modifyGCtx f := liftM (modifyGCtx f : m _)

variable {m : Type → Type} [Monad m] [MonadGCtx m] [MonadExceptOf String m]

abbrev setGCtx (goalCtx : GoalContext) : m Unit :=
  modifyGCtx (fun _ => goalCtx)

def mkFreshGoalVar [MonadUnique m] (goal : Cell) : m Proof := do
  let goalId := { id := ← getUnique }
  modifyGCtx %%.decls (·.insert goalId { goal })
  return .goal goalId

def GoalId.assign (goalId : GoalId) (proof : Proof) : m Unit :=
  modifyGCtx %%.assignments (·.insert goalId proof)

def GoalId.getGoal! (goalId : GoalId) : m Cell := do
  match (← getGCtx).decls[goalId] with
  | some decl => return decl.goal
  | none      => throw s!"unknown goal metavariable {goalId.id}"

def GoalId.getAssignment? (goalId : GoalId) : m (Option Proof) := do
  return (← getGCtx).assignments[goalId]

variable [MonadMCtx m] [MonadExceptOf String m]

def GoalId.getInstantiatedGoal (goalId : GoalId) : m Cell := do
  (← goalId.getGoal!).instantiateMVars

mutual
  partial def Proof.instantiateVars (proof : Proof) : m Proof := do
    match proof with
    | .goal goalId => goalId.getInstantiatedAssignment
    | .node name vars proofs =>
      let vars   ← vars.mapM (·.instantiateMVars)
      let proofs ← proofs.mapM (·.instantiateVars)
      return .node name vars proofs

  partial def GoalId.getInstantiatedAssignment (goalId : GoalId) : m Proof := do
    let some proof ← goalId.getAssignment? | return .goal goalId
    let proof ← proof.instantiateVars
    goalId.assign proof
    return proof
end

mutual
  partial def Proof.instantiateVars! (proof : Proof) : m Proof := do
    match proof with
    | .goal goalId => goalId.getInstantiatedAssignment!
    | .node name vars proofs =>
      let vars   ← vars.mapM (·.instantiateMVars)
      let proofs ← proofs.mapM (·.instantiateVars!)
      return .node name vars proofs

  partial def GoalId.getInstantiatedAssignment! (goalId : GoalId) : m Proof := do
    let some proof ← goalId.getAssignment? | throw "proof contains an uninstantiated hole"
    let proof ← proof.instantiateVars!
    goalId.assign proof
    return proof
end

def AbstractedProof.instantiateFresh [MonadUnique m] (proof : AbstractedProof) : m (Array Proof × Array Expr × Proof) := do
  let mvars ← proof.varNames.mapM mkFreshMVar
  let goalIds ← proof.goals.mapM fun c => mkFreshGoalVar (c.instantiate mvars)
  return (goalIds, mvars, proof.instantiate mvars goalIds)



/-! Abstracting a Proof -/

structure MkAbstractedProofState where
  exprState : AbstractGadgetState := {}
  goals     : Array AbstractedCell := #[]
  map       : Std.HashMap GoalId AbstractedProofTerm := {}

def abstractProof (proof : Proof) : ReaderT (MVarContext × GoalContext) (EStateM String MkAbstractedProofState) AbstractedProofTerm := do
  match proof with
  | .goal goalId =>
    let s ← get
    match s.map[goalId]? with
    | some proof => pure proof
    | none =>
      let some decl := (← read).2.decls[goalId] | throw s!"unkown goal variable {goalId.id}"
      let goal := (← read).2.decls[goalId].get!.goal
      match abstractCell' goal |>.run (← read).1 |>.run (← get).exprState with
      | .error e _ => throw e
      | .ok goal exprState =>
        let proof := .goal s.map.size
        set { s with exprState, goals := s.goals.push goal, map := s.map.insert goalId proof }
        pure proof
  | .node name vars proofs =>
    let proofs ← proofs.attach.mapM fun ⟨proof, _⟩ => abstractProof proof
    match vars.mapM abstractExpr' |>.run (← read).1 |>.run (← get).exprState with
    | .error e _ => throw e
    | .ok vars exprState =>
      modify ({ · with exprState })
      return .node name vars proofs

def Proof.abstract (proof : Proof) : m AbstractedProof := do
  match (abstractProof proof).run (← getMCtx, ← getGCtx) |>.run {} with
  | .error e _  => throw e
  | .ok proof s =>
    return { proof, varNames := s.exprState.names, goals := s.goals }



variable [MonadEnv m]

/-- Infers the conclusion `Cell` of a proof -/
def Proof.inferType (proof : Proof) : m Cell := do
  match proof with
  | .node name vars _ =>
    return (← name.getConstInfo).gadget.conclusion.instantiate vars
  | .goal goalId =>
    return ← goalId.getGoal!


/-- Prints the goal `Cell` of a `goalId. -/
def GoalId.toString (goalId : GoalId) : m String := do
  (← goalId.getInstantiatedGoal).toString


/-! Creating a `GadgetGame.ProofTree` from a `GoalId` or a `Name`. -/

mutual
  private partial def AbstractedProofTerm.instantiateProofTree
      (proof : AbstractedProofTerm) (subst : Array GadgetGame.ProofTree) : m GadgetGame.ProofTree := do
    match proof with
    | .goal i             => return subst[i]!
    | .node name _ proofs =>
      let proofs ← proofs.mapM fun x => x.instantiateProofTree subst
      unfold name proofs

  private partial def unfold (name : Name) (proofs : Array GadgetGame.ProofTree) : m GadgetGame.ProofTree := do
    match (← name.getConstInfo).definition with
    | .inl ax =>
      return .node ax proofs.toList
    | .inr proof =>
      proof.proof.instantiateProofTree proofs
end

def Name.toProofTree (name : Name) : m GadgetGame.ProofTree :=
  unfold name #[]

mutual
  partial def ProofToProofTree (proof : Proof) : m GadgetGame.ProofTree := do
    match proof with
    | .node name _ proofs =>
      let proofs ← proofs.mapM ProofToProofTree
      unfold name proofs
    | .goal goalId =>
      goalId.toProofTree

  partial def GoalId.toProofTree (goalId : GoalId) : m GadgetGame.ProofTree := do
    match ← goalId.getAssignment? with
    | some proof => ProofToProofTree proof
    | none       => return .goal (← goalId.getGoal!).toTerm
end
