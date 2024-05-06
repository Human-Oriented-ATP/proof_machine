import { Axiom, NodePosition, outputPosition } from "./Primitives";
import { GadgetId, GadgetProps } from "./Primitives";
import { Term, makeAxiomWithFreshVariables } from "./Term";

export function axiomToGadget(axiom: Axiom, id: GadgetId): GadgetProps {
    const axiomWithFreshVariables = makeAxiomWithFreshVariables(axiom, id)
    let terms = new Map<NodePosition, Term>()
    axiomWithFreshVariables.hypotheses.forEach((hypothesis, i) => {
        terms.set(i, hypothesis)
    })
    terms.set(outputPosition, axiomWithFreshVariables.conclusion)
    return { terms, id, isAxiom: false }
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
