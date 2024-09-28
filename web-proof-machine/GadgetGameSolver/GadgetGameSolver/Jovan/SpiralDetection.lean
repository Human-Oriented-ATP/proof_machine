import GadgetGameSolver.Jovan.Generalize
import Batteries.Lean.HashSet
/-!

To detect spirals, we loop through all ways of getting to the new goal.
As we do this, we keep track of the generalized proof.
At each point, we check if the new goal can be created from the past goal.

examples:
`g(a,1) :- g(b,a)` loops
`g(b,a) :- g(a,1)` similarly loops, and after 1 iteration, it gets to
  `g(b,1) :- g(1,1)`. But we could already see this looping from the start.
`g(a,b) :- g(b,a)` also loops, but we don't want to flag it as loopy immediately.

For now, we only check for spirals, which is defined so that the implication
can be repeatedly applied, and it creates new constants.


So I will stop a goal if every search path leading to it is spiralling.

What about loopy waiters? I will ignore them to avoid infite loops during
this search.

-/

namespace JovanGadgetGame


/-- starts at `none`, progresses to `some n`, and then to being removed.
A succesfull match is with a `some n` when the depth is more than `n`. -/
private abbrev IsSpiralState := Std.HashMap MVarId (Option Nat)

/--
A DFS implementation that tells whether there is a cycle in the assignments
with at least one non-trivial edge.
-/
partial def isSpiralingAssignment (mvars : Std.HashSet MVarId) : SearchM Bool := do
  let list := mvars.toList
  let s := mvars.inner.map fun _ _ => (none : Option Nat)
  let result ← (list.foldlM (go 0) s).run
  return result.isNone
where
  go (depth : Nat) (s : IsSpiralState) (mvarId : MVarId) : OptionT SearchM IsSpiralState := do
    match s[mvarId]? with
    | none => return s
    | some none =>
      let s := s.insert mvarId depth
      let some e ← mvarId.getAssignment? | throwThe _ "unassigned metavariable after `unifyLeft`"
      let s ← do
        if let .mvar mvarId := e then
          go depth s mvarId
        else
          let depth := depth + 1
          (e.collectMVars {}).result.foldM (go depth) s
      return s.erase mvarId
    | some (some depth') =>
      if depth = depth' then
        return s
      else
        failure

@[specialize]
def Expr.findMVar? (e : Expr) (p : MVarId → Bool) : Option MVarId :=
  match e with
  | .mvar mvarId =>
    if p mvarId then mvarId else none
  | .app _ args =>
    args.attach.toList.firstM fun ⟨arg, _⟩ => arg.findMVar? p

@[specialize]
def Cell.findMVar? (c : Cell) (p : MVarId → Bool) : Option MVarId :=
  c.args.toList.firstM (·.findMVar? p)

partial def isSpiral (cNode : ConsumerNode) : SearchM Bool :=
  withMCtx {} do
  let (origGoal, nextGoal) ← generalizeImplication cNode.proof cNode.nextSubgoalId

  let rec go (key : CellKey) (goal : Cell) : SearchM Bool := do
    let goal ← goal.instantiateMVars
    let origGoal ← origGoal.instantiateMVars
    let mctx ← getMCtx
    let mvarIds := (goal.collectMVars {}).result
    if mvarIds.isEmpty || (origGoal.findMVar? (mvarIds.contains)).isNone then
      return false
    if ← unifyLeft goal origGoal then
      let r ← isSpiralingAssignment mvarIds
      setMCtx mctx
      return r
    else
      let { waiters, .. } ← getEntry key
      waiters.allM fun
      | .root               => pure false
      | .consumerNode cNode => do
        setMCtx mctx
        let (goal', nextGoal) ← generalizeImplication cNode.proof cNode.nextSubgoalId
        unless ← unify goal' goal do
          throw s!"goals {← goal.toString} and {← goal'.toString} don't unify"
        go cNode.key nextGoal

  go cNode.key nextGoal

-- partial def isLoopyKey (key originalKey : CellKey) : SearchM Bool := do
--   if originalKey == key then
--     logMessage "loop has been detected"
--     return true
--   else
--     let { waiters, .. } ← getEntry key
--     waiters.allM fun
--       | .root               => pure false
--       | .consumerNode cNode => isLoopyKey cNode.key originalKey



-- partial def checkProof' (proof : Proof) : SearchM Cell := do
--   match proof with
--   | .goal goalId => goalId.getGoal!
--   | .node name vars proofs =>
--     let gadget := (← name.getConstInfo).gadget
--     if vars.size != gadget.varNames.size then
--       throw "incorrect number of variables in proof node"
--     if proofs.size != gadget.hypotheses.size then
--       throw "incorrect number of proofs in proof node"
--     proofs.size.forM fun i => do
--       let hypType := gadget.hypotheses[i]!.instantiate vars
--       let proofType ← checkProof' proofs[i]!
--       unless ← unify proofType hypType do
--         throw s!"mismatch: a proof of {← proofType.toString} is applied to subgoal {← hypType.toString}"
--     return gadget.conclusion.instantiate vars

-- partial def Proof.check' (proof : Proof) : SearchM Unit :=
--   discard <| checkProof' proof
