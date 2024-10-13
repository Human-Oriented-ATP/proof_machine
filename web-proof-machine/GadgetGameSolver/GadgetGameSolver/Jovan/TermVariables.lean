import GadgetGameSolver.Jovan.Term

namespace JovanGadgetGame

variable {m : Type → Type} [Monad m]

/-! Unique numbers -/

class MonadUnique (m : Type → Type) where
  getUnique : m Nat

export MonadUnique (getUnique)

instance (m n) [MonadLift m n] [MonadUnique m] : MonadUnique n where
  getUnique := liftM (getUnique : m _)

/-! Expr metavariables -/

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

variable [MonadMCtx m] [MonadExceptOf String m]

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
  match (← getMCtx).decls[mvarId]? with
  | some decl => return decl
  | none      => throw s!"unknown metavariable {mvarId.id}"

def MVarId.getAssignment? (mvarId : MVarId) : m (Option Expr) := do
  return (← getMCtx).assignments[mvarId]?

partial def MVarId.isHeadAssigned? (mvarId : MVarId) : m Bool := do
  match ← mvarId.getAssignment? with
  | some (.mvar mvarId) => mvarId.isHeadAssigned?
  | some (.app ..) => return true
  | none => return false

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




/-! Abstracting Gadgets -/

structure AbstractGadgetState where
  names : Array String := #[]
  map   : Std.HashMap MVarId AbstractedExpr := {}

def abstractExpr' (e : Expr) : ReaderT MVarContext (EStateM String AbstractGadgetState) AbstractedExpr := do
  match e with
  | .mvar mvarId =>
    let s ← get
    match s.map[mvarId]? with
    | some e => pure e
    | none =>
      let e := .mvar s.map.size
      let some decl := (← read).decls[mvarId]? | throw s!"unknown metavariable {mvarId.id}"
      set { s with names := s.names.push decl.userName, map := s.map.insert mvarId e }
      pure e
  | .app f args =>
    let args ← args.attach.mapM fun ⟨x, _⟩ => abstractExpr' x
    return .app f args

def abstractCell' (c : Cell) : ReaderT MVarContext (EStateM String AbstractGadgetState) AbstractedCell :=
  return {
    f    := c.f
    args := ← c.args.mapM abstractExpr' }

def Gadget.abstract (gadget : Gadget) : m AbstractedGadget := do
  let go : ReaderT MVarContext (EStateM String AbstractGadgetState) AbstractedGadget := do
    return {
      conclusion := ← abstractCell' gadget.conclusion
      hypotheses := ← gadget.hypotheses.mapM abstractCell'
      varNames   := (← get).names }
  match go.run (← getMCtx) |>.run {} with
  | .ok a _    => return a
  | .error e _ => throw e



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
    return s!"{← gadget.conclusion.toString}."
  else
    return s!"{← gadget.conclusion.toString} :- {", ".intercalate (← gadget.hypotheses.toList.mapM Cell.toString)}."


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
  toString k := toString k.toAbstractedCell

def AbstractedGadget.toString (g : AbstractedGadget) : String :=
  if g.hypotheses.isEmpty then
    s!"{g.conclusion}."
  else
    let hypotheses := g.hypotheses.toList.map (·.toString)
    s!"{g.conclusion} :- {", ".intercalate hypotheses}"
