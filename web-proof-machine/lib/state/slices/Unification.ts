import { GadgetConnection, historySlice, HistorySlice, HistoryState, HistoryStateInitializedFromData } from "./History";
import { CreateStateWithInitialValue, GetState, SetState } from "../Types";
import { Equation, unifyEquations } from "lib/game/Unification";
import { Term } from "lib/game/Term";
import { ValueMap } from "lib/util/ValueMap";
import { toHoleValue } from "lib/game/TermEnumeration";
import { Connection, Edge } from "@xyflow/react";
import { toGadgetConnection } from "./Edges";

export type UnificationStateInitializedFromData = HistoryStateInitializedFromData

export type UnificationState = {
    termEnumeration: ValueMap<Term, string>
    equationIsSatisfied: ValueMap<GadgetConnection, boolean>
}

export type UnificationActions = {
    runUnification: () => ValueMap<GadgetConnection, boolean>
    edgeIsSatisfied: (edge: Edge) => boolean
}

export type UnificationSlice = HistorySlice & UnificationState & UnificationActions

export const unificationSlice: CreateStateWithInitialValue<UnificationStateInitializedFromData, UnificationSlice> = (initialState, set, get): UnificationSlice => {
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
        },

        edgeIsSatisfied: (edge: Edge) => {
            const gadgetConnection = toGadgetConnection(edge as Connection)
            const isSatisfied = get().equationIsSatisfied.get(gadgetConnection)
            if (isSatisfied === undefined) throw Error(`Edge is not in the equationIsSatisfied map ${JSON.stringify(edge)}`)
            return isSatisfied
        },
    }
}