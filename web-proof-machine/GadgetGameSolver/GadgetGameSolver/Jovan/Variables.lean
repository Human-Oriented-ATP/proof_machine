import GadgetGameSolver.Jovan.Proof

namespace JovanGadgetGame

variable {m : Type → Type} [Monad m]

/-! Unique numbers -/

class MonadUnique (m : Type → Type) where
  getUnique : m Nat

export MonadUnique (getUnique)

instance (m n) [MonadLift m n] [MonadUnique m] : MonadUnique n where
  getUnique      := liftM (getUnique : m _)

/-! Proof constants -/

structure ConstantInfo where
  name       : Name
  gadget     : AbstractedGadget
  definition : GadgetGame.Axiom ⊕ AbstractedProof
  deriving Inhabited

structure Environment where
  proofs : Std.HashMap Name ConstantInfo := {}

class MonadEnv (m : Type → Type) where
  getEnv : m Environment
  modifyEnv : (Environment → Environment) → m Unit

export MonadEnv (getEnv modifyEnv)

instance (m n) [MonadLift m n] [MonadEnv m] : MonadEnv n where
  getEnv      := liftM (getEnv : m _)
  modifyEnv f := liftM (modifyEnv f : m _)

def Name.getConstInfo [MonadEnv m] (name : Name) : m ConstantInfo := do
  return (← getEnv).proofs[name]!

def ConstantInfo.addToEnv [MonadEnv m] (cInfo : ConstantInfo) : m Unit := do
  modifyEnv fun env => { proofs := env.proofs.insert cInfo.name cInfo }

def _root_.GadgetGame.Axiom.addFreshConstantInfo [MonadUnique m] [MonadEnv m] (ax : GadgetGame.Axiom) : m ConstantInfo := do
  let cInfo := {
    name.name  := ← getUnique
    gadget     := ax.abstract
    definition := .inl ax }
  cInfo.addToEnv
  return cInfo

/-! Expr metavariables -/

section MVarContext

structure MVarDecl where
  userName : String
  deriving Inhabited

structure MVarContext where
  decls       : Std.HashMap MVarId MVarDecl := {}
  assignments : Std.HashMap MVarId Expr := {}
  deriving Inhabited

class MonadMCtx (m : Type → Type) where
  getMCtx    : m MVarContext
  modifyMCtx : (MVarContext → MVarContext) → m Unit

export MonadMCtx (getMCtx modifyMCtx)

@[always_inline]
instance (m n) [MonadLift m n] [MonadMCtx m] : MonadMCtx n where
  getMCtx      := liftM (getMCtx : m _)
  modifyMCtx f := liftM (modifyMCtx f : m _)

variable [MonadMCtx m]

@[inline] def setMCtx (mctx : MVarContext) : m Unit :=
  modifyMCtx (fun _ => mctx)

/-- Doesn't use `try _ finally _ => _`, since we're not catching any errors. -/
@[inline] def withMCtx {α : Type} (mctx : MVarContext) (k : m α) : m α := do
  let mctx' ← getMCtx
  setMCtx mctx
  let a ← k
  setMCtx mctx'
  pure a

def mkFreshMVar [MonadUnique m] (userName : String) : m Expr := do
  let mvarId := { id := ← getUnique }
  modifyMCtx fun mctx => { mctx with decls := mctx.decls.insert mvarId { userName } }
  return .mvar mvarId

def MVarId.assign (mvarId : MVarId) (e : Expr) : m Unit :=
  modifyMCtx fun mctx => { mctx with assignments := mctx.assignments.insert mvarId e }

def MVarId.getDecl! (mvarId : MVarId) : m MVarDecl := do
  return (← getMCtx).decls[mvarId]!

def MVarId.getAssignment? (mvarId : MVarId) : m (Option Expr) := do
  return (← getMCtx).assignments[mvarId]?

partial def Expr.instantiateMVars (e : Expr) : m Expr := do
  match e with
  | .mvar mvarId =>
    match ← mvarId.getAssignment? with
    | none   => return e
    | some e =>
      let e ← e.instantiateMVars
      mvarId.assign e
      return e
  | .app f args =>
    let args ← args.mapM (·.instantiateMVars)
    return .app f args

def Cell.instantiateMVars (c : Cell) : m Cell := do
  return {
    f := c.f
    args := ← c.args.mapM (·.instantiateMVars)
  }

