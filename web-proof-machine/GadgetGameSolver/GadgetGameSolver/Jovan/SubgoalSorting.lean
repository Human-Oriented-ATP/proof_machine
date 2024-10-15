import GadgetGameSolver.Jovan.SearchM

/-!
when choosing the next subgoal in a consumer node, we want to do so wisely.
- A goal that has at most 1 applicable axiom is the best

- A goal that has less metavariables is better

- A goal that has less applicable axioms,
  and ones that introduce fewer metavariables and fewer new subgoals is better.


OHHH wait, very important/confusing is the fact that subgoals of subgoals don't get propagated to the
higher lever, which disturbs the ability to choose the best of the available goals.
The problem is that a priori, this subgoal may be shared with others.

In fact, there is currently no way to work on different goals at the same time, because the solutions to
goals are only propagated when they are complete :(
The problem is that if you do some progress on one goal, then the other goal may just become a different
goal (with instantiated metavariables), effectively deleting the progress on the more general goal.


Let's define a cost function for axiom applications:
- need a cost function for how specific or unspecific a goal is.
- need a way to combine this over multiple parallel goals.
- need a way to combine this over multiple possible axioms.

The cost should be a general estimation of how hard the search is. So,
- combining over multiple axioms should be done with addition.
- combining over muliple parallel goals, assuming they don't share metavariables,
  should be done with addition if there is a solution, and less-than-addition if
  one of the goals doesn't have a solution.
  If they share metavariables, then it is also less-than addition due to the fact that later goals
  become easier. However on the other hand, this should be multiplication, since we need to consider
  all possible goals, and combine them in all possible ways.
  The issue is that we can do optimizations when the metavariables are not shared.

This function will recursively try axioms that are uniquely applicable, and only create 1 goal,
and never repeat the same axiom. With this, the goal may be solved, or the whole node may be discarded.



-/

namespace JovanGadgetGame

def specificity : Expr → Float
| .mvar _ => 0
| .app _ args => if args.isEmpty then 1 else
  let argSpec := args.attach.foldl (init := 0) (fun spec ⟨arg, _⟩ => spec + specificity arg) / args.size.toFloat
  (1 + argSpec) / 2

/-- difficulty of a goal. (since it is a goal, it isn't a metavariable) -/
def difficulty (c : Cell) : Float :=
  if c.args.isEmpty then 1 else
    2 - c.args.foldl (init := 0) (fun spec arg => spec + specificity arg) / c.args.size.toFloat

/-- Returns `none` if `ax` doesn't work. Returns the difficulty -/
def checkAxiom (goal : Cell) (cInfo : ConstantInfo) : SearchM (Option (AxiomApplication × Float)) := do
  let (mvars, gadget) ← cInfo.gadget.instantiateFresh
  let axiomApp := { gadget, name := cInfo.name, mvars }
  let mctx ← getMCtx
  if ← unify gadget.conclusion goal then
    if gadget.hypotheses.isEmpty then
      setMCtx mctx
      return some (axiomApp, 1/2)
    else
      let d ← gadget.hypotheses.foldlM (init := 0) fun d subGoal => do
        let subGoal ← subGoal.instantiateMVars
        return d + (difficulty subGoal)
      setMCtx mctx
      return some (axiomApp, d)
  else
   return none

def CellDifficulty := Option Float

def CellDifficulty.gt (a b : CellDifficulty) : Bool :=
  match a, b with
  | none  , _      => false
  | some _, none   => true
  | some a, some b => a > b

/-- Returns the difficulty of the goal, and the axioms sorted from difficult to easy. -/
def checkAxioms (goal : Cell) : SearchM (Float × Array AxiomApplication) := do
  let axioms ← getAxioms goal
  let filteredAxioms ← axioms.filterMapM (checkAxiom goal)
  let difficulty := filteredAxioms.foldl (init := 0) (· + ·.2)
  let filteredAxioms := filteredAxioms.qsort (·.2 > ·.2) |>.map (·.1)
  logMessage s!"{difficulty}: {← goal.toString}"
  return (difficulty, filteredAxioms)

/--
Returns the easiest goal with its applicable axioms sorted from difficult to easy, and the remaining goals.
Returns `.error true` if there are no goals. Returns `.error false` if some goals can't be solved. -/
def bestSubgoal (goals : Array GoalId) : SearchM (Except Bool ((GoalId × (Array AxiomApplication ⊕ Answer)) × Array GoalId)) := do
  let some goals ← OptionT.run <| goals.mapM fun goalId => do
    let goal ← goalId.getInstantiatedGoal
    if let some cInfo ← goal.getCached? then
      return (none, goalId, .inr cInfo)
    let (difficulty, axioms) ← checkAxioms goal
    if axioms.isEmpty then
      failure
    else
      return (some difficulty, goalId, .inl axioms)
    | return .error false
  let some (_, goalId, axioms) := goals.getMax? (CellDifficulty.gt ·.1 ·.1) | return .error true
  let otherGoals := goals.filterMap fun (_, goalId', _) => if goalId' == goalId then none else some goalId'
  return .ok ((goalId, axioms), otherGoals)


/-!

I want to be able to to forced moves, that is, applying an axiom if we know for certain it has to be applied there.

For this, we need to be able to keep track of multiple goals that share a common metavariable context.

So we need to be a bit weaker than being fully alpha reduced in the lookup table.

For this to make sense, at first, I would like to have all global goals to be a conjuction (and avoiding case splits)

There are 2 kinds of metavariables: shared and unshared. The unshared can happily be abstracted.
But to abstract the shared ones, we need to also abstract all of the corresponding dependent goals,

We can think of the goals as forming a graph, where the edges are the shared metavariables.
So the connected components in this form single clusters of goals. And it is these clusters that we can abstract.
How to abstract something like `w(a,b), w(b,c), w(c,c)`? Each variable should get an index, but
it's not clear in which order. Also the goals can be ordered based on the constants, but not the variables.
Solution: make a generator that (lazily) spits out all orders of goals that we allow. Then,
we greedily take the minimal order.

Now, what are the available strategies for these goal-clusters?
- solving one goal
- applying the only available axiom to one goal
- picking one goal to solve independently of the other goals

Loop detection is still important: we still need to keep track of goals in abstracted form to detect when a goal
has been seen before



What does a proof of impossibility look like?
- A cluster of goals is impossible if all axiom applications at one goal each lead to impossible clusters.
- A cluster of goals is impossible if a subset is impossible.
- A collection of clusters of goals is impossible if for each cluster,
    all axiom applications at one goal lead to other clusters in this collection.

What about a proof of which instantiations are the only valid ones?
  The same, but keeping track of the solutions.


When we pick one goal from a cluster to work on, we may set some limit on the time spent on this.
After this time, we may try picking a different goal from the cluster.
Working on one goal of the cluster is completed when all solutions to it have been found.
However, it may be useful to propagate the solutions as they are being found.
These solutions should come with a score describing how reasonable the choice is.
This is 100% when it is the only solution, but if there are ∞ solutions, we can't
just divide by the number of solutions. We can have the score say something about
the canonicalness of the solutions, e.g. if it came from 1 of 3 possible axioms,
the score is 1/3. But when later these other axioms turn out to not work, we can
increase this score to 1.

When one goal in a cluster turns out to have a unique solution, the work on other
goals can be discarded, or it can be specialized (i.e. check which parts still work).






-/
