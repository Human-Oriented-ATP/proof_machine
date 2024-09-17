import Lean.Data.Json

namespace GadgetGame

inductive Term where
  | var (name : String)
  | app (label : String) (args : Array Term)
deriving Repr, BEq, Hashable

partial def Term.toJson : Term → Lean.Json
  | .var v => .mkObj [("variable", v)]
  | .app label args => .mkObj [("label", label), ("args", .arr <| args.map Term.toJson)]

instance : Lean.ToJson Term where
  toJson := Term.toJson

instance : Inhabited Term where
  default := .var ""

structure Axiom where
  hypotheses : Array Term
  conclusion : Term
deriving Repr, Lean.ToJson, Inhabited

inductive Statement where
  | axiom : Axiom → Statement
  | goal : Term → Statement
deriving Repr, Lean.ToJson

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

def Term.isClosed : Term → Bool
  | .var _ => false
  | .app _ args => args.attach.all fun ⟨x, _⟩ => x.isClosed

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


partial def Term.containsVar? (var : String) : Term → Bool
  | .var v =>
      if v = var then
        true
      else false
  | .app _ args => args.any <| containsVar? var

end GadgetGame
