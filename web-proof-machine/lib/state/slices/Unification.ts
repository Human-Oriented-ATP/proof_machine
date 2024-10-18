import { GadgetConnection, historySlice, HistorySlice, HistoryState } from "./History";
import { GetState, SetState } from "../Types";
import { Equation, unifyEquations } from "lib/game/Unification";
import { Term } from "lib/game/Term";
import { ValueMap } from "lib/util/ValueMap";
import { enumerateTerms, isNumericalConstant, toHoleValue } from "lib/game/TermEnumeration";

export type UnificationState = {
    termEnumeration: ValueMap<Term, string>
}

export type UnificationActions = {
    runUnification: () => ValueMap<GadgetConnection, boolean>
}

export type UnificationSlice = HistorySlice & UnificationState & UnificationActions

export const unificationSlice = (set: SetState<UnificationSlice>, get: GetState<UnificationSlice>): UnificationSlice => {
    return {
        ...historySlice(set, get),
        termEnumeration: new ValueMap<Term, string>(),

        runUnification: () => {
            const equations = get().getCurrentEquations()
            console.log("equations", equations)
            const { assignment, equationIsSatisfied } = unifyEquations<GadgetConnection>(equations)
            const terms: Term[] = equations.values().flatMap((eq: Equation) => [eq[0], eq[1]])
            const holeTerms = terms.flatMap((term => {
                if ("variable" in term) {
                    return []
                } else {
                    return term.args
                }
            }))
            const newTermEnumeration = new ValueMap<Term, string>()
            for (const term of holeTerms) {
                newTermEnumeration.set(term, toHoleValue(term, assignment))
            }
            console.log(holeTerms)
            console.log("newTermEnumeration", newTermEnumeration)
            set({ termEnumeration: newTermEnumeration })
            return equationIsSatisfied
        }
    }
}