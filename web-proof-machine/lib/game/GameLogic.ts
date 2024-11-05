import { CellPosition, OUTPUT_POSITION } from 'lib/game/CellPosition';
import { Axiom } from "./Primitives";
import { GadgetId } from "./Primitives";
import { GadgetProps } from "components/game/gadget/Gadget";
import { Term, makeAxiomWithFreshVariables } from "./Term";
import { parseStatement } from 'lib/parsing/Semantics';

export function getGadgetTerms(statement: string, id: GadgetId): Map<CellPosition, Term> {
    const parsed = parseStatement(statement)
    if ("axiom" in parsed) {
        const axiomWithFreshVariables = makeAxiomWithFreshVariables(parsed.axiom, id)
        let terms = new Map<CellPosition, Term>()
        axiomWithFreshVariables.hypotheses.forEach((hypothesis, i) => {
            terms.set(i, hypothesis)
        })
        terms.set(OUTPUT_POSITION, axiomWithFreshVariables.conclusion)
        return terms
    } else {
        return new Map<CellPosition, Term>([[0, parsed.goal]])
    }
}


export function axiomToGadget(axiom: string, id: GadgetId): GadgetProps {
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
    return `${conclusion}:-${hypotheses}`
}

export function goalToString(term: Term) {
    return `:-${termToString(term)}`
}