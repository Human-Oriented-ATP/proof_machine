import { Axiom } from "./Primitives";
import { GadgetId, GadgetProps } from "./Primitives";
import { Term, hashTerm, makeAxiomWithFreshVariables } from "./Term";

export function axiomToGadget(axiom: Axiom, id: GadgetId): GadgetProps {
    const axiomWithFreshVariables = makeAxiomWithFreshVariables(axiom, id)
    return { inputs: axiomWithFreshVariables.hypotheses, output: axiomWithFreshVariables.conclusion, id }
}

export function axiomTermEnumeration(t: Term): string {
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