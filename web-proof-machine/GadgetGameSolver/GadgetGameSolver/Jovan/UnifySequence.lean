import GadgetGameSolver.Jovan.Variables
import GadgetGameSolver.Jovan.Util

namespace JovanGadgetGame

namespace Iterate

structure MVarId where
  id : Nat
deriving Inhabited, BEq

instance : Hashable MVarId where
  hash mvarId := hash mvarId.id

inductive Expr where
| mvar : JovanGadgetGame.MVarId → Expr
| imvar : MVarId → Int → Expr
| app  : String → Array Expr → Expr
deriving Inhabited, BEq

structure Cell where
  f    : String
  args : Array Expr
  deriving Inhabited

def Expr.offsetByAux (e : Expr) (offset : Int) : Expr :=
  match e with
  | .imvar mvarId n => .imvar mvarId (n + offset)
  | .app f args => .app f (args.attach.map fun ⟨arg, _⟩ => arg.offsetByAux offset)
  | e => e

def Expr.offsetBy (e : Expr) (offset : Int) : Expr :=
  if offset == 0 then
    e
  else
    e.offsetByAux offset

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
  userName : String
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
  | .noLoop   , .noLoop    => some (.noLoop)
  | .noLoop   , .loop up? _
  | .loop up? _, .noLoop    => some (.loop up? false)
  | .loop up? _, .loop up?' _ =>
    if up? == up?' then some (.loop up? false) else none

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
structure MVarAssignment where
  n       : Int
  value   : Expr
  kind    : AssignmentKind
  deriving Inhabited

/-- Represents an assignment `mvarIdᵢ₊ₙ := value` for all `i ∈ ℕ`. -/
structure PendingAssignment where
  mvarId : MVarId
  n      : Int
  value  : Expr
  deriving Inhabited

structure MVarContext where
  decls       : Std.HashMap MVarId MVarDecl       := {}
  assignments : Std.HashMap MVarId MVarAssignment := {}
  /-- `pending` contains unhandled assignments of loopy metavariables.
  It should be empty at the start and end of unification. -/
  pending     : Array PendingAssignment           := #[]
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

section

variable {m : Type → Type} [Monad m] [MonadMCtx m] [MonadUnique m]

@[inline] def setMCtx (mctx : MVarContext) : m Unit :=
  modifyMCtx (fun _ => mctx)

def mkFreshMVar (userName : String) : m Expr := do
  let mvarId := { id := ← getUnique }
  modifyMCtx fun mctx => { mctx with decls := mctx.decls.insert mvarId { userName } }
  return .imvar mvarId 0

def MVarId.getDecl! (mvarId : MVarId) : m MVarDecl := do
  return (← getMCtx).decls[mvarId]!

def MVarId.assign (mvarId : MVarId) (n : Int) (value : Expr) (kind : AssignmentKind) : m Unit :=
  modifyMCtx fun mctx => { mctx with assignments := mctx.assignments.insert mvarId { n, value, kind } }

def MVarId.getAssignment? (mvarId : MVarId) : m (Option MVarAssignment) := do
  return (← getMCtx).assignments[mvarId]?

@[inline]
def pushPending (mvarId : MVarId) (n : Int) (value : Expr) : m Unit :=
  modifyMCtx fun mctx => { mctx with pending := mctx.pending.push { mvarId, n, value } }

end


/-!


* a₀ := f b₀
* a₀ := f f a₁ =>
  - merge `f b₀` and `f f a₁`
  - a₀ := b₀
  - b₀ := f a₁ (loop)

In this example, the occurs check for `b₀` would ideally already know that `a₀ := b₀`.
So, when assigning unassigned metavariables, we should delay this at all times.

----

To know the exact goals that come out of the unification sequence, we have to keep track of
the boundary conditions on both end of the finite unification sequence.

We can either do it the lazy way which is to take the smallest possible interval,
or the hard way, which is to keep track of unions of intervals.

Either way, we need a data structure called `Support`, which has a union and intersection operation.

Then every variable assignment must have a `Support`, and the unification as a whole must have a `Support`.


Let's try to see how to work with `Support`.

A₁ =?= f (f A₀) (we can shift the indices freely in order to put store assignments at the 0-index)
  assign A₀ := f (f A₋₁) `has to hold from n+1, where n is the first value at which unification succeeds`
B₁ =?= f (f B₀)
  assign B₀ := f (f B₋₁) `has to hold from n+1`
A₁ =?= f B₀
  try to assign A₀ := f B₋₁, `has to hold from n+1`
  merge assignments f B₋₁ and f (f A₋₁) of A₀
    in this merge, we don't instantiate B₋₁ because it has a loopy assignment
  result of merge: f B₋₁, under condition that B₀ := f A₀
    assign A₀ := f B₋₁ `Has to hold from n+1`
    try to assign B₀ := f A₀ `Has to hold from n`
    merge assignments f A₀ and f (f B₋₁) of B₀
      in this merge, we don't instantiate A₀ because it has a loopy assignment
    result of merge: f A₀, under condition that A₀ := f B₋₁
      assign B₀ := f A₀ `Has to hold from n`
      try to assign A₀ := f B₋₁ `Has to hold from n+1`
      this assignment agrees with the assignment of A₀ that we have.

