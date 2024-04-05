import {
    AbstractNodeProps, Color, GadgetId, GadgetProps, HolePosition, HoleProps, HoleValue,
    InternalConnection
} from "./Primitives";
import { Term, hashTerm, getVariableList, VariableName } from "./Term";

export interface Axiom {
    hypotheses: Term[]
    conclusion: Term
}

function makeHole(assignment: HoleValueAssignment, term: Term): HoleProps {
    const value = assignment(term)
    if ("args" in term) {
        if (term.args.length !== 0) {
            return { value, isFunctionValue: true }
        }
    }
    return { value, isFunctionValue: false }
}

export function axiomAssignment(t: Term): HoleValue {
    if ("variable" in t) {
        return ""
    } else {
        if (t.args.length === 0) { // constant
            return Number(t.label)
        } else {
            return "?"
        }
    }
}

function makeNode(assignment: HoleValueAssignment, t: Term, isAxiom: boolean = false): AbstractNodeProps {
    if ("label" in t && "args" in t) {
        const values: HoleProps[] = t.args.map(t => makeHole(assignment, t))
        const color: Color = t.label
        if (isAxiom) {
            return { values, color }
        } else {
            return { values, color, term: t }
        }
    } else {
        throw Error("The given term cannot be rendered as a node")
    }
}

function makeAxiomNode(t: Term): AbstractNodeProps {
    return makeNode(axiomAssignment, t, true)
}

export function makeGoalGadgetFromTerm(term: Term): GadgetProps {
    const node = makeNode(axiomAssignment, term, false)
    return {
        inputs: [node],
        id: "goal_gadget",
        connections: []
    }
}

function getPositionsInTerm(v: VariableName, t: Term): number[] {
    if ("args" in t) {
        let positions: number[] = []
        for (let i = 0; i < t.args.length; i++) {
            const arg = t.args[i]
            if ("variable" in arg) {
                if (arg.variable === v) {
                    positions.push(i)
                }
            }
        }
        return positions
    } else {
        return []
    }
}

function getAllUniquePairs<T>(arr: T[]): [T, T][] {
    const pairs: [T, T][] = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            pairs.push([arr[i], arr[j]]);
        }
    }
    return pairs;
}

function toConnections(positions: [HolePosition, HolePosition][]): InternalConnection[] {
    const connections = positions.map(pos => {
        const [from, to] = pos
        return { from, to }
    })
    return connections
}

function makeConnectionsForVariable(inputs: Term[], output: Term, v: VariableName): InternalConnection[] {
    const positionsInInputsStructured: HolePosition[][] = inputs.map((term, indexOfTerm) =>
        getPositionsInTerm(v, term).map(variablePosition =>
            [indexOfTerm, variablePosition]))
    const positionsInOutput: HolePosition[] = getPositionsInTerm(v, output).map(variablePosition =>
        ["output", variablePosition])
    const positionsInInputs = positionsInInputsStructured.flat()
    if (positionsInOutput.length === 0) {
        return toConnections(getAllUniquePairs(positionsInInputs))
    } else if (positionsInInputs.length === 0) {
        return toConnections(getAllUniquePairs(positionsInOutput))
    } else {
        return (positionsInInputs.map(from =>
            positionsInOutput.map(to => { return { from, to } }))).flat()
    }
}

function makeConnections(input: Term[], output: Term): InternalConnection[] {
    const variableList = (input.concat(output)).map(getVariableList)
    const variableListDeduplicated = Array.from(new Set(variableList.flat()))
    const connections = variableListDeduplicated.map(v =>
        makeConnectionsForVariable(input, output, v))
    return connections.flat()
}

export function makeAxiomGadget(axiom: Axiom, id: GadgetId): GadgetProps {
    const inputs = axiom.hypotheses.map(makeAxiomNode)
    const output = makeAxiomNode(axiom.conclusion)
    const connections = makeConnections(axiom.hypotheses, axiom.conclusion)
    return { id, inputs, output, connections }
}

export type HoleValueAssignment = (t: Term) => HoleValue

export function makeGadgetFromTerms(inputTerms: Term[], outputTerm: Term, id: GadgetId,
    assignment: HoleValueAssignment): GadgetProps {
    const inputs = inputTerms.map(hyp => makeNode(assignment, hyp))
    const output = makeNode(assignment, outputTerm)
    const connections = makeConnections(inputTerms, outputTerm)
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