import { GadgetConnection, historySlice, HistorySlice, HistoryState } from "./History";
import { CreateStateWithInitialValue, GetState, SetState } from "../Types";
import { Equation, unifyEquations } from "lib/game/Unification";
import { Term } from "lib/game/Term";
import { ValueMap } from "lib/util/ValueMap";
import { toHoleValue } from "lib/game/TermEnumeration";

export type UnificationState = HistoryState & {
    termEnumeration: ValueMap<Term, string>
    equationIsSatisfied: ValueMap<GadgetConnection, boolean>
}

export type UnificationActions = {
    runUnification: () => ValueMap<GadgetConnection, boolean>
}

export type UnificationSlice = HistorySlice & UnificationState & UnificationActions

export const unificationSlice: CreateStateWithInitialValue<UnificationState, UnificationSlice> = (initialState, set, get): UnificationSlice => {
    return {
        ...historySlice(initialState, set, get),
        termEnumeration: new ValueMap<Term, string>(),
        equationIsSatisfied: new ValueMap<GadgetConnection, boolean>(),

        runUnification: () => {
            const equations = get().getCurrentEquations()
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
            set({ equationIsSatisfied: equationIsSatisfied, termEnumeration: newTermEnumeration })
            return equationIsSatisfied
        }
    }
}