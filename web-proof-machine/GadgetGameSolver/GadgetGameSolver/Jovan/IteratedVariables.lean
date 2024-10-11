import GadgetGameSolver.Jovan.TermVariables

/-! Iterating variables -/

namespace JovanGadgetGame.Iterate

structure IMVarId where
  id : Nat
deriving Inhabited, BEq

instance : Hashable IMVarId where
  hash mvarId := hash mvarId.id

inductive Expr where
| mvar  : MVarId → Expr
| imvar : IMVarId → Int → Expr -- iterated metavariable
| app   : String → Array Expr → Expr
deriving Inhabited, BEq

structure Cell where
  f    : String
  args : Array Expr
  deriving Inhabited

end Iterate

def Expr.toIteratedExpr (e : Expr) : Iterate.Expr :=
  match e with
  | .mvar mvarId => .mvar mvarId
  | .app f args => .app f (args.attach.map fun ⟨arg, _⟩ => arg.toIteratedExpr)

def Cell.toIteratedCell (c : Cell) : Iterate.Cell :=
  { c with args := c.args.map (·.toIteratedExpr) }
namespace Iterate

def Expr.decrementAux (e : Expr) (dec : Int) : Expr :=
  match e with
  | .imvar mvarId n => .imvar mvarId (n - dec)
  | .app f args => .app f (args.attach.map fun ⟨arg, _⟩ => arg.decrementAux dec)
  | e => e

def Expr.decrement (e : Expr) (dec : Int) : Expr :=
  if dec == 0 then
    e
  else
    e.decrementAux dec

end Iterate

def AbstractedExpr.instantiateIterate (e : AbstractedExpr) (subst : Array Iterate.Expr) : Iterate.Expr :=
  match e with
  | .mvar i => subst[i]!
  | .app f args => .app f <| args.attach.map fun ⟨arg, _⟩ => arg.instantiateIterate subst

def AbstractedCell.instantiateIterate (c : AbstractedCell) (subst : Array Iterate.Expr) : Iterate.Cell where
  f := c.f
  args := c.args.map (·.instantiateIterate subst)

namespace Iterate

structure MVarDecl where
  pointAssignments : Lean.AssocList Int Expr
  userName         : String
  deriving Inhabited

inductive AssignmentKind where
| noLoop : AssignmentKind
| loop   : (up? root : Bool) → AssignmentKind
deriving Inhabited

@[inline]
def AssignmentKind.isLoop : AssignmentKind → Bool
| .noLoop   => false
| .loop _ _ => true