def AbstractedGadget.instantiateFresh [MonadUnique m] (gadget : AbstractedGadget) : m (Array Expr × Gadget) := do
  let mvars ← gadget.varNames.mapM mkFreshMVar
  return (mvars, {
    conclusion := gadget.conclusion.instantiate mvars
    hypotheses := gadget.hypotheses.map (·.instantiate mvars) })


end MVarContext

/-! Proof metavariables -/
section ProofContext

structure GoalDecl where
  goal     : Cell
  deriving Inhabited

structure GoalContext where
  decls       : Std.HashMap GoalId GoalDecl := {}
  assignments : Std.HashMap GoalId Proof := {}
  deriving Inhabited

class MonadGCtx (m : Type → Type) where
  getGCtx    : m GoalContext
  modifyGCtx : (GoalContext → GoalContext) → m Unit

export MonadGCtx (getGCtx modifyGCtx)

@[always_inline]
instance (m n) [MonadLift m n] [MonadGCtx m] : MonadGCtx n where
  getGCtx      := liftM (getGCtx : m _)
  modifyGCtx f := liftM (modifyGCtx f : m _)

variable [MonadGCtx m]

abbrev setGCtx (goalCtx : GoalContext) : m Unit :=
  modifyGCtx (fun _ => goalCtx)

def mkFreshGoalVar [MonadUnique m] (goal : Cell) : m Proof := do
  let goalId := { id := ← getUnique }
  modifyGCtx fun gctx => { gctx with decls := gctx.decls.insert goalId { goal } }
  return .goal goalId

def GoalId.assign (goalId : GoalId) (proof : Proof) : m Unit :=
  modifyGCtx fun gctx => { gctx with assignments := gctx.assignments.insert goalId proof }

def GoalId.getGoal! (goalId : GoalId) : m Cell := do
  return (← getGCtx).decls[goalId]!.goal

def GoalId.getAssignment? (goalId : GoalId) : m (Option Proof) := do
  return (← getGCtx).assignments[goalId]?

variable [MonadMCtx m] [MonadExceptOf String m]

def GoalId.getInstantiatedGoal (goalId : GoalId) : m Cell := do
  (← goalId.getGoal!).instantiateMVars

mutual
  partial def Proof.instantiate (proof : Proof) : m Proof := do
    match proof with
    | .goal goalId => goalId.getInstantiatedAssignment
    | .node name vars proofs =>
      let vars   ← vars.mapM (·.instantiateMVars)
      let proofs ← proofs.mapM (·.instantiate)
      return .node name vars proofs

  partial def GoalId.getInstantiatedAssignment (goalId : GoalId) : m Proof := do
    let some proof ← goalId.getAssignment? | return .goal goalId
    let proof ← proof.instantiate
    goalId.assign proof
    return proof
end

mutual
  partial def Proof.instantiate! (proof : Proof) : m Proof := do
    match proof with
    | .goal goalId => goalId.getInstantiatedAssignment!
    | .node name vars proofs =>
      let vars   ← vars.mapM (·.instantiateMVars)
      let proofs ← proofs.mapM (·.instantiate!)
      return .node name vars proofs

  partial def GoalId.getInstantiatedAssignment! (goalId : GoalId) : m Proof := do
    let some proof ← goalId.getAssignment? | throw "proof contains an uninstantiated hole"
    let proof ← proof.instantiate!
    goalId.assign proof
    return proof
end

def AbstractedProof.instantiateFresh [MonadUnique m] (proof : AbstractedProof) : m (Array Proof × Array Expr × Proof) := do
  let mvars ← proof.varNames.mapM mkFreshMVar
  let goalIds ← proof.goals.mapM fun c => mkFreshGoalVar (c.instantiate mvars)
  return (goalIds, mvars, proof.instantiate mvars goalIds)




/-! Abstracting Gadgets and Proofs -/

structure AbstractGadgetState where
  names : Array String := #[]
  map   : Std.HashMap MVarId AbstractedExpr := {}

def abstractExpr' (e : Expr) : ReaderT MVarContext (StateM AbstractGadgetState) AbstractedExpr := do
  match e with
  | .mvar mvarId =>
    let s ← get
    match s.map[mvarId]? with
    | some e => pure e
    | none =>
      let e := .mvar s.map.size
      let name := (← read).decls[mvarId]!.userName
      set { s with names := s.names.push name, map := s.map.insert mvarId e }
      pure e
  | .app f args =>
    let args ← args.attach.mapM fun ⟨x, _⟩ => abstractExpr' x
    return .app f args

