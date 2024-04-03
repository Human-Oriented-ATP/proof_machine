import { DisjointSetWithAssignment } from "../util/DisjointSetWithAssignment";
import { Term, TermAssignment, VariableName, termHasVariable } from "./Term";

export type Equation = [Term, Term]

function unifyVariable(currentAssignment: TermAssignment, v: VariableName, term: Term): boolean {
    if (currentAssignment.isAssigned(v)) {
        const value = currentAssignment.getAssignedValue(v)!
        return unifyEquation(currentAssignment, [value, term])
    } else {
        if (termHasVariable(term, v)) {
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

function unifyEquation(currentAssignment: TermAssignment, equation: Equation): boolean {
    const [lhs, rhs] = equation
    if ("variable" in lhs) {
        if ("variable" in rhs) {
            currentAssignment.unite(lhs.variable, rhs.variable)
            return true
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
            let unifiedSuccessfully = []
            for (let i = 0; i < lhs.args.length; i++) {
                const lhsArg = lhs.args[i]
                const rhsArg = rhs.args[i]
                unifiedSuccessfully.push(unifyEquation(currentAssignment, [lhsArg, rhsArg]))
            }
            return (!unifiedSuccessfully.includes(false))
        }
    }
}

export function unifyEquations(equations: Equation[]): [TermAssignment, Map<Equation, boolean>] {
    const equationIsSatisfied = new Map()
    const assignment: TermAssignment = new DisjointSetWithAssignment()
    for (let i = 0; i < equations.length; i++) {
        const equation = equations[i]
        const unifiedSuccessfully = unifyEquation(assignment, equation)
        equationIsSatisfied.set(equation, unifiedSuccessfully)
    }
    return [assignment, equationIsSatisfied]
}