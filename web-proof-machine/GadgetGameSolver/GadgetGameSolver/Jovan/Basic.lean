import GadgetGameSolver.Jovan.Variables
import GadgetGameSolver.Jovan.Stack

namespace JovanGadgetGame

structure Priority where
  /-- The inverse importance is a number at least 1, with 1 being the highest importance. -/
  invImportance : Nat
  /-- The times of the axiom applications that lead to this goal -/
  times         : Array Nat
  deriving Inhabited

def timesCmpDFS (as bs : Array Nat) : Ordering :=
  let rec go n :=
    if h : n < as.size then
      if h : n < bs.size then
        let a := as[n]
        let b := bs[n]
        (compare a b).then (go (n+1))
      else
        .gt
    else
      if n < bs.size then
        .lt
      else
        .eq
  go 0

def timesCmpBFS (as bs : Array Nat) : Ordering :=
  let rec go n :=
    if h : n < as.size then
      let a := as[n]
      let b := bs[n]!
      (compare a b).then (go (n+1))
    else
      .eq
  (compare bs.size as.size).then (go 0)

def rootPriority : Priority where
  invImportance := 1
  times         := #[]

structure AxiomApplication where
  name   : Name
  mvars  : Array Expr
  gadget : Gadget
  deriving Inhabited

/-- A goal in the tabled (type class) resolution. -/
structure GeneratorNode where
  goalId       : GoalId
  key          : CellKey
  mctx         : MVarContext
  goalctx      : GoalContext
  axioms       : Array AxiomApplication
  currAxiomIdx : Nat
  deriving Inhabited

structure ConsumerNode where
  goalId        : GoalId
  key           : CellKey
  mctx          : MVarContext
  goalctx       : GoalContext
  nextSubgoalId : GoalId
  laterSubgoals : Array GoalId
  size          : Nat -- instance size so far
  times         : Array Nat -- times of creating/modifying this node
  deriving Inhabited

inductive Waiter where
  | consumerNode : ConsumerNode → Waiter
  | root         : Waiter

def Waiter.isRoot : Waiter → Bool
  | .consumerNode _ => false
  | .root           => true

structure Answer where
  cInfo : ConstantInfo -- this constant must have 0 hypotheses.
  size  : Nat
  deriving Inhabited

structure TableEntry where
  waiters      : Array Waiter
  loopyWaiters : Array Waiter
  answers      : Array Answer
  priority     : Priority

structure Config where
  depthFirst            : Bool
  prioritizeUndeepGoals : Bool
  orderGoalsAndAxioms   : Bool
  postponeLoopySearch   : Bool

def Priority.cmp (p q : Priority) (config : Config) :=
  let cmpTime (_ : Unit) :=
    if config.depthFirst then
      timesCmpDFS p.times q.times
    else
      timesCmpBFS p.times q.times
  if config.prioritizeUndeepGoals then
    (compare q.invImportance p.invImportance).then (cmpTime ())
  else
    cmpTime ()

structure Context where
  maxResultSize : Option Nat
  axioms        : Std.HashMap (String × Nat) (Array ConstantInfo)

structure State where
  config         : Config -- should really be in the Context instead
  mctx           : MVarContext := {}
  gctx           : GoalContext := {}
  env            : Environment := {}
  uniqueNum      : Nat := 1
  stepCount      : Nat := 0
  result?        : Option ConstantInfo := none
  generatorStack : PriorityQueue Priority GeneratorNode (·.cmp · config) := {}
  resumeStack    : Array (ConsumerNode × Answer)                         := #[]
  loopyStack     : Queue (ConsumerNode × Answer ⊕ GeneratorNode)        := {}
  tableEntries   : Std.HashMap CellKey TableEntry := {}
  log            : Array String := #[]
  time           : Nat := 0


abbrev SearchM := ReaderT Context StateRefT State (EIO String)
instance {α} : Inhabited (SearchM α) := ⟨throw default⟩

instance : MonadMCtx SearchM where
  getMCtx      := return (← get).mctx
  modifyMCtx f := modify fun s => { s with mctx := f s.mctx }

instance : MonadGCtx SearchM where
  getGCtx      := return (← get).gctx
  modifyGCtx f := modify fun s => { s with gctx := f s.gctx }

instance : MonadEnv SearchM where
  getEnv      := return (← get).env
  modifyEnv f := modify fun s => { s with env := f s.env}

instance : MonadUnique SearchM where
  getUnique := modifyGet fun s => (s.uniqueNum, { s with uniqueNum := s.uniqueNum + 1 })

@[inline] def timeit {α} (k : SearchM α) : SearchM α := do
  let t0 ← IO.monoNanosNow
  let a ← k
  let t1 ← IO.monoNanosNow
  modify fun s => { s with time := s.time + (t1 - t0) }
  pure a

def getConfig : SearchM Config := return (← get).config

def logMessage (msg : String) : SearchM Unit := modify fun s => { s with log := s.log.push s!"{s.stepCount}: {msg}" }

def increment : SearchM Unit := modify fun s => { s with stepCount := s.stepCount + 1 }


def findEntry? (key : CellKey) : SearchM (Option TableEntry) := do
  return (← get).tableEntries[key]?

def getEntry (key : CellKey) : SearchM TableEntry := do
  match (← findEntry? key) with
  | none       => throw s!"invalid key at gadget search"
  | some entry => pure entry


/-- Return globals and locals instances that may unify with `goal` -/
def getAxioms (goal : Cell) : SearchM (Array ConstantInfo) := do
  match (← read).axioms[(goal.f, goal.args.size)]? with
  | none => return #[]
  | some axioms => return axioms
