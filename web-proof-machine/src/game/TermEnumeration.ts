import { HoleValueAssignment } from "./GameLogic";
import { HoleValue } from "./Primitives";
import { Term, TermAssignment, hashTerm } from "./Term";

export type EnumerationMap = Map<Term, number>

export function getNextFreeHoleValue(offset: number, enumerationMap: EnumerationMap): number {
    const values = Array.from(enumerationMap.values());
    for (let i = offset; true; i++) {
        if (!values.includes(i)) {
            return i;
        }
    }
}

export function updateEnumeration(offset: number, immutablePreviousEnumeration: EnumerationMap,
    termAssignment: TermAssignment): EnumerationMap {
    let previousEnumeration = new Map(immutablePreviousEnumeration)
    const allAssignedTerms = termAssignment.getAssignedValues()
    for (const term of allAssignedTerms) {
        const hash = hashTerm(term)
        if (!(hash in previousEnumeration.keys())) {
            const value = getNextFreeHoleValue(offset, previousEnumeration)
            previousEnumeration.set(term, value)
        }
    }
    return previousEnumeration
}

function toHoleValue(t: Term, enumerationMap: EnumerationMap): HoleValue {
    if ("variable" in t) {
        throw Error("Cannot get hole value for a variable" + t)
    } else {
        if (t.args.length === 0) {
            const value = Number(t.label)
            return value
        } else {
            const lookup = enumerationMap.get(t)
            if (lookup) {
                return lookup
            } else {
                return "?"
            }
        }
    }
}

export function getHoleValueAssignment(enumerationMap: EnumerationMap, termAssignment: TermAssignment):
    HoleValueAssignment {
    return (t => {
        if ("variable" in t) {
            const term = termAssignment.getAssignedValue(t.variable)
            if (term) {
                return toHoleValue(term, enumerationMap)
            } else {
                return ""
            }
        } else {
            return toHoleValue(t, enumerationMap)
        }
    })
}
