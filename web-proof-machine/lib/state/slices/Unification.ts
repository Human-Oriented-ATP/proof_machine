import { GadgetConnection, historySlice, HistorySlice, HistoryState } from "./History";
import { GetState, SetState } from "../Types";
import { unifyEquations } from "lib/game/Unification";
import { Term } from "lib/game/Term";
import { ValueMap } from "lib/util/ValueMap";

export type TermEnumeration = Map<string, string>

export type UnificationState = {
    termEnumeration: ValueMap<Term, string>
}

export type UnificationActions = {
    runUnification: () => ValueMap<GadgetConnection, boolean>
    getAssignedValue: (term: Term) => string
}

export type UnificationSlice = HistorySlice & UnificationState & UnificationActions

export const unificationSlice = (set: SetState<UnificationSlice>, get: GetState<UnificationSlice>): UnificationSlice => {
    return {
        ...historySlice(set, get),
        termEnumeration: new ValueMap(),

        runUnification: () => {
            const equations = get().getCurrentEquations()
            console.log("equations", equations)
            const { assignment, equationIsSatisfied } = unifyEquations<GadgetConnection>(equations)
            return equationIsSatisfied
        },
        getAssignedValue: (term: Term) => {
            const value = get().termEnumeration.get(term)
            return value ?? "-"
        }
    }
}