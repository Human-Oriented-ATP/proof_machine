import { useState } from "react";
import { TermUnifier } from "./TermUnifier";
import { Term, TermReference } from "./TermIndex";
import { HoleValue } from "./Primitives";

export function useTermUnifier(): any {
    const [termUnifier, _] = useState(new TermUnifier())

    function getArgValue(t: Term): HoleValue {
        if ("variable" in t) { // only the easy case so far: term is a constant
            const termRef = termUnifier.getAssignedValue(t.variable)!
            const term = termUnifier.getTerm(termRef)
            if ("label" in term && term.args.length === 0) {
                return Number(term.label)
            } else {
                return "x"
            }
        } else {
            if (t.args.length === 0) {
                return Number(t.label)
            } else { // difficult case
                return "x"
            }
        }
    }

    function getTermValues(ref: TermReference): HoleValue[] {
        const term = termUnifier.getTerm(ref)
        if ("args" in term) {
            return term.args.map(arg => getArgValue(arg))
        } else {
            throw Error("Invalid term reference for node: " + ref)
        }
    }

    return [getTermValues,
        termUnifier.isSatisfied.bind(termUnifier),
        termUnifier.addTerm.bind(termUnifier),
        termUnifier.removeTerm.bind(termUnifier),
        termUnifier.addEquation.bind(termUnifier),
        termUnifier.removeEquation.bind(termUnifier)]
}