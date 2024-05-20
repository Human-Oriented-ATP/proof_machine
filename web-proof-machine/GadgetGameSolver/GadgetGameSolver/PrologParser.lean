import Lean

def Array.eraseDups [BEq α] : Array α → Array α
  | ⟨l⟩ => ⟨l.eraseDups⟩
namespace Prolog

open Lean Elab Meta Command Parser

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

declare_syntax_cat fol_term
syntax (name := var) ident : fol_term
syntax (name := const) num : fol_term
syntax (name := app) ident noWs "(" fol_term,+ ")" : fol_term

declare_syntax_cat sentence
syntax (name := imp_sentence) fol_term (":-" fol_term,+)? "." : sentence
syntax (name := conclusion) ":-" fol_term "." : sentence

declare_syntax_cat problem_state
syntax (name := file) sentence+ : problem_state

partial def parseTerm : TSyntax `fol_term → Term
  | `(fol_term| $v:ident) =>
    let v := v.getId.toString
    if (v.get 0).isUpper then
      .var v
    else panic! s!"Variable names must be upper-case, got {v}."
  | `(fol_term| $n:num) => .app (toString n.getNat) #[]
  | `(fol_term| $label:ident($[$terms],*)) =>
    let label := label.getId.toString
    if (label.get 0).isLower then
      .app label (terms.map parseTerm)
    else panic! s!"Function labels must be lower-case, got {label}."
  | stx => panic! s!"Expected first-order term, got {stx}."

def parseAxiom? : TSyntax `sentence → Option Axiom
  | `(imp_sentence| $t:fol_term $[:- $[$terms],*]?.) => some {
      hypotheses := (terms.getD #[]).map parseTerm,
      conclusion := parseTerm t }
  | `(conclusion| :- $_ .) => none
  | stx => panic s!"Expected a sentence, got {stx}."

def parseProblemState : TSyntax `problem_state → ProblemState
  | `(problem_state| $[$sentences]*) =>
    let goals := sentences.filterMap <| fun | `(conclusion| :- $conclusion .) => some (parseTerm conclusion) | _ => none
    if let #[goal] := goals then
      let axioms := sentences.filterMap parseAxiom?
      { axioms := axioms, target := goal }
    else panic! "Expected a single goal in the problem state."
  | stx => panic s!"Expected problem state, got {stx}."

def parsePrologFile [Monad M] [MonadLiftT IO M] [MonadEnv M] (file : System.FilePath) : M ProblemState := do
  let input ← IO.FS.readFile file
  let stx ← IO.ofExcept <| Parser.runParserCategory (← getEnv) `problem_state input
  return parseProblemState ⟨stx⟩

class ProofState (α : Term) where


local instance : ToExpr Expr where
  toExpr := id
  toTypeExpr := mkConst ``Expr

partial def Term.toExpr : Term → Expr
  | .var v => mkApp (mkConst ``Term.var) (ToExpr.toExpr v)
  | .app label args => mkApp2 (mkConst ``Term.app) (ToExpr.toExpr label) (ToExpr.toExpr (args.map toExpr))

partial def Term.quote : Term → TSyntax `term
  | .var v => Unhygienic.run `(term| Term.var $(Quote.quote v))
  | .app label args =>
    let argsStx := args.map quote
    Unhygienic.run `(term| Term.app $(Quote.quote label) #[$[$argsStx],*])

instance : Quote Term `term where
  quote := Term.quote

instance : ToExpr Term where
  toExpr := Term.toExpr
  toTypeExpr := mkConst ``Term

partial def Term.collectVars : Term → Array String
  | .var v => #[v]
  | .app _ args => (args.concatMap collectVars).eraseDups

def Axiom.collectVars : Axiom → Array String
  | ⟨hyps, conclusion⟩ =>
    (hyps.push conclusion).concatMap Term.collectVars |>.eraseDups

partial def Axiom.toExpr : Axiom → Expr
  | «axiom»@⟨hyps, conclusion⟩ =>
    let vars := «axiom».collectVars
    let body := mkForalls (hyps.map (`_inst, .app (mkConst ``ProofState) <| Term.toExpr ·)) (.app (mkConst ``ProofState) <| Term.toExpr conclusion) .instImplicit
    mkForalls (vars.map (.mkSimple ·, mkConst ``Term)) body .implicit
where
  mkForalls (domains : Array (Name × Expr)) (target : Expr) (binderInfo : BinderInfo) : Expr :=
    if domains.isEmpty then
      target
    else
      let (name, type) := domains.back
      let targetNew := Expr.forallE name type target binderInfo
      mkForalls domains.pop targetNew binderInfo

instance : ToExpr Axiom where
  toExpr := Axiom.toExpr
  toTypeExpr := mkConst ``Axiom

instance : Quote String `ident where
  quote s := ⟨.ident .none s.toSubstring (.mkSimple s) []⟩

instance : Quote Axiom `command where
  quote «axiom» :=
    let vars := «axiom».collectVars.map <| quote (k := `ident)
    let hypotheses := «axiom».hypotheses.map <| (Unhygienic.run `(Lean.Parser.Term.bracketedBinderF| [ProofState ($(Lean.quote ·))]))
    Unhygienic.run `(command| instance {$[$vars]* : Term} $[$hypotheses]* : ProofState ($(quote «axiom».conclusion)) where)

def addAxioms (axioms : Array Axiom) : CommandElabM Unit := do
  for «axiom» in axioms do
    Command.elabCommand <| quote (k := `command) «axiom»

def solveProblemState (problemState : ProblemState) : MetaM Expr := do
  let ((), σ) ← addAxioms problemState.axioms |>.run { fileName := "", fileMap := ⟨"", #[]⟩, tacticCache? := none, snap? := none }
    |>.run { env := (← getEnv), maxRecDepth := 100000 }
  withEnv σ.env do
    synthInstance <| .app (.const ``ProofState []) (toExpr problemState.target)

elab "#solve_gadget_game_puzzle" file:str : command => do
  let problemState ← parsePrologFile file.getString
  runTermElabM fun _ ↦ do
    let solution ← solveProblemState problemState
    logInfo solution

end Prolog

set_option trace.Meta.synthInstance true
#solve_gadget_game_puzzle "../problems/tim_easyproblem3.pl"
