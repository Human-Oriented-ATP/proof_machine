import { Term, VariableName, getVariableList } from "./Term";

export type NodePosition = number | "output"
export type HolePosition = [NodePosition, number]

export interface InternalConnection {
    from: HolePosition
    to: HolePosition
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

export function makeConnections(inputs: Term[], output: Term): InternalConnection[] {
    const variableList = (inputs.concat(output)).map(getVariableList)
    const variableListDeduplicated = Array.from(new Set(variableList.flat()))
    const connections = variableListDeduplicated.map(v =>
        makeConnectionsForVariable(inputs, output, v))
    return connections.flat()
}
