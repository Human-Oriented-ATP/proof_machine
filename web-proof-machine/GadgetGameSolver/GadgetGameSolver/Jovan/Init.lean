
namespace JovanGadgetGame

abbrev Times := Array (Array Nat)

/-- Priority of a generator node. -/
structure PosPriority where
  numApps : Nat
  /-- The inverse importance is a number at least 1, with 1 being the highest importance. -/
  numCases : Nat
  -- /-- The size of the solution so far -/
  -- size          : Nat
  /-- The times of the axiom applications that lead to this goal -/
  times       : Times
  spiralCount : Nat
  deriving Inhabited, BEq, Repr

structure Config where
  depthFirst             : Bool
  fewerCasesFirst        : Bool
  -- simplerSolutionsFirst  : Bool
  orderSubgoalsAndAxioms : Bool
  postponeLoopSearch     : Bool
  postponeSpiralSearch   : Bool
  useOldSpiralDetect     : Bool
  cacheSolutions         : Bool
  fewerConstantsFirst    : Bool
  customPrioValue        : Option (PosPriority → Float)
  traceConstants         : Bool

class MonadConfig (m : Type → Type) where
  getConfig : m Config

export MonadConfig (getConfig)

instance {m n} [MonadLift m n] [MonadConfig m] : MonadConfig n where
  getConfig := liftM (m := m) getConfig

universe u
variable {α : Type u}

@[specialize]
def ArrayOrderingDFS (as bs : Array α) (cmp : α → α → Ordering) : Ordering :=
  go 0
where
  go (n : Nat) :=
    if h : n < as.size then
      if h : n < bs.size then
        (cmp as[n] bs[n]).then (go (n+1))
      else
        .gt
    else
      if n < bs.size then
        .lt
      else
        .eq

@[specialize]
def ArrayOrderingBFS (as bs : Array α) (cmp : α → α → Ordering) : Ordering :=
  if h : bs.size = as.size then
    let rec go (n : Nat) :=
      if h : n < as.size then
        (cmp as[n] bs[n]).then (go (n+1))
      else
        .eq
    go 0
  else
    compare bs.size as.size


def timesCmpDFS (t t' : Times) : Ordering :=
  ArrayOrderingDFS t t' fun t t' =>
    ArrayOrderingDFS t t' compare

def timesCmpBFS (t t' : Times) : Ordering :=
  ArrayOrderingBFS t t' fun t t' =>
    ArrayOrderingBFS t t' compare

/-- The priority related to a goal. It is `useless` when the goal shouldn't be worked on. -/
inductive Priority where
| some    : PosPriority → Priority
| useless : Priority
deriving BEq, Repr

def rootPriority : PosPriority where
  numApps := 0
  numCases := 1
  times    := #[]
  spiralCount := 0

local instance : Ord Float where
  compare a b :=
    if a < b then
      .lt
    else if b < a then
      .gt
    else
      .eq

def PosPriority.properCmp (p q : PosPriority) (config : Config) : Ordering :=
  let cmp := if let some eval := config.customPrioValue then compare (eval p) (eval q) else .eq
  let cmp := cmp.then <| if config.fewerConstantsFirst then compare q.numApps p.numApps else .eq
  cmp.then <|
    if config.fewerCasesFirst then compare q.numCases p.numCases else .eq


def PosPriority.cmp (p q : PosPriority) (config : Config) : Ordering :=
  (p.properCmp q config).then <|
    if config.depthFirst then
      timesCmpDFS p.times q.times
    else
      timesCmpBFS p.times q.times

def Priority.properCmp (p q : Priority) (config : Config) : Ordering :=
  match p, q with
  | .useless, .useless => .eq
  | .some _ , .useless => .gt
  | .useless, .some _  => .lt
  | .some p , .some q  => p.properCmp q config

def Priority.cmp (p q : Priority) (config : Config) : Ordering :=
  match p, q with
  | .useless, .useless => .eq
  | .some _ , .useless => .gt
  | .useless, .some _  => .lt
  | .some p , .some q  => p.cmp q config

def Priority.max (p q : Priority) (config : Config) : Priority :=
  if p.cmp q config |>.isLT then q else p

/-- When computing the priority of a subgoal from that of the main goal, we use a
modifier.-/
structure PriorityModifier where
  numApps   : Nat
  casesFactor : Nat
  times       : Array Nat
  isSpiral    : Bool
  deriving Inhabited

/-- Applying a `PriorityModifier` may not be order preserving. -/
def PosPriority.modify (mod : PriorityModifier) (p : PosPriority) : PosPriority where
  numCases := p.numCases * mod.casesFactor
  times    := p.times.push mod.times
  numApps := mod.numApps
  spiralCount := if mod.isSpiral then p.spiralCount + 1 else p.spiralCount

def Priority.modify (mod : PriorityModifier) (p : Priority) : Priority :=
  match p with
  | .useless => .useless
  | .some p  => .some (p.modify mod)
