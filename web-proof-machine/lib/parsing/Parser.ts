import { CstNode, CstParser } from "chevrotain"
import { Atom, Comma, Entails, FullStop, LeftParen, NewLine, Number, RightParen, Variable, WhiteSpace, allTokens, tokenize } from "./Lexer"

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

    statement = this.RULE("statement", () => {
        this.OPTION(() => { this.SUBRULE(this.compoundTerm, { LABEL: "conclusion" }) })
        this.OPTION1(() => {
            this.CONSUME(Entails)
            this.MANY_SEP({
                SEP: Comma,
                DEF: () => { this.SUBRULE1(this.compoundTerm, { LABEL: "hypotheses" }) }
        })})
        this.CONSUME(FullStop)
    })

    problem = this.RULE("problem", () => {
        this.MANY_SEP({
            SEP: NewLine,
            DEF: () => { this.SUBRULE(this.statement, { LABEL: "statements" }) }
        })
    })
}

export const parser: PrologParser = new PrologParser()

export function parseTermCst(text: string): CstNode {
    parser.input = tokenize(text)
    const cst = parser.compoundTerm()

    parser.errors.map(console.log)

    if (parser.errors.length > 0) {
        const msg = parser.errors.map((error) => `[${error.name}] ${error.message}`).join(', ')
        throw new Error(msg)
    }

    return cst
}

export function parseStatementCst(text: string): CstNode {
    parser.input = tokenize(text)
    const cst = parser.statement()

    parser.errors.map(console.log)

    if (parser.errors.length > 0) {
        const msg = parser.errors.map((error) => `[${error.name}] ${error.message}`).join(', ')
        throw new Error(msg)
    }

    return cst
}

export function parseProblemCst(text: string): CstNode {
    parser.input = tokenize(text)
    const cst = parser.problem()

    parser.errors.map(console.log)

    if (parser.errors.length > 0) {
        const msg = parser.errors.map((error) => `[${error.name}] ${error.message}`).join(', ')
        throw new Error(msg)
    }

    return cst
}