import GadgetGameSolver.Jovan.TableKey
import GadgetGameSolver.Jovan.ProofTree

namespace JovanGadgetGame
open GadgetGame

/-- A goal in the tabled (type class) resolution. -/
structure GeneratorNode where
  goalId       : GoalId
  key          : TermKey
  priority     : Nat
  mctx         : MetavarContext
  goalctx      : GoalContext
  axioms       : Array GadgetGame.Axiom
  currAxiomIdx : Nat
  deriving Inhabited

structure ConsumerNode where
  goalId        : GoalId
  key           : TermKey
  mctx          : MetavarContext
  goalctx       : GoalContext
  nextSubgoalId : GoalId
  laterSubgoals : Array GoalId
  size          : Nat -- instance size so far
  deriving Inhabited

inductive Waiter where
  | consumerNode : ConsumerNode → Waiter
  | root         : Waiter

def Waiter.isRoot : Waiter → Bool
  | .consumerNode _ => false
  | .root           => true

structure Answer where
  proof : LazyPartialProof
  goal  : Term
  size  : Nat
  deriving Inhabited

structure TableEntry where
  waiters : Array Waiter
  answers : Array Answer := #[]
  /-- The priority is a number at least 1, with 1 being the highest priority. -/
  priority : Nat

structure Config where
  depthFirst            : Bool
  orderGoalsAndAxioms   : Bool
  prioritizeUndeepGoals : Bool

structure Context where
  maxResultSize : Option Nat
  axioms        : Std.HashMap String (Array Axiom)
  config        : Config

structure State where
  uniqueNum      : Nat := 1
  stepCount      : Nat := 0
  result?        : Option PartialProof := none
  generatorStack : Array GeneratorNode            := #[]
  resumeStack    : Array (ConsumerNode × Answer)  := #[]
  tableEntries   : Std.HashMap TermKey TableEntry := {}
  log            : Array String := #[]
  time           : Nat := 0


abbrev SearchM := ReaderT Context $ StateRefT State $ StateRefT MetavarContext $ StateRefT GoalContext (EIO String)
instance {α} : Inhabited (SearchM α) := ⟨throw default⟩

def timeit {α} (k : SearchM α) : SearchM α := do
  let t0 ← IO.monoNanosNow
  let a ← k
  let t1 ← IO.monoNanosNow
  modify fun s => { s with time := s.time + (t1 - t0) }
  pure a

def getConfig : SearchM Config := return (← read).config

def getUnique : SearchM Nat := modifyGet fun s => (s.uniqueNum, { s with uniqueNum := s.uniqueNum + 1 })

def logMessage (msg : String) : SearchM Unit := modify fun s => { s with log := s.log.push s!"{s.stepCount}: {msg}" }

def increment : SearchM Unit := modify fun s => { s with stepCount := s.stepCount + 1 }

/-- Return globals and locals instances that may unify with `goal` -/
def getAxioms (goal : Term) : SearchM (Array Axiom) := do
  let .app cls _ := goal | throw s!"goal is a metavariable: {goal}"
  match (← read).axioms[cls]? with
  | none => return #[]
  | some axioms => return axioms

def TermInstantiateFresh (extension : String) : Term → Term
  | .var v => .var s!"{v}_{extension}"
  | .app f args => .app f (args.attach.map fun ⟨x, _⟩ => TermInstantiateFresh extension x)

def AxiomInstantiateFresh (extension : String) (ax : Axiom) : Axiom :=
  let { hypotheses, conclusion } := ax
    let conclusion := TermInstantiateFresh extension conclusion
    let hypotheses := hypotheses.map (TermInstantiateFresh extension)
    { hypotheses, conclusion }

def getFreshAxioms (goal : Term) : SearchM (Array Axiom) := do
  let axioms ← getAxioms goal
  axioms.mapM fun ax => return AxiomInstantiateFresh (toString (← getUnique)) ax
