import GadgetGameSolver.Primitives
import Std

namespace JovanGadgetGame

inductive TermKey where
| var : Nat → TermKey
| app : UInt64 → String → Array TermKey → TermKey
deriving Inhabited, BEq

instance : Hashable TermKey where
  hash
    | .var n => hash n
    | .app h _ _ => h

def TermKey.mkApp (f : String) (args : Array TermKey) : TermKey :=
  let hash := args.foldl (init := hash f) (mixHash · <| hash ·)
  .app hash f args

/-!
  In tabled resolution, we creating a mapping from goals (e.g., `Coe Nat ?x`) to
  answers and waiters. Waiters are consumer nodes that are waiting for answers for a
  particular node.

  We implement this mapping using a `HashMap` where the keys are
  normalized Termessions. That is, we replace assignable metavariables
  with auxiliary free variables of the form `_tc.<idx>`. We do
  not declare these free variables in any local context, and we should
  view them as "normalized names" for metavariables. For example, the
  term `f ?m ?m ?n` is normalized as
  `f _tc.0 _tc.0 _tc.1`.

  This approach is structural, and we may visit the same goal more
  than once if the different occurrences are just definitionally
  equal, but not structurally equal.

  Remark: a metavariable is assignable only if its depth is equal to
  the metavar context depth.
-/


structure MkKeyState where
  nextIdx : Nat := 0
  map     : Std.HashMap String TermKey := {}

def toTermKey (e : GadgetGame.Term) : StateM MkKeyState TermKey := do
  match e with
  | .var v =>
    let s ← get
    match s.map[v]? with
    | some e' => pure e'
    | none =>
      let e' := .var s.nextIdx
      set { s with nextIdx := s.nextIdx + 1, map := s.map.insert v e' }
      pure e'
  | .app f args =>
    let args ← args.attach.mapM fun ⟨x, _⟩ => toTermKey x
    return .mkApp f args

/-- Remark: `mkTableKey` assumes `e` does not contain assigned metavariables. -/
def mkTableKey (e : GadgetGame.Term) : TermKey :=
  toTermKey e |>.run' {}

end JovanGadgetGame
