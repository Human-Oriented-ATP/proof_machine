import Std.Data.HashMap
import GadgetGameSolver.Primitives
import GadgetGameSolver.Jovan.Init

namespace JovanGadgetGame

/-! Gadgets -/

structure MVarId where
  id : Nat
deriving Inhabited, BEq

instance : Hashable MVarId where
  hash mvarId := hash mvarId.id

inductive Expr where
| mvar : MVarId → Expr
| app  : String → Array Expr → Expr
deriving Inhabited, BEq

def Expr.mvarId! : Expr → MVarId
  | mvar mvarId => mvarId
  | _ => panic! "mvar expected"

structure Cell where
  f    : String
  args : Array Expr
  deriving Inhabited

structure Gadget where
  conclusion : Cell
  hypotheses : Array Cell
  deriving Inhabited

def Expr.toTerm (e : Expr) : GadgetGame.Term :=
  match e with
  | .mvar mvarId => .var (toString mvarId.id)
  | .app f args => .app f (args.attach.map fun ⟨x, _⟩ => x.toTerm)

def Cell.toTerm (c : Cell) : GadgetGame.Term :=
  .app c.f (c.args.map (·.toTerm))

/-! Abstracted gadgets -/

inductive AbstractedExpr where
| mvar : Nat → AbstractedExpr
| app  : String → Array AbstractedExpr → AbstractedExpr
deriving BEq

protected def AbstractedExpr.hash : AbstractedExpr → UInt64
  | .mvar n     => hash n
  | .app f args => args.attach.foldl (init := hash f) (fun ⟨x, _⟩ => mixHash · <| x.hash)

instance : Hashable AbstractedExpr := ⟨AbstractedExpr.hash⟩

structure AbstractedCell where
  f    : String
  args : Array AbstractedExpr
  deriving Inhabited, BEq

structure CellKey extends AbstractedCell where
  hash : UInt64 := args.foldl (init := hash f) (mixHash · <| hash ·)
  deriving Inhabited, BEq

instance : Hashable CellKey := ⟨CellKey.hash⟩

structure AbstractedGadget where
  varNames   : Array String
  conclusion : AbstractedCell
  hypotheses : Array AbstractedCell
  deriving Inhabited

/-! Instantiating abstracted gadgets -/

def AbstractedExpr.instantiate (e : AbstractedExpr) (subst : Array Expr) : Expr :=
  match e with
  | .mvar i => subst[i]!
  | .app f args => .app f <| args.attach.map fun ⟨arg, _⟩ => arg.instantiate subst

def AbstractedCell.instantiate (c : AbstractedCell) (subst : Array Expr) : Cell where
  f := c.f
  args := c.args.map (·.instantiate subst)

/-! Creating `CellKey` from `Cell` and `AbstractedGadget` from `Axiom`. -/

structure MkCellKeyState where
  map : Std.HashMap MVarId AbstractedExpr := {}

def abstractExpr (e : Expr) : StateM MkCellKeyState AbstractedExpr := do
  match e with
  | .mvar mvarId =>
    let s ← get
    match s.map[mvarId]? with
    | some e => pure e
    | none =>
      let e := .mvar s.map.size
      set { s with map := s.map.insert mvarId e }
      pure e
  | .app f args =>
    let args ← args.attach.mapM fun ⟨x, _⟩ => abstractExpr x
    return .app f args

def abstractCell (c : Cell) : StateM MkCellKeyState CellKey :=
  return { c with args := ← c.args.mapM abstractExpr }

def Cell.abstract (c : Cell) : CellKey := abstractCell c |>.run' {}


structure AbstractAxiomState where
  varNames : Array String := #[]
  map      : Std.HashMap String AbstractedExpr := {}

def abstractTermAsExpr (t : GadgetGame.Term) : StateM AbstractAxiomState AbstractedExpr := do
  match t with
  | .var v =>
    let s ← get
    match s.map[v]? with
    | some e => pure e
    | none =>
      let e := .mvar s.map.size
      set { s with varNames := s.varNames.push v, map := s.map.insert v e }
      pure e
  | .app f args =>
    let args ← args.attach.mapM fun ⟨x, _⟩ => abstractTermAsExpr x
    return .app f args

def abstractTermAsCell (t : GadgetGame.Term) : StateM AbstractAxiomState AbstractedCell := do
  let .app f args := t | panic! "GadgetGame.Term starts with a `.var` constructor."
  let args ← args.mapM abstractTermAsExpr
  return { f, args }

def _root_.GadgetGame.Axiom.abstract (ax : GadgetGame.Axiom) : AbstractedGadget :=
  let go : StateM AbstractAxiomState _ := do
    pure (← abstractTermAsCell ax.conclusion, ← ax.hypotheses.mapM abstractTermAsCell)
  let ((conclusion, hypotheses), { varNames, ..}) := StateT.run go {}
  { conclusion, hypotheses, varNames }

/-! Collecting metavariables -/

structure CollectMVarsState where
  result : Std.HashSet MVarId := {}

def Expr.collectMVars : Expr → CollectMVarsState → CollectMVarsState
  | .mvar mvarId => fun s => { s with result := s.result.insert mvarId }
  | .app _ args => args.attach.foldl (fun s ⟨e, _⟩ => e.collectMVars s)

def Cell.collectMVars (c : Cell) : CollectMVarsState → CollectMVarsState :=
  c.args.foldl fun s e => e.collectMVars s

def Gadget.collectMVars (gadget : Gadget) : CollectMVarsState → CollectMVarsState :=
  gadget.conclusion.collectMVars ∘ gadget.hypotheses.foldl fun s e => e.collectMVars s