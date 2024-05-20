namespace GadgetGame

inductive Term where
  | var (name : String)
  | app (label : String) (args : Array Term)
deriving Repr

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

partial def Term.collectVars : Term → Array String
  | .var v => #[v]
  | .app _ args => args.concatMap collectVars

def Term.collectVarsDedup (t : Term) : Array String :=
  t.collectVars.toList.eraseDups.toArray

def Axiom.collectVars : Axiom → Array String
  | ⟨hyps, conclusion⟩ =>
    (hyps.push conclusion).concatMap Term.collectVars

def Axiom.collectVarsDedup : Axiom → Array String
  | ⟨hyps, conclusion⟩ =>
    (hyps.push conclusion).concatMap Term.collectVarsDedup |>.toList.eraseDups.toArray

end GadgetGame
