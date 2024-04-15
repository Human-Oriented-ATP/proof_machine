import { DisjointSetWithAssignment } from "../util/DisjointSetWithAssignment";
import { Axiom } from "./Primitives";
import { InitializationData } from "./Initialization";
import { Term, Assignment, getVariableSet, hashTerm, substitute } from "./Term";

function isConstant(t: Term) {
    return "label" in t && t.args.length === 0
}

function isNumericalConstant(t: Term): number | undefined {
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

function getNumericalConstantsInTerm(t: Term): number[] {
    const n = isNumericalConstant(t)
    if (n === undefined) {
        if ("variable" in t) {
            return [];
        } else {
            return t.args.flatMap(getNumericalConstantsInTerm);
        }
    } else {
        return [n];
    }
}

function getNumericalConstantsInAxiom(axiom: Axiom): number[] {
    return axiom.hypotheses.flatMap(getNumericalConstantsInTerm)
        .concat(getNumericalConstantsInTerm(axiom.conclusion));
}

export function getNumericalConstantsInProblemState(ps: InitializationData): number[] {
    return ps.axioms.flatMap(getNumericalConstantsInAxiom)
        .concat(getNumericalConstantsInTerm(ps.goal));
}

export function getMaximumNumberInGameData(data: InitializationData): number {
    return 1 + Math.max(...getNumericalConstantsInProblemState(data))
}

function renameVariablesToEmptyString(t: Term): Term {
    const assignment: Assignment = new DisjointSetWithAssignment()
    getVariableSet(t).forEach(variable =>
        assignment.assign(variable, { variable: "" })
    )
    return substitute(t, assignment)
}

function assignTermRecursively(t: Term, assignment: Assignment): Term {
    if ("variable" in t) {
        const assignedValue = assignment.getAssignedValue(t.variable)
        if (assignedValue) {
            return assignTermRecursively(assignedValue, assignment)
        } else {
            return t
        }
    } else {
        const argsAssigned: Term[] = t.args.map(arg => assignTermRecursively(arg, assignment))
        return { label: t.label, args: argsAssigned }
    }
}

function removeConstants(terms: Term[]): Term[] {
    return terms.filter(term => !isConstant(term))
}

export type TermEnumeration = (t: Term) => string

export class TermEnumerator {
    private enumeration: Map<number, number>
    private offset: number

    constructor(offset: number) {
        this.offset = offset
        this.enumeration = new Map()
    }

    private getIdentifier(t: Term): number {
        const term = renameVariablesToEmptyString(t)
        const identifier = hashTerm(term)
        return identifier
    }

    private insert(t: Term, value: number) {
        const identifier = this.getIdentifier(t)
        this.enumeration.set(identifier, value)
    }

    private isEnumerated(t: Term): boolean {
        const identifier = this.getIdentifier(t);
        return this.enumeration.has(identifier);
    }

    private getNumber(t: Term): number {
        const identifier = this.getIdentifier(t)
        return this.enumeration.get(identifier)!
    }

    private getNextFreeHoleValue(): number {
        const assignedValuesSet = new Set(this.enumeration.values());
        for (let i = this.offset; ; i++) {
            if (!assignedValuesSet.has(i)) {
                return i;
            }
        }
    }

    private removeSuperfluousTerms(terms: Term[]) {
        const identifiers = terms.map(this.getIdentifier)
        for (const identifier of this.enumeration.keys()) {
            if (!identifiers.includes(identifier)) {
                this.enumeration.delete(identifier)
            }
        }
    }

    private enumerateTerms(terms: Term[]) {
        for (const term of terms) {
            const value = this.getNextFreeHoleValue()
            this.insert(term, value)
        }
    }

    private enumerateNewTerms(terms: Term[]) {
        const newTerms = terms.filter(term => !this.isEnumerated(term))
        this.enumerateTerms(newTerms)
    }

    updateEnumeration(termAssignment: Assignment) {
        const termsInAssignment = termAssignment.getAssignedValues()
        const termsWithoutConstants = removeConstants(termsInAssignment)
        const fullyAssignedTerms = termsWithoutConstants.map(term =>
            assignTermRecursively(term, termAssignment))
        this.removeSuperfluousTerms(fullyAssignedTerms)
        this.enumerateNewTerms(fullyAssignedTerms)
    }

    private toHoleValue(t: Term, termAssignment: Assignment): string {
        const fullyAssignedTerm = assignTermRecursively(t, termAssignment)
        if ("variable" in fullyAssignedTerm) {
            throw Error("Cannot get hole value for a variable" + fullyAssignedTerm)
        } else {
            if (fullyAssignedTerm.args.length === 0) {
                return fullyAssignedTerm.label
            } else {
                const value = this.getNumber(fullyAssignedTerm)
                if (value) {
                    return value.toString()
                } else {
                    return "?"
                }
            }
        }
    }

    getHoleValueAssignment(termAssignment: Assignment): TermEnumeration {
        return (t => {
            if ("variable" in t) {
                const term = termAssignment.getAssignedValue(t.variable)
                if (term) {
                    return this.toHoleValue(term, termAssignment)
                } else {
                    return ""
                }
            } else {
                return this.toHoleValue(t, termAssignment)
            }
        })
    }
}