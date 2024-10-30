import { CellPosition, OUTPUT_POSITION } from 'lib/game/CellPosition';
import { Axiom } from "./Primitives";
import { GadgetId } from "./Primitives";
import { GadgetProps } from "components/game/gadget/Gadget";
import { Term, makeAxiomWithFreshVariables } from "./Term";

export function getGadgetTerms(axiom: Axiom, id: GadgetId): Map<CellPosition, Term> {
    const axiomWithFreshVariables = makeAxiomWithFreshVariables(axiom, id)
    let terms = new Map<CellPosition, Term>()
    axiomWithFreshVariables.hypotheses.forEach((hypothesis, i) => {
        terms.set(i, hypothesis)
    })
    terms.set(OUTPUT_POSITION, axiomWithFreshVariables.conclusion)
    return terms
}

export function axiomToGadget(axiom: Axiom, id: GadgetId): GadgetProps {
    const terms = getGadgetTerms(axiom, id)
    return { terms, id, isOnShelf: false }
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
