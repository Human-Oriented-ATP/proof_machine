import GadgetGameSolver.Jovan.SearchM
import GadgetGameSolver.Jovan.Util


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

Then when we instantiate metavariables we notice that the supports aren't good enought for our purpose.
So we may expand supports to force our equation to be satisfied.

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

namespace JovanGadgetGame.Iterate

abbrev M := OptionT SearchM

section OccursCheck

private structure OccursContext where
  mvarId  : MVarId
  mvarIds : List IMVarId := []

@[inline]
private def OccursContext.insert (mvarId : IMVarId) (c : OccursContext) : OccursContext :=
  { c with mvarIds := mvarId :: c.mvarIds }

/-
Fails inside `M` if occurs check failed. Returns `true` if occurs at the root.
If other variables become loopy due to this assignment, we store that.
-/
partial def Expr.occursCheck (context : OccursContext) (isRoot : Bool := true) : Expr → M Bool
  | .imvar mvarId _ => do
      let some { value, kind, .. } ← mvarId.getAssignment? | return false
      if kind.isLoop then
        if context.mvarIds.contains mvarId then
          return false
        else
          value.occursCheck (context.insert mvarId) isRoot
      else
        value.occursCheck context isRoot
  | .app _ args  => do
    args.forM (discard <| ·.occursCheck context false)
    return false
  | .mvar mvarId => do
    match ← getMVarIdAssignment? mvarId with
    | some value => value.occursCheck context false
    | none =>
      if mvarId == context.mvarId then
        if isRoot then
          return true -- the result is the mvar itself
        else
          failure -- occurs check fails
      else
        return false


private structure IOccursContext where
  mvarId  : IMVarId
  offset  : Int -- how much we should subtract from the expression
  mvarIds : List IMVarId := []
  kindMod : AssignmentKindModifier := {}

@[inline]
private def IOccursContext.insert (mvarId : IMVarId) (up? : Bool) (c : IOccursContext) : IOccursContext :=
  { c with mvarIds := mvarId :: c.mvarIds, kindMod := c.kindMod.insert up? }

/-
Fails inside `M` if occurs check failed. Fails inside `OptionT` if occurs at the root.
If other variables become loopy due to this assignment, we set them to be loopy.
-/
partial def Expr.iOccursCheck (context : IOccursContext) (isRoot : Bool := true) : Expr → M (Option AssignmentKind)
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
        let some kind ← value.iOccursCheck context isRoot | return none
        /- We make sure variables part of a new loop are set to loopy. -/
        if kind.isLoop then
          mvarId.assign n value kind
        return kind
      | .loop up? _ =>
        if context.mvarIds.contains mvarId then
          return some .noLoop
        else
          value.iOccursCheck (context.insert mvarId up?) isRoot
  | .app _ args =>
    some <$> args.foldlM (init := .noLoop) fun result arg => do
      let some kind ← arg.iOccursCheck context false | failure
      (result.and kind).getM
  | .mvar mvarId => do
    match ← getMVarIdAssignment? mvarId with
    | some value => value.iOccursCheck context false
    | none => return some .noLoop

end OccursCheck


mutual
partial def unifyPointCore (s t : Expr) : ReaderT (Lean.AssocList IMVarId Expr) M Unit := do
  match s, t with
  | .mvar mvarId, t
  | t, .mvar mvarId    => tryMVarIdAssignment mvarId t
  | .imvar mvarId n, t
  | t, .imvar mvarId n => tryPointAssignment mvarId n t
  | .app f args, .app f' args' => do
    if h : f = f' ∧ args.size = args'.size then
      args.size.forM' fun i =>
        unifyPointCore args[i] args'[i]
    else
      failure

partial def tryMVarIdAssignment (mvarId : MVarId) (value : Expr) : ReaderT (Lean.AssocList IMVarId Expr) M Unit := do
  if ← value.occursCheck { mvarId } then
    return
  else
    match ← getMVarIdAssignment? mvarId with
    | some value' => unifyPointCore value value'
    | none => assignMVarId mvarId value

