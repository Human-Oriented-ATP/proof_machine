import Lean
import GadgetGameSolver.Primitives

def Array.eraseDups [BEq α] : Array α → Array α
  | ⟨l⟩ => ⟨l.eraseDups⟩
namespace GadgetGame

open Lean Elab Meta Command Parser

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

end GadgetGame
