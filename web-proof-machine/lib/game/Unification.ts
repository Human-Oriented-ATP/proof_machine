import { DisjointSetWithAssignment } from "../util/DisjointSetWithAssignment";
import { Term, Assignment, VariableName, occursIn } from "./Term";

export type EquationId = string
export type Equation = [Term, Term]

export interface UnificationResult {
    assignment: Assignment
    equationIsSatisfied: Map<EquationId, boolean>
}

function unifyVariable(currentAssignment: Assignment, v: VariableName, term: Term): boolean {
    if (currentAssignment.isAssigned(v)) {
        const value = currentAssignment.getAssignedValue(v)!
        return unifyEquation(currentAssignment, [value, term])
    } else {
        if (occursIn(v, term)) {
            if ("variable" in term) {
                return true
            } else {
                return false
            }
        }
        currentAssignment.assign(v, term)
        return true
    }
}

function unifyVariables(currentAssignment: Assignment, v1: VariableName, v2: VariableName): boolean {
    if (currentAssignment.isAssigned(v1)) {
        const v1Value = currentAssignment.getAssignedValue(v1)!
        if (currentAssignment.isAssigned(v2)) {
            const v2Value = currentAssignment.getAssignedValue(v2)!
            return unifyEquation(currentAssignment, [v1Value, v2Value])
        } else {
            return unifyEquation(currentAssignment, [v1Value, { variable: v2 }])
        }
    } else {
        if (currentAssignment.isAssigned(v2)) {
            const v2Value = currentAssignment.getAssignedValue(v2)!
            return unifyEquation(currentAssignment, [{ variable: v1 }, v2Value])
        } else {
            currentAssignment.unite(v1, v2)
            return true
        }
    }
}

function unifyEquation(currentAssignment: Assignment, equation: Equation): boolean {
    const [lhs, rhs] = equation
    if ("variable" in lhs) {
        if ("variable" in rhs) {
            return unifyVariables(currentAssignment, lhs.variable, rhs.variable)
        } else {
            return unifyVariable(currentAssignment, lhs.variable, rhs)
        }
    } else {
        if ("variable" in rhs) {
            return unifyVariable(currentAssignment, rhs.variable, lhs)
        } else {
            if (lhs.label !== rhs.label) {
                return false
            }
            if (lhs.args.length !== rhs.args.length) {
                return false
            }
            let unifiedSuccessfully: boolean[] = []
            for (let i = 0; i < lhs.args.length; i++) {
                const lhsArg = lhs.args[i]
                const rhsArg = rhs.args[i]
                unifiedSuccessfully.push(unifyEquation(currentAssignment, [lhsArg, rhsArg]))
            }
            return (!unifiedSuccessfully.includes(false))
        }
    }
}

export function unifyEquations(equations: Map<EquationId, Equation>): UnificationResult {
    const equationIsSatisfied = new Map()
    const assignment: Assignment = new DisjointSetWithAssignment()
    equations.forEach((equation, key) => {
        const unifiedSuccessfully = unifyEquation(assignment, equation)
        equationIsSatisfied.set(key, unifiedSuccessfully)
    })
    return { assignment, equationIsSatisfied }
}