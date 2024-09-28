
namespace JovanGadgetGame

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

abbrev Times := Array (Array Nat)

def timesCmpDFS (t t' : Times) : Ordering :=
  ArrayOrderingDFS t t' fun t t' =>
    ArrayOrderingDFS t t' compare

def timesCmpBFS (t t' : Times) : Ordering :=
  ArrayOrderingBFS t t' fun t t' =>
    ArrayOrderingBFS t t' compare

structure Priority where
  /-- The inverse importance is a number at least 1, with 1 being the highest importance. -/
  numCases : Nat
  -- /-- The size of the solution so far -/
  -- size          : Nat
  /-- The times of the axiom applications that lead to this goal -/
  times         : Times
  deriving Inhabited

def rootPriority : Priority where
  numCases := 1
  -- size          := 0
  times         := #[]
