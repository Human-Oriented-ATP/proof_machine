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
