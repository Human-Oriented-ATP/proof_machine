import { DisjointSetWithAssignment } from "../util/DisjointSetWithAssignment";
import { Axiom } from "./Primitives";
import { InitializationData, isGoal } from "./Initialization";
import { Assignment, assignTermDeeply, getVariableSet, substitute, Term } from "./Term";
import { ValueMap } from "lib/util/ValueMap";

function isConstant(t: Term): t is { label: string, args: [] } {
    return "label" in t && t.args.length === 0
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

export function getNumericalConstantsInInitializationData(initData: InitializationData): number[] {
    // const initialDiagramGadgets = Array.from(initData.initialDiagram.gadgets.values())
    // const initialDiagramStatements = initialDiagramGadgets.map(gadget => gadget.statement)
    // const numericalConstantsInInitialDiagram = initialDiagramStatements.flatMap(statement => {
    //     if (isGoal(statement)) {
    //         return getNumericalConstantsInTerm(statement.goal)
    //     } else {
    //         return getNumericalConstantsInAxiom(statement.axiom)
    //     }
    // })
    // const numericalConstantsInAxioms = initData.axioms.flatMap(getNumericalConstantsInAxiom)
    return [] //numericalConstantsInAxioms.concat(numericalConstantsInInitialDiagram);
}

export function getMaximumNumberInGameData(data: InitializationData): number {
    const maximalExistingNumber = Math.max(...getNumericalConstantsInInitializationData(data))
    if (maximalExistingNumber === -Infinity) {
        return 0
    } else {
        return 1 + maximalExistingNumber
    }
}

function renameVariablesToEmptyString(t: Term): Term {
    const assignment: Assignment = new DisjointSetWithAssignment()
    getVariableSet(t).forEach(variable =>
        assignment.assign(variable, { variable: "" })
    )
    return substitute(t, assignment)
}

function removeConstants(terms: Term[]): Term[] {
    return terms.filter(term => !isConstant(term))
}

export type TermEnumeration = ValueMap<Term, string>

export function toHoleValue(t: Term, termAssignment: Assignment): string {
    // maybe unnecessary
    const fullyAssignedTerm = assignTermDeeply(t, termAssignment)
    if ("variable" in fullyAssignedTerm) {
        const value = termAssignment.getAssignedValue(fullyAssignedTerm.variable)
        if (value) {
            return toHoleValue(value, termAssignment)
        } else {
            return ""
        }
    } else {
        if (fullyAssignedTerm.args.length === 0) {
            return fullyAssignedTerm.label
        } else {
            return "-?-"
        }
    }
}

export function enumerateTerms(terms: Term[], assignment: Assignment, previousEnumeration: TermEnumeration, offset: number): TermEnumeration {
    const termEnumeration = new ValueMap<Term, string>()
    for (const term of terms) {
        termEnumeration.set(term, toHoleValue(term, assignment))
    }
    return termEnumeration
}
export function getAssignedValue(term: Term, termEnumeration: TermEnumeration): string {
    const c = isNumericalConstant(term)
    if (c) {
        return c.toString()
    } else {
        const value = termEnumeration.get(term)
        return value ?? ""
    }
}

// class TermEnumerator {
//     private enumeration: Map<number, number>
//     private offset: number

//     constructor(offset: number) {
//         this.offset = offset
//         this.enumeration = new Map()
//     }

//     private getIdentifier(t: Term): number {
//         const term = renameVariablesToEmptyString(t)
//         const identifier = hashTerm(term)
//         return identifier
//     }

//     private insert(t: Term, value: number) {
//         const identifier = this.getIdentifier(t)
//         this.enumeration.set(identifier, value)
//     }

//     private isEnumerated(t: Term): boolean {
//         const identifier = this.getIdentifier(t);
//         return this.enumeration.has(identifier);
//     }

//     private getNumber(t: Term): number {
//         const identifier = this.getIdentifier(t)
//         return this.enumeration.get(identifier)!
//     }

//     private getNextFreeHoleValue(): number {
//         const assignedValuesSet = new Set(this.enumeration.values());
//         for (let i = this.offset; ; i++) {
//             if (!assignedValuesSet.has(i)) {
//                 return i;
//             }
//         }
//     }

//     private removeSuperfluousTerms(terms: Term[]) {
//         const identifiers = terms.map(this.getIdentifier)
//         for (const identifier of this.enumeration.keys()) {
//             if (!identifiers.includes(identifier)) {
//                 this.enumeration.delete(identifier)
//             }
//         }
//     }

//     private enumerateTerms(terms: Term[]) {
//         for (const term of terms) {
//             const value = this.getNextFreeHoleValue()
//             this.insert(term, value)
//         }
//     }

//     private enumerateNewTerms(terms: Term[]) {
//         const newTerms = terms.filter(term => !this.isEnumerated(term))
//         this.enumerateTerms(newTerms)
//     }

//     updateEnumeration(termAssignment: Assignment) {
//         const termsInAssignment = termAssignment.getAssignedValues()
//         const termsWithoutConstants = removeConstants(termsInAssignment)
//         const fullyAssignedTerms = termsWithoutConstants.map(term =>
//             assignTermDeeply(term, termAssignment))
//         this.removeSuperfluousTerms(fullyAssignedTerms)
//         this.enumerateNewTerms(fullyAssignedTerms)
//     }

//     private toHoleValue(t: Term, termAssignment: Assignment): string {
//         const fullyAssignedTerm = assignTermDeeply(t, termAssignment)
//         if ("variable" in fullyAssignedTerm) {
//             throw Error("Cannot get hole value for a variable" + fullyAssignedTerm)
//         } else {
//             if (fullyAssignedTerm.args.length === 0) {
//                 return fullyAssignedTerm.label
//             } else {
//                 const value = this.getNumber(fullyAssignedTerm)
//                 if (value) {
//                     return value.toString()
//                 } else {
//                     return "?"
//                 }
//             }
//         }
//     }

//     getHoleValueAssignment(termAssignment: Assignment): TermEnumeration {
//         return (t => {
//             if ("variable" in t) {
//                 const term = termAssignment.getAssignedValue(t.variable)
//                 if (term) {
//                     return this.toHoleValue(term, termAssignment)
//                 } else {
//                     return ""
//                 }
//             } else {
//                 return this.toHoleValue(t, termAssignment)
//             }
//         })
//     }
// }