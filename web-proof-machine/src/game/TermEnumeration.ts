import { DisjointSetWithAssignment } from "../util/DisjointSetWithAssignment";
import { HoleValueAssignment } from "./GameLogic";
import { HoleValue } from "./Primitives";
import { Term, TermAssignment, getVariableSet, substitute } from "./Term";

function isConstant(t: Term) {
    return "label" in t && t.args.length === 0
}

function renameVariablesToEmptyString(t: Term): Term {
    const assignment: TermAssignment = new DisjointSetWithAssignment()
    getVariableSet(t).forEach(variable =>
        assignment.assign(variable, { variable: "" })
    )
    return substitute(t, assignment)
}

function equalUpToVariableNames(t1: Term, t2: Term): boolean {
    const t1WithVariablesRenamed = renameVariablesToEmptyString(t1)
    const t2WithVariablesRenamed = renameVariablesToEmptyString(t2)
    return JSON.stringify(t1WithVariablesRenamed) === JSON.stringify(t2WithVariablesRenamed)
}

export class TermEnumeration {
    private enumeration: Map<Term, number>
    private offset: number

    constructor(offset = 100) {
        this.offset = offset
        this.enumeration = new Map()
    }

    private getNextFreeHoleValue(): number {
        const assignedValues = Array.from(this.enumeration.values());
        for (let i = this.offset; true; i++) {
            if (!assignedValues.includes(i)) {
                return i;
            }
        }
    }

    private appearsIn(t: Term): boolean {
        for (const enumeratedTerm of this.enumeration.keys()) {
            if (equalUpToVariableNames(enumeratedTerm, t)) {
                return true
            }
        }
        return false
    }

    updateEnumeration(termAssignment: TermAssignment) {
        const allAssignedTerms = termAssignment.getAssignedValues()
        for (const term of allAssignedTerms) {
            if (isConstant(term) || this.appearsIn(term)) {
                continue
            }
            const value = this.getNextFreeHoleValue()
            this.enumeration.set(term, value)
        }
    }

    private toHoleValue(t: Term): HoleValue {
        if ("variable" in t) {
            throw Error("Cannot get hole value for a variable" + t)
        } else {
            if (t.args.length === 0) {
                const value = Number(t.label)
                return value
            } else {
                const lookup = this.enumeration.get(t)
                if (lookup) {
                    return lookup
                } else {
                    return "?"
                }
            }
        }
    }

    getHoleValueAssignment(termAssignment: TermAssignment):
        HoleValueAssignment {
        return (t => {
            if ("variable" in t) {
                const term = termAssignment.getAssignedValue(t.variable)
                if (term) {
                    return this.toHoleValue(term)
                } else {
                    return ""
                }
            } else {
                return this.toHoleValue(t)
            }
        })
    }
}
