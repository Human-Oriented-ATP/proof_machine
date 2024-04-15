import {
    AbstractNodeProps, GadgetId, GadgetProps, HoleProps,
} from "./Primitives";
import { Term, hashTerm, VariableName } from "./Term";

export interface Axiom {
    hypotheses: Term[]
    conclusion: Term
}

export function axiomToGadget(axiom: Axiom, id : GadgetId): GadgetProps {
    return { inputs: axiom.hypotheses, output: axiom.conclusion, id }
} 

export function axiomAssignment(t: Term): string {
    if ("variable" in t) {
        return ""
    } else {
        if (t.args.length === 0) { // constant
            return t.label
        } else {
            return "?"
        }
    }
}

export type HoleValueAssignment = (t: Term) => string

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