partial def tryPointAssignment (mvarId : IMVarId) (n : Int) (value : Expr) : ReaderT (Lean.AssocList IMVarId Expr) M Unit := do
  let jp := do
    match ← mvarId.getPointAssignment? n with
    | some value' => unifyPointCore value value'
    | none => mvarId.assignPoint n value
  if (← value.iOccursCheck { mvarId, offset := n }).isNone then
    return
  else
    match ← mvarId.getAssignment? with
    | none => jp
    | some { n := n', value := value', kind } =>
      if n' > n then jp
      else
        let value' := value'.decrement (n' - n) -- increment
        match kind with
        | .loop true _ =>
          if (← read).find? mvarId == value.decrement n then
            dbg_trace "this edge case seems really unlikely...";
            /- This case is very ugly. Example:
            have `a₀ := f f a₂` and `b := a₀` and `b := f a₁`. Then the fact that `a₀ = f a₁` would propagate up infinitely.
            Thus, we ignore that nonsense, and just set this to hold everywhere: `aₙ = f aₙ₊₁`.
            -/
            discard <| pushPending mvarId n value
          else
            withReader (·.cons mvarId (value.decrement n)) do
              unifyPointCore value value'
        | _ => unifyPointCore value value'
end

def IMVarId.verifyAndAssign (mvarId : IMVarId) (n : Int) (value : Expr) (kind : AssignmentKind) : M Unit := do
  modifyMCtx fun mctx => { mctx with iassignments := mctx.iassignments.insert mvarId { n, value, kind } }
  let pointAssignments ← mvarId.getPointAssignments!
  pointAssignments.forM fun n' value => do
    if n' ≥ n then
      tryPointAssignment mvarId n value |>.run {}


mutual
/-- First sets the assignment at the start point. Then unifies the start point with its succesor. -/
partial def tryMVarIdEverywhereAssignment (mvarId : MVarId) (value : Expr) : M Expr := do
  if let .mvar mvarId' := value then
    if mvarId == mvarId' then
      return value
  tryMVarIdAssignment mvarId value |>.run {}
  mergeCore value (value.decrement (-1)) 0


/--
Merges assignments `aᵢ := s` and `aⱼ := t` for `i ≤ j`. We have `offset := i - j` (which is non-negative).

Computes the common part of two expressions, leaving the metavariables that were at the leaves.
The required metavariable assignments are added as `PendingAssignments` in the context.
-/
private partial def mergeCore (s t : Expr) (offset : Int) : M Expr := do
  match s, t with
  | s, .imvar mvarId n => pushPending mvarId (n - offset) s
  | .imvar mvarId n, t => pushPending mvarId n (t.decrement offset)
  | s, .mvar mvarId => tryMVarIdEverywhereAssignment mvarId s
  | .mvar mvarId, t => tryMVarIdEverywhereAssignment mvarId (t.decrement offset)
  | .app f args, .app f' args' => do
    if h : f = f' ∧ args.size = args'.size then
      let args ← args.size.foldM' (init := .mkEmpty args.size) fun i mergeArgs =>
        mergeArgs.push <$> mergeCore args[i] args'[i] offset
      return .app f args
    else
      failure
end

/-- Returns the period of the variable that loops at the root, as a non-negative number. -/
private partial def instantiateRootLoop (startMvarId mvarId : IMVarId) (startN n : Int) : M Int := do
  if mvarId == startMvarId then
    assert! n < startN
    return n - startN
  else
    let some { n := assigN, value := .imvar mvarId' assigN', kind } ← mvarId.getAssignment? | unreachable!
    let n' := n + assigN' - assigN
    if assigN > n then
      mvarId.assign assigN (.imvar mvarId' n') kind
    instantiateRootLoop startMvarId mvarId' startN n'

/--
`merge` jumps through some hoops in order to ensure the algorithm terminates.
`ns ≤ nt`
-/
def merge (s t : Expr) (sKind tKind : AssignmentKind) (ns nt : Int) (mvarId : IMVarId) : M Unit := do
  let rootLoop s t ns nt _sKind tKind := do
    let .imvar mvarId' ns' := s | unreachable!
    let period ← instantiateRootLoop mvarId mvarId' ns ns'
    let value ← mergeCore (t.decrement period) t period
    if nt - period > ns then
      mvarId.assign ns (value.decrement ((nt - period) - ns)) tKind
    else
      mvarId.assign (nt - period) value tKind

  match sKind, tKind with
  | .loop _ true, .loop _ true =>
    let value ← mergeCore s t (nt - ns)
    mvarId.verifyAndAssign ns value sKind
  | .loop _ true, _ => rootLoop s t ns nt sKind tKind
  | _, .loop _ true => rootLoop t s nt ns tKind sKind
  | _, _ =>
    let kind ← (sKind.and tKind).getM
    let value ← mergeCore s t (nt - ns)
    mvarId.verifyAndAssign ns value kind

partial def processPending : M Unit := do
  let { pending, .. } ← getMCtx
  if pending.isEmpty then
    return
  else
    let { mvarId, n := nNew, value := newValue } := pending.back
    -- logMessage (s!"{(← mvarId.getDecl!).userName}{subscriptString nNew} := {← newValue.toString}\n{← contextString}")
    modifyMCtx ({ · with pending := pending.pop })
    let some newKind ← newValue.iOccursCheck { mvarId, offset := nNew } | return -- `value = .imvar mvarId nNew`
    match ← mvarId.getAssignment? with
    | some { n, value, kind } =>
      /- we assign at the smallest value of `n`.
      This can create stronger-than-necessary assignments, but that's acceptable. -/
      if nNew < n then
        merge newValue value newKind kind nNew n mvarId
      else
        merge value newValue kind newKind n nNew mvarId
    | none =>
      mvarId.verifyAndAssign nNew newValue newKind

    processPending


partial def unifyCore : (s t : Expr) → M Unit
  | .imvar mvarId n, value
  | value, .imvar mvarId n => discard <| pushPending mvarId n value
  | .app f args, .app f' args' => do
    if h : f = f' ∧ args.size = args'.size then
      args.size.forM' fun i => unifyCore args[i] args'[i]
    else
      failure
  | .mvar mvarId, .mvar mvarId' => if mvarId == mvarId' then return else failure
  | _, _ => failure


def unifyPoint (s t : Cell) : SearchM Bool := do
  if h : s.f = t.f ∧ s.args.size = t.args.size then
    let mctx ← getMCtx
    let go := do
      s.args.size.forM' fun i => unifyPointCore s.args[i] t.args[i]
      processPending
    match ← go.run {} with
    | some () => return true
    | none    =>
      setMCtx mctx *> return false
  else
    return false

def unify (s t : Cell) : SearchM Bool := do
  if h : s.f = t.f ∧ s.args.size = t.args.size then
    let mctx ← getMCtx
    let go := do
      s.args.size.forM' fun i => unifyCore s.args[i] t.args[i]
      processPending
    match ← go.run with
    | some () => return true
    | none    =>
      setMCtx mctx *> return false
  else
    return false
