import GadgetGameSolver.PrologParser

namespace Prolog

class ProofState (α : Term) where


open Lean Elab Meta Command Parser

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

def testTerm : Term := .app "r" #[.app "c" #[]]

def addAxioms (axioms : Array Axiom) : CommandElabM Unit := do
  for «axiom» in axioms do
    Command.elabCommand <| quote (k := `command) «axiom»
  -- let s := instanceExtension.getState (← getEnv)
  -- let hyps ← (s.discrTree.getMatch (.app (.const ``ProofState []) (toExpr testTerm)) {}) |>.run' {} |>.run' { fileName := "", fileMap := ⟨"", #[]⟩} { env := ← getEnv }
  -- logInfo (repr hyps.size)

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
