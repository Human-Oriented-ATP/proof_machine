import { Axiom, NodePosition, outputPosition } from "./Primitives";
import { GadgetId, GadgetProps } from "./Primitives";
import { Term, makeAxiomWithFreshVariables as makeFreshVariables } from "./Term";

export function axiomToGadget(axiom: Axiom, id: GadgetId): GadgetProps {
    const axiomWithFreshVariables = makeFreshVariables(axiom, id)
    let terms = new Map<NodePosition, Term>()
    axiomWithFreshVariables.hypotheses.forEach((hypothesis, i) => {
        terms.set(i, hypothesis)
    })
    terms.set(outputPosition, axiomWithFreshVariables.conclusion)
    return { terms, id, isAxiom: false, displayHoleFocus: true }
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

function termToString(t: Term): string {
    if ("variable" in t) {
        return t.variable
    } else {
        if (t.args.length === 0) { // constant
            return t.label
        } else {
            return t.label + "(" + t.args.map(termToString).join(", ") + ")"
        }
    }
}

export function axiomToString(a: Axiom) {
    const hypotheses = a.hypotheses.map(termToString).join(", ")
    const conclustion = termToString(a.conclusion)
    return hypotheses + " :- " + conclustion
}
