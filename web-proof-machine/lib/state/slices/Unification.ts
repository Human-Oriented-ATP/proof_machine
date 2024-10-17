import { GadgetConnection, historySlice, HistorySlice, HistoryState } from "./History";
import { GetState, SetState } from "../Types";
import { unifyEquations } from "lib/game/Unification";

export type TermEnumeration = Map<string, string>

export type UnificationState = {
    termEnumeration: TermEnumeration
}

export type UnificationActions = {
    runUnification: () => Map<GadgetConnection, boolean>
}

export type UnificationSlice = HistorySlice & UnificationState & UnificationActions

export const unificationSlice = (set: SetState<UnificationSlice>, get: GetState<UnificationSlice>): UnificationSlice => {
    return {
        ...historySlice(set, get),
        termEnumeration: new Map(),

        runUnification: () => {
            const equations = get().getCurrentEquations()
            console.log("equations", equations)
            const { assignment, equationIsSatisfied } = unifyEquations(equations)
            return equationIsSatisfied
        }
    }
}