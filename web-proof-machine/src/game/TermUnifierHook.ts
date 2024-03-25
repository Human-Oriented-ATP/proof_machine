import { useState } from "react";
import { TermUnifier } from "./TermUnifier";
import { Term, TermReference } from "./TermIndex";
import { HoleValue } from "./Primitives";

export function useTermUnifier(): any {
    const [termUnifier, _] = useState(new TermUnifier())

    function getValue(ref: TermReference): HoleValue {
        return ""
    }

    return [getValue,
        termUnifier.addTerm.bind(termUnifier),
        termUnifier.addEquation.bind(termUnifier),
        termUnifier.removeEquation.bind(termUnifier)]
    // eventually add something for removing terms
}