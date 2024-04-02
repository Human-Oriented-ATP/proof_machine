import { useState } from "react";
import { TermUnifier } from "./TermUnifier";
import { Term, TermReference } from "./TermIndex";
import { HoleProps } from "./Primitives";

export function useTermUnifier(): any {
    const [termUnifier, _] = useState(new TermUnifier())

    function getHoleProps(t: Term): HoleProps {
        if ("variable" in t) { // only the easy case so far: term is a constant
            const termRef = termUnifier.getAssignedValue(t.variable)!
            const term = termUnifier.getTerm(termRef)
            if ("label" in term && term.args.length === 0) {
                return { value: Number(term.label), isFunctionValue: false }
            } else {
                return { value: "x", isFunctionValue: false }
            }
        } else {
            if (t.args.length === 0) {
                return { value: Number(t.label), isFunctionValue: false }
            } else { // difficult case
                return { value: "x", isFunctionValue: false }
            }
        }
    }

    function getAllHoleProps(ref: TermReference): HoleProps[] {
        const term = termUnifier.getTerm(ref)
        if ("args" in term) {
            return term.args.map(arg => getHoleProps(arg))
        } else {
            throw Error("Invalid term reference for node: " + ref)
        }
    }

    return [getAllHoleProps,
        termUnifier.isSatisfied.bind(termUnifier),
        termUnifier.addTerm.bind(termUnifier),
        termUnifier.removeTerm.bind(termUnifier),
        termUnifier.addEquation.bind(termUnifier),
        termUnifier.removeEquation.bind(termUnifier)]
}