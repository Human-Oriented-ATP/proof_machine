import GadgetGameSolver.Jovan.IteratedVariables
import GadgetGameSolver.Jovan.ProofVariables
import GadgetGameSolver.Jovan.Stack
import GadgetGameSolver.Jovan.Priority

namespace JovanGadgetGame

structure GoalInfo where
  goalId  : GoalId
  goal    : Cell
  mvars   : Array MVarId
  key     : CellKey
  mctx    : MVarContext
  goalctx : GoalContext
  deriving Inhabited

/-- A goal in the tabled (type class) resolution. -/
structure GeneratorNode where
  gInfo        : GoalInfo
  axioms       : Array ConstantInfo
  currAxiomIdx : Nat
  deriving Inhabited

structure ConsumerNode where
  gInfo      : GoalInfo
  subgoalInfo   : GoalInfo
  laterSubgoals : Array GoalId
  proof         : Proof
  proofKeys     : List (ProofKeys × Bool)
  /-- `instGoalMVars` is none as soon as an MVarId gets assigned to a function application.
  TODO: replace this -/
  instGoalMVars : Option (Array MVarId)
  priorityMod   : PriorityModifier
  deriving Inhabited

/- A ConsumerNode is uniquely determined by `priorityMod.times.back`-/

instance : BEq ConsumerNode where
  beq c d := c.priorityMod.times.back == d.priorityMod.times.back
instance : Hashable ConsumerNode where
  hash c := hash c.priorityMod.times.back


structure ResumeEntry where
  cNode   : ConsumerNode
  answer  : Answer
  /-- Resuming counts towards the step-count whenever we don't resume the original waiter. -/
  counts? : Bool
  deriving Inhabited

structure OpenTableEntry where
  gNode        : GeneratorNode
  firstWaiter  : Option ConsumerNode -- TODO: use `goalId` equality to tell appart this `ConsumerNode`.
  priority     : Priority -- this is the max of the priorities of the waiters
  waiters      : Std.HashMap ConsumerNode Priority
  deadResumes  : Array ResumeEntry -- this array is only non-empty if priority.isNone.
  waitingFor   : Std.HashSet ConsumerNode
  cycle        : Std.HashSet CellKey -- TODO: make this an option to avoid unnecesary storage space
  answers      : Array Answer

inductive TableEntry where
| openE : OpenTableEntry → TableEntry
| done  : Array Answer → TableEntry

structure Context where
  axioms        : Std.HashMap (String × Nat) (Array ConstantInfo)

structure State where
  config         : Config -- should really be in the Context instead
  mctx           : MVarContext := {}
  imctx          : Iterate.MVarContext := {}
  gctx           : GoalContext := {}
  env            : Environment := {}
  uniqueNum      : Nat := 1
  stepCount      : Nat := 0
  result?        : Option ConstantInfo := none
  resumeStack    : Array ResumeEntry := #[]
  generatorStack : PriorityQueue PosPriority CellKey     (·.cmp · config) := {}
  loopyStack     : Queue (ResumeEntry ⊕ CellKey) := {}
  tableEntries   : Std.HashMap CellKey TableEntry := {} -- TODO: switch to using `GoalId` for identification, as it has a faster `==`?
  log            : Array String := #[]
  time           : Nat := 0


abbrev SearchM := ReaderT Context StateRefT State (EIO String)
instance {α} : Inhabited (SearchM α) := ⟨throw default⟩

instance : MonadUnique SearchM where
  getUnique := modifyGet fun s => (s.uniqueNum, { s with uniqueNum := s.uniqueNum + 1 })

instance : MonadConfig SearchM where
  getConfig := return (← get).config

instance : MonadMCtx SearchM where
  getMCtx      := return (← get).mctx
  modifyMCtx f := modify fun s => { s with mctx := f s.mctx }

instance : Iterate.MonadMCtx SearchM where
  getMCtx      := return (← get).imctx
  modifyMCtx f := modify fun s => { s with imctx := f s.imctx }

instance : MonadEnv SearchM where
  getEnv      := return (← get).env
  modifyEnv f := modify fun s => { s with env := f s.env}

instance : MonadGCtx SearchM where
  getGCtx      := return (← get).gctx
  modifyGCtx f := modify fun s => { s with gctx := f s.gctx }

@[inline] def timeit {α} (k : SearchM α) : SearchM α := do
  let t0 ← IO.monoNanosNow
  let a ← k
  let t1 ← IO.monoNanosNow
  modify fun s => { s with time := s.time + (t1 - t0) }
  pure a

def logMessage (msg : String) : SearchM Unit := modify fun s => { s with log := s.log.push s!"{s.stepCount}: {msg}" }

def increment : SearchM Unit := modify fun s => { s with stepCount := s.stepCount + 1 }


def findEntry? (key : CellKey) : SearchM (Option TableEntry) := do
  return (← get).tableEntries[key]?

def getEntry (key : CellKey) : SearchM TableEntry := do
  match ← findEntry? key with
  | none       => throw s!"invalid key"
  | some entry => pure entry

def getOpenEntry (key : CellKey) : SearchM OpenTableEntry := do
  match ← getEntry key with
  | .openE entry => pure entry
  | .done _      => throw s!"invalid key: entry is already solved"

def setOpenEntry (key : CellKey) (entry : OpenTableEntry) : SearchM Unit := do
  modify fun s => { s with
    tableEntries := s.tableEntries.insert key (.openE entry) }

def modifyOpenEntry (key : CellKey) (f : OpenTableEntry → OpenTableEntry) : SearchM Unit := do
  setOpenEntry key (f (← getOpenEntry key))

def setDoneEntry (key : CellKey) (answers : Array Answer) : SearchM Unit := do
  modify fun s => { s with
    tableEntries := s.tableEntries.insert key (.done answers) }

/-- Return globals and locals instances that may unify with `goal` -/
def getAxioms (goal : Cell) : SearchM (Array ConstantInfo) := do
  match (← read).axioms[(goal.f, goal.args.size)]? with
  | none => return #[]
  | some axioms => return axioms

def getApplicableAxioms (goal : Cell) : SearchM (Array ConstantInfo) := do
  let axioms ← getAxioms goal
  axioms.filterMapM fun cInfo => do
    let (_, gadget) ← cInfo.gadget.instantiateFresh
    let mctx ← getMCtx
    if ← unify gadget.conclusion goal then
      setMCtx mctx
      return some cInfo
    else
      return none


def mkGoalInfo (goalId : GoalId) : SearchM GoalInfo := do
  let goal ← goalId.getInstantiatedGoal
  return {
    goalId, goal
    mvars   := goal.collectMVars {} |>.arr
    key     := goal.abstract
    mctx    := ← getMCtx
    goalctx := ← getGCtx }
