namespace Prolog

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

end Prolog
