import { PrologParser, parse, parser} from "./Parser"
import { Term } from "../game/Term"
import { Statement, InitializationData, makeIntializationDataFromStatements } from "../game/Initialization"
import { ArgumentNode, CompoundTermNode, ProblemNode, SentenceNode } from "./Nodes"

class PrologAstBuilderVisitor extends parser.getBaseCstVisitorConstructor() {
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

    sentence(node: SentenceNode): Statement {
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
                throw new Error("Error in parsing sentence, no conclusions or hypotheses found.")
            }
        }   
    }

    problem(node: ProblemNode): InitializationData {
        const sentences = node.statements.map(stmt => this.visit(stmt))
        return makeIntializationDataFromStatements(sentences);
    }
}

const astBuilder = new PrologAstBuilderVisitor()

export function buildAst(text: string) {
    const cst = parse(text)
    const ast = astBuilder.visit(cst)
    return ast
}