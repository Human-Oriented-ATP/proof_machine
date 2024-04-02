import { AbstractGadgetProps, AbstractNodeProps, Color, GadgetId, HoleProps, InternalConnection } from "./Primitives";
import { Assignment, FunctionName, Term, TermReference, VariableName, getVariableSet, substitute } from "./TermIndex";
import { TermUnifier } from "./TermUnifier";

export interface Axiom {
    hypotheses: Term[]
    conclusion: Term
}

function makeTermFromJSONObject(jsonObject: any): Term {
    if ("var" in jsonObject) {
        const name = jsonObject.var
        return { variable: name }
    } else if ("label" in jsonObject && "args" in jsonObject) {
        const args = jsonObject.args.map(makeTermFromJSONObject)
        return { label: jsonObject.label, args }
    } else {
        throw Error("Error parsing JSON")
    }
}

function makeAxiomFromJSONObject(jsonObject: any): Axiom {
    const inputs = jsonObject.hypotheses.map(makeTermFromJSONObject)
    const output = makeTermFromJSONObject(jsonObject.targets[0])
    return { hypotheses: inputs, conclusion: output }
}

export function makeAxiomsFromJSONObject(json: any): Axiom[] {
    const axiomsJSON = json.axioms
    const axioms = axiomsJSON.map(makeAxiomFromJSONObject)
    return axioms
}

export interface GadgetContainerProps {
    gadget: AbstractGadgetProps
    inputs: TermReference[]
    output: TermReference
}

export class GameLogic {
    private axioms: Axiom[]
    private termUnififer: TermUnifier
    private gadgetIdCounter: number
    private variableNameCounter: number

    constructor(json: any) {
        this.axioms = makeAxiomsFromJSONObject(json)
        this.termUnififer = new TermUnifier()
        this.gadgetIdCounter = 0
        this.variableNameCounter = 0
    }

    private makeGadgetId(): string {
        this.gadgetIdCounter++
        return "gadget_" + this.gadgetIdCounter
    }

    private makeVariableId(): string {
        this.variableNameCounter++
        return "v" + this.variableNameCounter
    }

    getAxioms(): Axiom[] {
        return this.axioms
    }

    makeAxiomHole(t: Term): HoleProps {
        if ("variable" in t) {
            return { value: "", isFunctionValue: false }
        } else {
            if (t.args.length === 0) { // constant
                const value = Number(t.label)
                return { value, isFunctionValue: false }
            } else {
                return { value: "", isFunctionValue: true }
            }
        }
    }

    makeAxiomNode(t: Term): AbstractNodeProps {
        if ("label" in t && "args" in t) {
            const values: HoleProps[] = t.args.map(this.makeAxiomHole.bind(this))
            const color: Color = t.label
            return { values, color }
        } else {
            throw Error("The given term cannot be rendered as a node")
        }
    }

    makeAxiomGadget(a: Axiom): AbstractGadgetProps {
        const id: GadgetId = this.makeGadgetId()
        const inputs = a.hypotheses.map(this.makeAxiomNode.bind(this))
        const output = this.makeAxiomNode(a.conclusion)
        const connections: InternalConnection[] = []
        return { id, inputs, output, connections }
    }

    private makeTermWithFreshVariables(t: Term): Term {
        const assignment: Assignment = (v) => { return { variable: v + this.makeVariableId() } }
        return substitute(t, assignment)
    }

    getTermNumber(ref: TermReference): number {
        return 0
    }

    makeHole(ref: TermReference): HoleProps {
        const term = this.termUnififer.getTerm(ref)
        if ("variable" in term) {
            const value = this.termUnififer.getAssignedValue(term.variable)!
            if (!value) {
                return { value: "", isFunctionValue: false }
            } else {
                return { value: this.getTermNumber(value), isFunctionValue: false }
            }
        } else {
            if (term.args.length === 0) { // constant
                const value = Number(term.label)
                return { value, isFunctionValue: false }
            } else {
                return { value: "", isFunctionValue: true }
            }
        }
    }

    makeNode(ref: TermReference): AbstractNodeProps {
        const term = this.termUnififer.getTerm(ref)
        if ("label" in term && "args" in term) {
            const values: HoleProps[] = term.args.map(this.makeAxiomHole.bind(this))
            const color: Color = term.label
            return { values, color }
        } else {
            throw Error("The given term cannot be rendered as a node")
        }
    }

    makeGadget(a: Axiom): GadgetContainerProps {
        const id: GadgetId = this.makeGadgetId()
        const hypotheses = a.hypotheses.map(this.makeTermWithFreshVariables.bind(this))
        const conclusion = this.makeTermWithFreshVariables(a.conclusion)
        const inputTerms = hypotheses.map(this.termUnififer.addTerm.bind(this.termUnififer))
        const outputTerm = this.termUnififer.addTerm(conclusion)

        const inputs = inputTerms.map(this.makeNode.bind(this))
        const output = this.makeNode(outputTerm)
        const connections: InternalConnection[] = []
        const gadget: AbstractGadgetProps = { id, inputs, output, connections }
        return { gadget, inputs: inputTerms, output: outputTerm }
    }
}