@[inline]
def AssignmentKind.and (k k' : AssignmentKind) : Option AssignmentKind :=
  match k, k' with
  | .noLoop    , .noLoop      => some (.noLoop)
  | .noLoop    , k
  | k          , .noLoop      => k
  | .loop up? _, .loop up?' _ =>
    if up? == up?' then k else none

@[inline]
def AssignmentKind.modify (k : AssignmentKind) (up? root : Bool) : Option AssignmentKind :=
  match k with
  | .noLoop => some (.loop up? root)
  | .loop up?' _ => if up? == up?' then k else none

/-- Structure for doing multiple `AssignmentKind.modify` operations at once. -/
structure AssignmentKindModifier where
  up   : Bool := false
  down : Bool := false

@[inline]
def AssignmentKindModifier.insert (m : AssignmentKindModifier) (up? : Bool) : AssignmentKindModifier :=
  if up? then
    { m with up := true }
  else
    { m with down := true}

@[inline]
def AssignmentKindModifier.apply (m : AssignmentKindModifier) (up? isRoot : Bool) : Option AssignmentKind :=
    if up? then
      if m.down then none else some (.loop up? isRoot)
    else
      if m.up   then none else some (.loop up? isRoot)

/-- Represents an assignment `aₙ₊ᵢ := value₊ᵢ` for all `i ∈ ℕ`. -/
structure IMVarAssignment where
  n     : Int
  value : Expr
  kind  : AssignmentKind
  deriving Inhabited

/-- Represents an assignment `mvarIdᵢ₊ₙ := value` for all `i ∈ ℕ`. -/
structure PendingAssignment where
  mvarId : IMVarId
  n      : Int
  value  : Expr
  deriving Inhabited

structure MVarContext where
  decls        : Std.HashMap IMVarId MVarDecl        := {}
  iassignments : Std.HashMap IMVarId IMVarAssignment := {}
  assignments  : Std.HashMap MVarId Expr             := {}
  /-- `pending` contains unhandled assignments of loopy metavariables.
  It should be empty at the start and end of unification. -/
  pending      : Array PendingAssignment             := #[]
  deriving Inhabited

class MonadMCtx (m : Type → Type) where
  getMCtx    : m MVarContext
  modifyMCtx : (MVarContext → MVarContext) → m Unit

export MonadMCtx (getMCtx modifyMCtx)

instance (m) [MonadStateOf MVarContext m] : MonadMCtx m where
  getMCtx    := get
  modifyMCtx := modify

@[always_inline]
instance (m n) [MonadLift m n] [MonadMCtx m] : MonadMCtx n where
  getMCtx      := liftM (getMCtx : m _)
  modifyMCtx f := liftM (modifyMCtx f : m _)

variable {m : Type → Type} [Monad m] [MonadMCtx m] [MonadUnique m]

@[inline] def setMCtx (mctx : MVarContext) : m Unit :=
  modifyMCtx (fun _ => mctx)

def mkFreshMVar (n : Nat) (userName : String) : m Expr := do
  let mvarId := { id := ← getUnique }
  modifyMCtx fun mctx => { mctx with decls := mctx.decls.insert mvarId { userName, pointAssignments := {} } }
  return .imvar mvarId n

def IMVarId.getDecl! (mvarId : IMVarId) : m MVarDecl := do
  return (← getMCtx).decls[mvarId]!

@[inline]
def IMVarId.getPointAssignments! (mvarId : IMVarId) : m (Lean.AssocList Int Expr) := do
  return (← mvarId.getDecl!).pointAssignments

def IMVarId.getPointAssignment? (mvarId : IMVarId) (n : Int) : m (Option Expr) := do
  return (← mvarId.getPointAssignments!).find? n

def IMVarId.assignPoint (mvarId : IMVarId) (n : Int) (value : Expr) : m Unit := do
  let decl ← mvarId.getDecl!
  let decl := { decl with pointAssignments := decl.pointAssignments.insert n value }
  modifyMCtx fun mctx => { mctx with decls := mctx.decls.insert mvarId decl}

def IMVarId.assign (mvarId : IMVarId) (n : Int) (value : Expr) (kind : AssignmentKind) : m Unit :=
  modifyMCtx fun mctx => { mctx with iassignments := mctx.iassignments.insert mvarId { n, value, kind } }

def IMVarId.getAssignment? (mvarId : IMVarId) : m (Option IMVarAssignment) := do
  return (← getMCtx).iassignments[mvarId]?

def assignMVarId (mvarId : MVarId) (value : Expr) : m Unit :=
  modifyMCtx fun mctx => { mctx with assignments := mctx.assignments.insert mvarId value }

def getMVarIdAssignment? (mvarId : MVarId) : m (Option Expr) := do
  return (← getMCtx).assignments[mvarId]?


@[inline]
def pushPendingOrdered (mvarId : IMVarId) (n : Int) (value : Expr) : m Unit :=
  modifyMCtx fun mctx => { mctx with pending := mctx.pending.push { mvarId, n, value } }

@[inline]
def pushPending (mvarId : IMVarId) (n : Int) (value : Expr) : m Expr := do
  let jp := pushPendingOrdered mvarId n value *> return .imvar mvarId n
  if let .imvar mvarId' n' := value then
    match compare n' n with
    | .lt => jp
    | .eq => if mvarId' == mvarId then return value else jp
    | .gt =>
      pushPendingOrdered mvarId' n' (.imvar mvarId n)
      return value
  else
    jp

/-! Printing -/

def subscriptString (n : Int) : String := s!"{if n < 0 then "₋" else ""}{n.natAbs.toSubscriptString}"

def Expr.toString [JovanGadgetGame.MonadMCtx m] (e : Expr) : m String :=
  match e with
  | .imvar mvarId n => return s!"{(← mvarId.getDecl!).userName}{subscriptString n}"
  | .mvar mvarId    => return (← mvarId.getDecl!).userName
  | .app f #[]      => return f
  | .app f args     => do
    let args ← args.attach.mapM (fun ⟨x,_⟩ => x.toString)
    return s!"{f}({", ".intercalate args.toList})"

def Cell.toString [JovanGadgetGame.MonadMCtx m] (c : Cell) : m String := do
  if c.args.isEmpty then
    return c.f
  else
    let args ← c.args.mapM (·.toString)
    return s!"{c.f}({", ".intercalate args.toList})"

def contextString [JovanGadgetGame.MonadMCtx m] : m String := do
  let mctx ← getMCtx
  let assignments ← mctx.iassignments.toList.mapM fun (mvarId, { n, value, .. }) => do
    return s!"{(← mvarId.getDecl!).userName}{subscriptString n} := {← value.toString}"
  let assignments' ← mctx.decls.toArray.concatMapM fun (_, { userName, pointAssignments}) =>
    pointAssignments.toList.toArray.mapM fun (n, value) => do
      return s!"{userName}{subscriptString n} := {← value.toString}"
  let assignments'' ← mctx.assignments.toList.mapM fun (mvarId, value) => do
    return s!"{(← mvarId.getDecl!).userName} := {← value.toString}"

  return s!"full assignments: {assignments}\npoint assignments: {assignments'}\nregular assignments: {assignments''}"


-- /-! Collecting uninstantiated metavariables -/

-- structure CollectIMVarsState where
--   result : Std.HashSet IMVarId := {}

-- partial def Expr.collectIMVars (e : Expr) (s : CollectIMVarsState) : ReaderT (List IMVarId) m CollectIMVarsState := do
--   match e with
--   | .imvar mvarId n =>
--     match ← mvarId.getPointAssignment? n with
--     | some value => value.collectIMVars s
--     | none =>
--       match ← mvarId.getAssignment? with
--       | some { value, kind, .. } =>
--         if kind.isLoop then
--           if (← read).contains mvarId then
--             return s
--           else
--             withReader (mvarId :: ·) do
--               value.collectIMVars s
--         else
--           value.collectIMVars s
--       | none =>
--         return { s with result := s.result.insert mvarId }
--   | .mvar mvarId =>
--     match ← getMVarIdAssignment? mvarId with
--     | some value => value.collectIMVars s
--     | none => return s
--   | .app _ args => args.attach.foldlM (fun s ⟨e, _⟩ => e.collectIMVars s) s

-- def Cell.collectIMVars (c : Cell) (s : CollectIMVarsState) : m CollectIMVarsState :=
--   ReaderT.run (c.args.foldlM (init := s) fun s e => e.collectIMVars s) {}

partial def Expr.instantiateMVarsAux (e : Expr) : ReaderT (List IMVarId) (ExceptT IMVarId m) Expr := do
  match e with
  | .imvar mvarId n =>
    match ← mvarId.getAssignment? with
    | some { value, kind, n := n' } =>
      if n < n' then
        return e
      else
        let value := value.decrement (n' - n)
        if kind.isLoop then
          if (← read).contains mvarId then
            throw mvarId
          else
            try
              withReader (mvarId :: ·) value.instantiateMVarsAux
            catch mvarId' =>
              if mvarId == mvarId' then
                return e
              else
                throw mvarId'
        else
          value.instantiateMVarsAux
    | none =>
        return e
  | .mvar mvarId =>
    match ← getMVarIdAssignment? mvarId with
    | some value => value.instantiateMVarsAux
    | none => return e
  | .app f args =>
      .app f <$> args.mapM (·.instantiateMVarsAux)

def Expr.instantiateMVars (e : Expr) : m Expr := do
  let .ok e ← (e.instantiateMVarsAux.run {}).run | unreachable!
  return e

def Cell.instantiateMVars (c : Cell) : m Cell := do
  let args ← c.args.mapM (·.instantiateMVars)
  return { c with args}