In this example, we see that the unification simply works from the start (n = 0)
We note that during merging, the merged result has to hold on the union,
whereas the induced assignments have to hold on the intersection.
  FALSE! how the induced assignments hold depends on which side we're assigning:
    it inherits the support from the side it is being assigned to.
    because if always x := f f z, and sometimes x := f y, and we set x := f y,
    then we always need to have that f := f z.

However, we should take care with unions if we case about finite unification results:
The union of two intervals isn't the min/max of the start/end points.

this one also just holds

* a₀ := f f f f f a₅ `has to hold from n+x` [0, n-5]
* a₀ := f f f a₃ `has to hold from n+y` [0, n-3]
  - merge assignments `f f f a₃` and `f f f f f a₅`
  - a₀ := f f f a₃ `has to hold from n+min(x, y)` [0, n-3]
  - a₀ := f f a₂ ? `has to hold from n+x+3` [3, n-2]
    - merge assignments `f f a₂` and `f f f a₃`
    - a₀ := f f a₂ `has to hold from n+min(x, y)` [0, n-3]∪[3, n-2]
    - a₀ := f a₁ ? `has to hold from n+2+min(x, y)` [2, n-1]
      - merge assignments `f a₁` and `f f a₂`
      - a₀ := f a₁ `has to hold from n+min(x, y)` [0, n-3]∪[2, n-1]
      - a₀ := f a₁ ? `has to hold from n+1+min(x, y)` [0, n-3]∪[3, n-2]
        - merge assignments `f a₁` and `f a₁`
        - a₀ := f a₁ `has to hold from n+min(x, y)` [0, n-3]∪[2, n-1]
        - a₀ := a₀ `has to hold from n+1+min(x, y)`


example where the forced assignments require involvement of negative variables:

* a₀ := b₋₁ `has to hold from n+1`
* b₀ := c₋₁ `has to hold from n+1`
* c₀ := d₋₁ `has to hold from n+1`
* d₀ := e₋₁ `has to hold from n+1`
NOTICE: writing these assignments the other way around is much more favourable.

Then when we instantiate metavariables we notice that the supports aren't good enought for our purpose.
So we may expand the supports to force our equation to be satisfied.
Or we may accept the lack of support and update the unification that we're making work.

The problem with expanding the supports is that we also involve metavariables that we don't want to exist.
Better would be to only involve the legal metavariables from the start.
So while instantiating metavariables, we keep track of the support, realizing that we can't support
certain assignments anymore.

What about this

* a₀ := b₋₁ `has to hold from n+1`
* b₀ := c₀ `has to hold from n+1`

The we force the assignment of `b₀ := c₀` to also hold at 0. But that doesn't mean that
any illegal metavariables have been added.
Whereas the method of accepting lack of support is going to behave badly here.


-/

abbrev M := EStateM Unit MVarContext

instance : Alternative M where
  failure := throw ()
  orElse  := tryCatch

private structure OccursContext where
  mvarId  : MVarId
  offset  : Int -- how much we should subtract from the expression
  mvarIds : List MVarId := []
  kindMod : AssignmentKindModifier := {}

@[inline]
private def OccursContext.insert (mvarId : MVarId) (up? : Bool) (c : OccursContext) : OccursContext :=
  { c with mvarIds := mvarId :: c.mvarIds, kindMod := c.kindMod.insert up? }

