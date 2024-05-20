import Lean

def Array.eraseDups [BEq α] : Array α → Array α
  | ⟨l⟩ => ⟨l.eraseDups⟩
namespace Prolog

open Lean Elab Meta Parser

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

def parsePrologFile (file : System.FilePath) : MetaM ProblemState := do
  let input ← IO.FS.readFile file
  let stx ← IO.ofExcept <| Parser.runParserCategory (← getEnv) `problem_state input
  return parseProblemState ⟨stx⟩

class ProofState (α : Type) where

local instance : ToExpr Expr where
  toExpr := id
  toTypeExpr := mkConst ``Expr

partial def Term.toExpr : Term → Expr
  | .var v => mkApp (mkConst ``Term.var) (ToExpr.toExpr v)
  | .app label args => mkApp2 (mkConst ``Term.app) (ToExpr.toExpr label) (ToExpr.toExpr (args.map toExpr))

partial def Term.quote : Term → TSyntax `term
  | .var v => TSyntax.mk <| .node .none ``Parser.Term.app #[
      .ident .none "Term.var".toSubstring ``Term.var [Lean.Syntax.Preresolved.decl `Prolog.Term.var [], Lean.Syntax.Preresolved.namespace `Prolog.Term.var],
      Quote.quote (k := `term) v]
  | .app label args => TSyntax.mk <| .node .none ``Parser.Term.app #[
      .ident .none "Term.app".toSubstring ``Term.app [
        Lean.Syntax.Preresolved.decl `Prolog.Term.app [],
        Lean.Syntax.Preresolved.namespace `Prolog.Term.app,
        Lean.Syntax.Preresolved.namespace `Lean.Parser.Term.app
      ], .node .none `null (#[Quote.quote (k := `term) label, Quote.quote (k := `term) (args.map quote)])]

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

def addAxiom (name : Name) («axiom» : Axiom) : MetaM Unit := do
  let .ok env := (← getEnv).addAndCompile {} <| .axiomDecl {
    name := name,
    levelParams := [],
    type := toExpr «axiom»,
    isUnsafe := false
  } | throwError "Failed to update environment."
  setEnv env
  addInstance name .global (prio := 1000)

def solveProblemState (problemState : ProblemState) : MetaM Expr := do
  for (idx, «axiom») in problemState.axioms.mapIdx (·, ·) do
    addAxiom (.str `axiom (toString idx.val)) «axiom»
  synthInstance (.app (mkConst ``ProblemState) (toExpr problemState.target))

elab "#solve_gadget_game_puzzle" file:str : command => Command.runTermElabM fun _ ↦ do
  let problemState ← parsePrologFile file.getString
  logInfo (repr problemState)
  let solution ← withoutModifyingEnv <| solveProblemState problemState
  logInfo solution

end Prolog

open Prolog in
elab "test_axiom%" : term => do
  let file := "../problems/jacob_easyproblem1.pl"
  let problemState ← parsePrologFile file
  return (Axiom.toExpr problemState.axioms[2]!)

#check test_axiom%
