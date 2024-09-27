import GadgetGameSolver.Jovan.Variables

namespace JovanGadgetGame

variable {m : Type → Type} [Monad m] [MonadMCtx m]

def Expr.containsMVar? (mvarId : MVarId) : Expr → Bool
  | .mvar mvarId' => mvarId' == mvarId
  | .app _ args => args.attach.any <| fun ⟨arg, _⟩ => containsMVar? mvarId arg

def assignUnassigned? (mvarId : MVarId) (t : Expr) : m Bool := do
  let t ← t.instantiateMVars
  if t == .mvar mvarId then
    return true -- no need to assign
  if t.containsMVar? mvarId then
    return false -- occurs check failed
  mvarId.assign t
  return true

mutual
  partial def unifyCore (s t : Expr) : m Bool := do
    match s, t with
    | .mvar mvarId, t =>
      match ← mvarId.getAssignment? with
      | some s => unifyCore s t
      | none => assignUnassigned? mvarId t
    | s, .mvar mvarId =>
      match ← mvarId.getAssignment? with
      | some t => unifyCore s t
      | none => assignUnassigned? mvarId s
    | .app f args, .app f' args' =>
      unifyApp f f' args args'

  @[inline]
  partial def unifyApp (f f' : String) (args args' : Array Expr) : m Bool := do
    if h : f = f' ∧ args.size = args'.size then
      let rec go (i : Nat) (h : i ≤ args.size := by omega) := do
        if h : i = args.size then
          return true
        else
          if ← unifyCore args[i] args'[i] then
            go (i + 1)
          else
            return false
      go 0
    else
      return false
end

def unify (s t : Cell) : m Bool := do
  let mctx ← getMCtx
  if ← unifyApp s.f t.f s.args t.args then
    return true
  else
    setMCtx mctx
    return false

variable [MonadGCtx m] [MonadEnv m] [MonadExceptOf String m]

partial def checkProof (proof : Proof) : m Cell := do
  match proof with
  | .goal goalId => goalId.getGoal!
  | .node name vars proofs =>
    let gadget := (← name.getConstInfo).gadget
    if vars.size != gadget.varNames.size then
      throw "incorrect number of variables in proof node"
    if proofs.size != gadget.hypotheses.size then
      throw "incorrect number of proofs in proof node"
    proofs.size.forM fun i => do
      let hypType := gadget.hypotheses[i]!.instantiate vars
      let proofType ← checkProof proofs[i]!
      unless ← unify proofType hypType do
        throw s!"mismatch: a proof of {← proofType.toString} is applied to subgoal {← hypType.toString}"
    return gadget.conclusion.instantiate vars

partial def Proof.check (proof : Proof) : m Unit :=
  discard <| checkProof proof
