import { CstNode, CstParser, IRecognitionException } from "chevrotain"
import { Atom, Comma, Entails, FullStop, LeftParen, NewLine, Number, RightParen, Variable, allTokens, tokenize } from "./Lexer"

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
            }
        })
        this.CONSUME(RightParen)
    })

    argument = this.RULE("argument", () => {
        this.OR([
            { ALT: () => this.CONSUME(Number) },
            { ALT: () => this.CONSUME(Variable) },
            { ALT: () => this.SUBRULE(this.compoundTerm) }
        ])
    })

    statement = this.RULE("statement", () => {
        this.OPTION(() => { this.SUBRULE(this.compoundTerm, { LABEL: "conclusion" }) })
        this.OPTION1(() => {
            this.CONSUME(Entails)
            this.MANY_SEP({
                SEP: Comma,
                DEF: () => { this.SUBRULE1(this.compoundTerm, { LABEL: "hypotheses" }) }
            })
        })
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

function handleErrors(errors: IRecognitionException[]) {
    if (errors.length > 0) {
        const msg = errors.map((error) => `[${error.name}] ${error.message}`).join('\n')
        throw new Error(msg)
    }
}

export function parseTermCst(text: string): CstNode {
    parser.input = tokenize(text)
    const cst = parser.argument()
    handleErrors(parser.errors)
    return cst
}

export function parseStatementCst(text: string): CstNode {
    parser.input = tokenize(text)
    const cst = parser.statement()
    handleErrors(parser.errors)
    return cst
}

export function parseProblemCst(text: string): CstNode {
    parser.input = tokenize(text)
    const cst = parser.problem()
    handleErrors(parser.errors)
    return cst
}