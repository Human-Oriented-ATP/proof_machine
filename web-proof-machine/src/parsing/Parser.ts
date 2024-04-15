import { CstNode, CstParser } from "chevrotain"
import { Atom, Comma, Entails, FullStop, LeftParen, Number, RightParen, Variable, WhiteSpace, allTokens, tokenize } from "./Lexer"

export class PrologParser extends CstParser {
    constructor() {
        super(allTokens);
        this.performSelfAnalysis();
    }

    compoundTerm = this.RULE("compoundTerm", () => {
        this.CONSUME(Atom, { LABEL: "label" })
        this.CONSUME(LeftParen)
        this.AT_LEAST_ONE_SEP({
            SEP: Comma,
            DEF: () => {
            this.SUBRULE(this.argument, { LABEL: "args" })
        }})
        this.CONSUME(RightParen)
    })

    argument = this.RULE("argument", () => {
        this.OR([
            { ALT: () => this.CONSUME(Number)},
            { ALT: () => this.CONSUME(Variable)},
            { ALT: () => this.SUBRULE(this.compoundTerm)}
        ])
    })

    sentence = this.RULE("sentence", () => {
        this.OR([
            { ALT: () => { this.SUBRULE(this.compoundTerm, { LABEL: "conclusion" }) }},
            { ALT: () => {
                this.OPTION(() => { this.SUBRULE(this.compoundTerm, { LABEL: "conclusion" }) })
                this.CONSUME(Entails)
                this.MANY_SEP({
                    SEP: Comma,
                    DEF: () => { this.SUBRULE(this.compoundTerm, { LABEL: "hypotheses" }) }
                })
            }}
        ])
        this.CONSUME(FullStop)
    })

    problem = this.RULE("problem", () => {
        this.AT_LEAST_ONE_SEP({
            SEP: WhiteSpace,
            DEF: () => { this.SUBRULE(this.sentence, { LABEL: "statements" }) }
        })
    })
}

export const parser: PrologParser = new PrologParser()

export function parse(text: string): CstNode {
  parser.input = tokenize(text)
  const cst = parser.problem()

  if (parser.errors.length > 0) {
    const msg = parser.errors.map((error) => `[${error.name}] ${error.message}`).join(', ')
    throw new Error(msg)
  }

  return cst
}