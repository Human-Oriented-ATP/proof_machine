import { Axiom, NodePosition, OUTPUT_POSITION } from "./Primitives";
import { GadgetId, GadgetProps } from "./Primitives";
import { Term, makeAxiomWithFreshVariables as makeFreshVariables } from "./Term";

export function getGadgetTerms(axiom: Axiom, id: GadgetId): Map<NodePosition, Term> {
    const axiomWithFreshVariables = makeFreshVariables(axiom, id)
    let terms = new Map<NodePosition, Term>()
    axiomWithFreshVariables.hypotheses.forEach((hypothesis, i) => {
        terms.set(i, hypothesis)
    })
    terms.set(OUTPUT_POSITION, axiomWithFreshVariables.conclusion)
    return terms
}

export function axiomToGadget(axiom: Axiom, id: GadgetId): GadgetProps {
    const terms = getGadgetTerms(axiom, id)
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
    const hypotheses = a.hypotheses.map(termToString).join(",")
    const conclusion = termToString(a.conclusion)
    if (hypotheses === "") {
        return conclusion
    }
    return conclusion + ":-" + hypotheses
}
