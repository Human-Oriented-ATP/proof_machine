import { hash } from "../util/Hash"
import { DisjointSetWithAssignment } from "../util/DisjointSetWithAssignment"

export type VariableName = string
export type FunctionName = string

export type Term =
    | { variable: VariableName }
    | { label: FunctionName, args: Term[] }

export function hashTerm(t: Term): number {
    return hash(JSON.stringify(t))
}

export function termHasVariable(term: Term, v: VariableName): boolean {
    if ("variable" in term) {
        return v === term.variable
    } else {
        const appearsInArg = term.args.map(arg => termHasVariable(arg, v))
        return appearsInArg.includes(true)
    }
}

export type TermAssignment = DisjointSetWithAssignment<VariableName, Term>

function substitute(t: Term, a: TermAssignment): Term {
    if ("variable" in t) {
        return a.getAssignedValue(t.variable)!
    } else {
        const argsSubstituted = t.args.map(term => substitute(term, a))
        return { label: t.label, args: argsSubstituted }
    }
}

export function getVariableList(t: Term): VariableName[] {
    if ("variable" in t) {
        return [t.variable]
    } else {
        let list: VariableName[] = []
        t.args.forEach(arg =>
            list = list.concat(getVariableList(arg))
        )
        return list
    }
}

function getVariableSet(t: Term): Set<VariableName> {
    return new Set(getVariableList(t))
}

export function makeTermWithFreshVariables(t: Term, prefix: string): Term {
    const assignment: TermAssignment = new DisjointSetWithAssignment()
    getVariableSet(t).forEach(variable =>
        assignment.assign(variable, { variable: prefix + "_" + variable })
    )
    return substitute(t, assignment)
}
