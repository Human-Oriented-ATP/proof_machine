import { DisjointSetWithAssignment } from "../util/DisjointSetWithAssignment"
import { Axiom } from "./Primitives"

export type VariableName = string
export type FunctionName = string

export type Term =
    | { variable: VariableName }
    | { label: FunctionName, args: Term[] }

export function isFunctionTerm(t: Term): t is { label: string; args: Term[]; } {
    return "label" in t && t.args.length > 0;
}

export function occursInNaive(v: VariableName, term: Term): boolean {
    if ("variable" in term) {
        return v === term.variable
    } else {
        const appearsInArg = term.args.map(arg => occursInNaive(v, arg))
        return appearsInArg.includes(true)
    }
}

export function replaceWithRepresentatives(t: Term, assignment: Assignment): Term {
    if ("variable" in t) {
        return { variable: assignment.findRepresentative(t.variable) }
    } else {
        return { label: t.label, args: t.args.map(arg => replaceWithRepresentatives(arg, assignment)) }
    }
}

export function occursIn(v: VariableName, term: Term, assignment: Assignment): boolean {
    const vRepresentative = assignment.findRepresentative(v)
    const termWithRepresentatives = replaceWithRepresentatives(term, assignment)
    return occursInNaive(vRepresentative, termWithRepresentatives)
}

export type Assignment = DisjointSetWithAssignment<VariableName, Term>

export function substitute(t: Term, a: Assignment): Term {
    if ("variable" in t) {
        const assigned = a.getAssignedValue(t.variable)
        return assigned ?? t
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

export function getVariableSet(t: Term): Set<VariableName> {
    return new Set(getVariableList(t))
}

export function assignTermDeeply(t: Term, assignment: Assignment): Term {
    if ("variable" in t) {
        const assignedValue = assignment.getAssignedValue(t.variable);
        if (assignedValue) {
            if (occursIn(t.variable, assignedValue, assignment)) {
                throw Error("Attempting to deeply assign the variables in a term in a cyclic way")
            } else {
                return assignTermDeeply(assignedValue, assignment);
            }
        } else {
            return t
        }
    } else {
        const argsAssigned: Term[] = t.args.map(arg => assignTermDeeply(arg, assignment));
        return { label: t.label, args: argsAssigned };
    }
}

export function makeTermWithFreshVariables(t: Term, prefix: string): Term {
    const assignment: Assignment = new DisjointSetWithAssignment()
    getVariableSet(t).forEach(variable =>
        assignment.assign(variable, { variable: prefix + "_" + variable })
    )
    return substitute(t, assignment)
}

export function makeAxiomWithFreshVariables(axiom: Axiom, prefix: string): Axiom {
    const hypotheses = axiom.hypotheses.map(h => makeTermWithFreshVariables(h, prefix))
    const conclusion = makeTermWithFreshVariables(axiom.conclusion, prefix)
    return { hypotheses, conclusion }
}

export function labelsMatch(term1: Term, term2: Term): boolean {
    if ("label" in term1 && "label" in term2) {
        return term1.label === term2.label;
    }
    return false;
}

export function aritiesMatch(term1: Term, term2: Term): boolean {
    if ("args" in term1 && "args" in term2) {
        return term1.args.length === term2.args.length;
    }
    return false;
}

export function isNumericalConstant(t: Term): number | undefined {
    if ("variable" in t) {
        return undefined;
    } else {
        if (isNaN(Number(t.label)) || t.args.length > 0) {
            return undefined;
        } else {
            return Number(t.label);
        }
    }
}
