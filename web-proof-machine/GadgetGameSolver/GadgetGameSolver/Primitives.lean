import Lean.Data.Json

namespace GadgetGame

inductive Term where
  | var (name : String)
  | app (label : String) (args : Array Term)
deriving Repr, BEq, Lean.ToJson, Lean.FromJson, Hashable

instance : Inhabited Term where
  default := .var ""

structure Axiom where
  hypotheses : Array Term
  conclusion : Term
deriving Repr, Inhabited

structure ProblemState where
  axioms : Array Axiom
  target : Term
deriving Repr, Inhabited

partial def Term.toString : Term → String
  | .var v => v
  | .app f #[] => f
  | .app f args => s!"{f}({", ".intercalate (args.toList.map toString)})"

def Axiom.toString («axiom» : Axiom) : String :=
  if «axiom».hypotheses.isEmpty then
    s!"{«axiom».conclusion.toString}."
  else
    s!"{«axiom».conclusion.toString} :- {", ".intercalate («axiom».hypotheses.toList.map Term.toString)}."

def ProblemState.toString (problemState : ProblemState) : String :=
  s!"{"\n".intercalate (problemState.axioms.toList.map Axiom.toString)}\n:- {problemState.target.toString}."

instance : ToString Term where
  toString := Term.toString

instance : ToString Axiom where
  toString := Axiom.toString

instance : ToString ProblemState where
  toString := ProblemState.toString

def Term.argsSize : Term → Nat
  | .var _ => 0
  | .app _ args => args.size

partial def Term.collectVars : Term → Array String
  | .var v => #[v]
  | .app _ args => args.concatMap collectVars

abbrev Term.isClosed (t : Term) := t.collectVars = #[]

def Term.collectVarsDedup (t : Term) : Array String :=
  t.collectVars.toList.eraseDups.toArray

def Axiom.collectVars : Axiom → Array String
  | ⟨hyps, conclusion⟩ =>
    (hyps.push conclusion).concatMap Term.collectVars

def Axiom.collectVarsDedup : Axiom → Array String
  | ⟨hyps, conclusion⟩ =>
    (hyps.push conclusion).concatMap Term.collectVarsDedup |>.toList.eraseDups.toArray

partial def Term.substitute (var : String) (s : Term) : Term → Term
  | .var v =>
    if v = var then
      s
    else
      .var v
  | .app f args => .app f (args.map <| substitute var s)

partial def Term.isEq : Term → Term → Bool
  | .var v, .var v' => v = v'
  | .app f args, .app f' args' =>
    f = f' && args.size = args'.size &&
    (Array.zip args args' |>.all <| fun (t, t') ↦ Term.isEq t t')
  | .var _, .app _ _ => false
  | .app _ _, .var _ => false

partial def Term.containsVar? (var : String) : Term → Bool
  | .var v =>
      if v = var then
        true
      else false
  | .app _ args => args.any <| containsVar? var

end GadgetGame