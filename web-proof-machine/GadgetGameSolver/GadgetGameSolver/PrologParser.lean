import Lean
import GadgetGameSolver.Primitives

def Array.eraseDups {α} [BEq α] : Array α → Array α
  | ⟨l⟩ => ⟨l.eraseDups⟩
namespace GadgetGame

open Lean Elab Meta Command Parser


partial def commentParser : ParserFn := fun c s =>
  let input := c.input
  let i     := s.pos
  if input.atEnd i then s
  else
    (takeUntilFn (fun c => c = '\n')) c (s.next input i)

def commentBody : Parser :=
{ fn := rawFn (commentParser) (trailingWs := true) }

def prologComment := leading_parser
  "%" >> commentBody
@[combinator_parenthesizer commentBody]
def commentBody.parenthesizer := PrettyPrinter.Parenthesizer.visitToken
@[combinator_formatter commentBody]
def commentBody.formatter := PrettyPrinter.Formatter.visitAtom Name.anonymous

declare_syntax_cat fol_term
syntax (name := var) ident : fol_term
syntax (name := const) num : fol_term
syntax (name := app) ident noWs "(" fol_term,* ")" : fol_term
syntax (name := underscore) "_" : fol_term

declare_syntax_cat sentence
syntax (name := imp_sentence) fol_term (":-" fol_term,+)? "." : sentence
syntax (name := conclusion) ":-" fol_term "." : sentence
syntax (name := comment) prologComment : sentence

declare_syntax_cat problem_state
syntax (name := file) sentence+ : problem_state

partial def parseTerm : TSyntax `fol_term → StateM Nat Term
  | `(fol_term| $v:ident) =>
    let v := v.getId.toString
    if (v.get 0).isUpper then
      return .var v
    else if (v.get 0).isLower then
      return .app v #[]
    else panic! s!"Variable names must be upper or lower-case, got {v}."
  | `(fol_term| $n:num) => return .app (toString n.getNat) #[]
  | `(fol_term| $label:ident($[$terms],*)) =>
    let label := label.getId.toString
    if (label.get 0).isLower then
      .app label <$> terms.mapM parseTerm
    else panic! s!"Function labels must be lower-case, got {label}."
  | `(fol_term| _) => do
    let n ← get
    set (n+1)
    return .var s!"_{n}"
  | stx => panic! s!"Expected first-order term, got {stx}."

def parseAxiom? : TSyntax `sentence → StateM Nat (Option Axiom)
  | `(imp_sentence| $t:fol_term $[:- $[$terms],*]?.) => return some {
      hypotheses := ← (terms.getD #[]).mapM parseTerm,
      conclusion := ← parseTerm t }
  | `(conclusion| :- $_ .) => return none
  | `(comment| $_:prologComment) => return none
  | stx => panic s!"Expected a sentence, got {stx}."

def parseProblemState : TSyntax `problem_state → StateM Nat ProblemState
  | `(problem_state| $[$sentences]*) => do
    let goals ← sentences.filterMapM <| fun | `(conclusion| :- $conclusion .) => some <$> parseTerm conclusion | _ => return none
    if let #[goal] := goals then
      let axioms ← sentences.filterMapM parseAxiom?
      return { axioms := axioms, target := goal }
    else panic! "Expected a single goal in the problem state."
  | stx => panic s!"Expected problem state, got {stx}."

def parsePrologFile {M} [Monad M] [MonadLiftT IO M] [MonadEnv M] (file : System.FilePath) : M ProblemState := do
  let input ← IO.FS.readFile file
  let stx ← IO.ofExcept <| Parser.runParserCategory (← getEnv) `problem_state input
  return parseProblemState ⟨stx⟩ |>.run' 0

end GadgetGame
