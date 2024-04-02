import { AbstractNodeProps, Color, GadgetId, GadgetProps, HoleProps, HoleValue, InternalConnection } from "./Primitives";
import { Term, Assignment, hashTerm } from "./Term";

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

function makeAxiomHole(t: Term): HoleProps {
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

function makeAxiomNode(t: Term): AbstractNodeProps {
    if ("label" in t && "args" in t) {
        const values: HoleProps[] = t.args.map(makeAxiomHole)
        const color: Color = t.label
        return { values, color }
    } else {
        throw Error("The given term cannot be rendered as a node")
    }
}

export function makeAxiomGadget(a: Axiom, id: GadgetId): GadgetProps {
    const inputs = a.hypotheses.map(makeAxiomNode)
    const output = makeAxiomNode(a.conclusion)
    const connections: InternalConnection[] = []
    return { id, inputs, output, connections }
}

function getTermNumber(term: Term): HoleValue {
    if ("label" in term && term.args.length === 0) {
        return Number(term.label)
    } else {
        return "x"
    }
}

function makeHole(assignment: Assignment, term: Term): HoleProps {
    if ("variable" in term) {
        const value = assignment.getAssignedValue(term.variable)!
        if (!value) {
            return { value: "", isFunctionValue: false }
        } else {
            return { value: getTermNumber(value), isFunctionValue: false }
        }
    } else {
        if (term.args.length === 0) { // constant
            const value = Number(term.label)
            return { value, isFunctionValue: false }
        } else {
            return { value: "x", isFunctionValue: true }
        }
    }
}

function makeNode(assignment: Assignment, term: Term): AbstractNodeProps {
    if ("label" in term && "args" in term) {
        const values: HoleProps[] = term.args.map(t => makeHole(assignment, t))
        const color: Color = term.label
        return { values, color, term }
    } else {
        throw Error("The given term cannot be rendered as a node")
    }
}

export function makeGadgetFromTerms(inputTerms: Term[], outputTerm: Term, id: GadgetId, assignment: Assignment) {
    const inputs = inputTerms.map(hyp => makeNode(assignment, hyp))
    const output = makeNode(assignment, outputTerm)
    const connections: InternalConnection[] = []
    return { id, inputs, output, connections }
}

export function handleIdFromTerm(t: Term): string {
    return "handle_" + hashTerm(t)
}

export function getTermOfHandle(handleId: string, gadgetTerms: Term[]) {
    for (let i = 0; i < gadgetTerms.length; i++) {
        if (handleIdFromTerm(gadgetTerms[i]) === handleId) {
            return gadgetTerms[i]
        }
    }
    throw Error("Term not found for handle " + handleId)
}