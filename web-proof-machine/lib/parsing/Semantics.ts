import { parse, parser } from "./Parser"
import { Term } from "../game/Term"
import { Statement, makeProblemFileDataFromStatements, ProblemFileData } from "../game/Initialization"
import { ArgumentNode, CompoundTermNode, ProblemNode, StatementNode } from "./Nodes"

const BaseVisitor = parser.getBaseCstVisitorConstructor()

class PrologAstBuilderVisitor extends BaseVisitor {
    constructor() {
        super()
        this.validateVisitor()
    }

    compoundTerm(node: CompoundTermNode): Term {
        const label = node.label!![0].image
        const args = node.args.map(arg => this.visit(arg))
        return {
            label: label,
            args: args
        }
    }

    argument(node: ArgumentNode): Term {
        if (node.Number) {
            return { label: node.Number!![0].image, args: [] }
        }
        else if (node.Variable) {
            return { variable: node.Variable!![0].image }
        }
        else {
            return this.visit(node.compoundTerm!!)
        }
    }

    statement(node: StatementNode): Statement {
        if (node.conclusion) {
            const conclusion = this.visit(node.conclusion)
            if (node.hypotheses) {
                const hypotheses = node.hypotheses.map((hyp) => this.visit(hyp))
                return {
                    conclusion: conclusion,
                    hypotheses: hypotheses
                }
            } else {
                return { conclusion: conclusion, hypotheses: [] }
            }
        } else {
            if (node.hypotheses) {
                const hypotheses = node.hypotheses.map((hyp) => this.visit(hyp))
                if (hypotheses.length !== 1) {
                    throw new Error("Expected exactly one term in the conclusion.")
                }
                return {
                    goal: hypotheses[0]!!
                }
            } else {
                throw new Error("Error in parsing statement, no conclusions or hypotheses found.")
            }
        }
    }

    problem(node: ProblemNode): ProblemFileData {
        const stmts = node.statements.map(stmt => this.visit(stmt))
        return makeProblemFileDataFromStatements(stmts);
    }

}

const astBuilder = new PrologAstBuilderVisitor()

export function parseProblem(text: string): ProblemFileData {
    const cst = parse(text)
    const ast = astBuilder.visit(cst)
    return ast
}