/-
Fails inside `M` if occurs check failed. Fails inside `OptionT` if it failed at the root.
If other variables become loopy due to this assignment, we store that.
-/
partial def Expr.occursCheck (context : OccursContext) (isRoot : Bool) : Expr → M (Option AssignmentKind)
  | .imvar mvarId n' => do
    if mvarId == context.mvarId then
      match compare n' context.offset with
      | .lt => return context.kindMod.apply false isRoot
      | .eq => return none
      | .gt => return context.kindMod.apply true  isRoot
    else
      let some { n, value, kind } ← mvarId.getAssignment? | return some .noLoop
      let context := { context with offset := context.offset + n - n' }
      match kind with
      | .noLoop =>
        let some kind ← value.occursCheck context isRoot | return none
        /- We make sure variables part of a new loop are set to loopy. -/
        if kind.isLoop then
          mvarId.assign n value kind
        return kind
      | .loop up? _ =>
        if context.mvarIds.contains mvarId then
          return some .noLoop
        else
          value.occursCheck (context.insert mvarId up?) isRoot
  | .app _ args =>
    some <$> args.foldlM (init := .noLoop) fun result arg => do
      let some kind ← arg.occursCheck context false | failure
      (result.and kind).getM
  | .mvar _ => return some .noLoop



/--
Merges assignments `aᵢ := s` and `aⱼ := t` for `i ≤ j`. We have `offset := i - j`.

Computes the common part of two expressions, leaving the metavariables that were at the leaves.
The required metavariable assignments are added as `PendingAssignments` in the context.
-/
private partial def mergeCore (s t : Expr) (offset : Int) : M Expr := do
  let returnMVar mvarId n t := do
    pushPending mvarId n t
    return .imvar mvarId n

  match s, t with
  | .imvar mvarId n, .imvar mvarId' n' =>
    let n' := n' + offset
    /- This case split is crucial for termination of the algorithm, as it reduces
      the index offset at mvar-to-mvar assignments. -/
    match compare n n' with
    | .lt => returnMVar mvarId' n' s
    | .eq =>
      if mvarId == mvarId' then return s
      else returnMVar mvarId' n' s
    | .gt =>
      returnMVar mvarId n (.imvar mvarId' n')
  | .imvar mvarId n, t   => returnMVar mvarId n (t.offsetBy offset)
  | s, .imvar mvarId' n' => returnMVar mvarId' (n' + offset) s
  | .app f args, .app f' args' => do
    if h : f = f' ∧ args.size = args'.size then
      let args ← args.size.foldM' (init := .mkEmpty args.size) fun i mergeArgs =>
        mergeArgs.push <$> mergeCore args[i] args'[i] offset
      return .app f args
    else
      failure
  | .mvar mvarId, .mvar mvarId' => if mvarId == mvarId' then return s else failure
  | _, _ => failure

private partial def instantiateRootLoop (startMvarId mvarId : MVarId) (startN n : Int) : M Int := do
  if mvarId == startMvarId then
    assert! n < startN
    return startN - n
  else
    let some { n := assigN, value := .imvar mvarId' assigN', kind } ← mvarId.getAssignment? | unreachable!
    let n' := n + assigN' - assigN
    if assigN > n then
      mvarId.assign assigN (.imvar mvarId' n') kind
    instantiateRootLoop startMvarId mvarId' startN n'

/--
`mergeCore` jumps throught some hoops in order to ensure the algorithm terminates.
-/
def merge (s t : Expr) (sKind tKind : AssignmentKind) (ns nt : Int) (mvarId : MVarId) : M Expr := do
  match sKind, tKind with
  | .loop _ true, .loop _ true => mergeCore s t (ns - nt)
  | .loop _ true, _ =>
    let .imvar mvarId' n' := s | unreachable!
    let period ← instantiateRootLoop mvarId mvarId' ns n'
    mergeCore (t.offsetBy period) t period
  | _, .loop _ true =>
    let .imvar mvarId' n' := t | unreachable!
    let period ← instantiateRootLoop mvarId mvarId' nt n'
    mergeCore (s.offsetBy period) s period
  | _, _ =>
    mergeCore s t (ns - nt)

partial def processPending : M Unit := do
  let { pending, .. } ← getMCtx
  if pending.isEmpty then
    return
  else
    let { mvarId, n := nNew, value := newValue } := pending.back
    modifyMCtx ({ · with pending := pending.pop })
    let some newKind ← newValue.occursCheck { mvarId, offset := nNew } true | return -- `value = .imvar mvarId nNew`
    match ← mvarId.getAssignment? with
    | some { n, value, kind } =>
      -- we assign at the smallest value of `n`. This can create too strong assignments, but that's acceptable.
      if nNew < n then
        let value ← merge newValue value newKind kind nNew n mvarId
        mvarId.assign nNew value kind
      else
        let value ← merge value newValue kind newKind n nNew mvarId
        mvarId.assign n value kind
    | none =>
      mvarId.assign nNew newValue newKind

    processPending


partial def unifyCore (s t : Expr) : M Unit := do
  match s, t with
  | .imvar mvarId n, .imvar mvarId' n' =>
    match compare n n' with
    | .lt => pushPending mvarId' n' s
    | .eq =>
      if mvarId == mvarId' then return
      else pushPending mvarId' n' s
    | .gt =>
      pushPending mvarId n (.imvar mvarId' n')
  | .imvar mvarId n, t   => pushPending mvarId  n  t
  | s, .imvar mvarId' n' => pushPending mvarId' n' s
  | .app f args, .app f' args' => do
    if h : f = f' ∧ args.size = args'.size then
      args.size.forM' fun i =>
        unifyCore args[i] args'[i]
    else
      failure
  | .mvar mvarId, .mvar mvarId' => if mvarId == mvarId' then return else failure
  | _, _ => failure


def unify (s t : Expr) : Option MVarContext := do
  match unifyCore s t |>.run {} with
  | .ok () ctx  => some ctx
  | .error () _ => none


end Iterate

/-

Would it make sense to use a e-graph like data structure for my infinite unifications?

* Term graph: all terms, represented in a way to maximize sharing.

* Union-find: all equivalences on the terms.

Now, the only terms that should be allowed in the union-find are variable assignments,
and the congruences created from them, from the



-/