def abstractCell' (c : Cell) : ReaderT MVarContext (StateM AbstractGadgetState) AbstractedCell :=
  return {
    f    := c.f
    args := ← c.args.mapM abstractExpr' }

def Gadget.abstract (gadget : Gadget) : m AbstractedGadget := do
  let go : ReaderT MVarContext (StateM AbstractGadgetState) AbstractedGadget := do
    return {
      conclusion := ← abstractCell' gadget.conclusion
      hypotheses := ← gadget.hypotheses.mapM abstractCell'
      varNames   := (← get).names }
  return go.run (← getMCtx) |>.run' {}


structure MkAbstractedProofState where
  exprState : AbstractGadgetState := {}
  goals     : Array AbstractedCell := #[]
  map       : Std.HashMap GoalId AbstractedProofTerm := {}

def abstractProof (proof : Proof) : ReaderT (MVarContext × GoalContext) (StateM MkAbstractedProofState) AbstractedProofTerm := do
  match proof with
  | .goal goalId =>
    let s ← get
    match s.map[goalId]? with
    | some proof => pure proof
    | none =>
      let goal := (← read).2.decls[goalId]!.goal
      let (goal, exprState) := abstractCell' goal |>.run (← read).1 |>.run (← get).exprState
      let proof := .goal s.map.size
      set { s with exprState, goals := s.goals.push goal, map := s.map.insert goalId proof }
      pure proof
  | .node name vars proofs =>
    let proofs ← proofs.attach.mapM fun ⟨proof, _⟩ => abstractProof proof
    let (vars, exprState) := vars.mapM abstractExpr' |>.run (← read).1 |>.run (← get).exprState
    modify ({ · with exprState })
    return .node name vars proofs

def Proof.abstract (proof : Proof) : m AbstractedProof := do
  let (proof, s) := (abstractProof proof).run (← getMCtx, ← getGCtx) |>.run {}
  return { proof, varNames := s.exprState.names, goals := s.goals }


end ProofContext



variable [MonadEnv m] [MonadMCtx m] [MonadGCtx m] [MonadExceptOf String m]

/-! Type inference -/

def Proof.inferType (proof : Proof) : m Cell := do
  match proof with
  | .node name vars _ =>
    return (← name.getConstInfo).gadget.conclusion.instantiate vars
  | .goal goalId =>
    return ← goalId.getGoal!


/-! Printing gadgets -/

def Expr.toString (e : Expr) : m String :=
  match e with
  | .mvar mvarId => return (← mvarId.getDecl!).userName
  | .app f #[]   => return f
  | .app f args  => do
    let args ← args.attach.mapM (fun ⟨x,_⟩ => x.toString)
    return s!"{f}({", ".intercalate args.toList})"

def Cell.toString (c : Cell) : m String := do
  if c.args.isEmpty then
    return c.f
  else
    let args ← c.args.mapM (·.toString)
    return s!"{c.f}({", ".intercalate args.toList})"

def Gadget.toString (gadget : Gadget) : m String := do
  if gadget.hypotheses.isEmpty then
    gadget.conclusion.toString
  else
    return s!"{← gadget.conclusion.toString} :- {", ".intercalate (← gadget.hypotheses.toList.mapM Cell.toString)}."


def GoalId.toString (goalId : GoalId) : m String := do
  (← goalId.getInstantiatedGoal).toString

def AbstractedExpr.toString (e : AbstractedExpr) : String :=
  match e with
  | .mvar i =>  s!"#{i}"
  | .app f #[]   => f
  | .app f args  =>
    let args := args.attach.map (fun ⟨x,_⟩ => x.toString)
    s!"{f}({", ".intercalate args.toList})"

def AbstractedCell.toString (c : AbstractedCell) : String :=
  if c.args.isEmpty then
    c.f
  else
    let args := c.args.toList.map (·.toString)
    s!"{c.f}({", ".intercalate args})"

instance : ToString AbstractedCell := ⟨AbstractedCell.toString⟩

instance : ToString CellKey where
  toString k := toString k.cell

/-! Creating a `GadgetGame.ProofTree` from a `GoalId` or a `Name` -/

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
