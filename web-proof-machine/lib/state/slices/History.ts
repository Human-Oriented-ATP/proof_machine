import { getGadgetTerms } from "lib/game/GameLogic";
import { CreateStateWithInitialValue, GetState, SetState } from "../Types"
import { Axiom, GadgetId, NodePosition, OUTPUT_POSITION } from "lib/game/Primitives"
import { Equation } from "lib/game/Unification";
import { Term } from "lib/game/Term";
import { ValueMap } from "lib/util/ValueMap";
import { SetupReadonlyState, setupSlice } from "./Setup";

export type GadgetConnection = { from: GadgetId, to: [GadgetId, NodePosition] }

function isEqualConnection(connection1: GadgetConnection, connection2: GadgetConnection) {
    return connection1.from === connection2.from
        && connection1.to[0] === connection2.to[0]
        && connection1.to[1] === connection2.to[1]
}

export type GameEvent = { GameCompleted: null }
    | { GadgetAdded: { gadgetId: GadgetId, axiom: Axiom } }
    | { ConnectionAdded: GadgetConnection }
    | { GadgetRemoved: { gadgetId: GadgetId } }
    | { ConnectionRemoved: GadgetConnection };

export type HistoryState = SetupReadonlyState & {
    log: GameEvent[]
}

export type HistoryActions = {
    logEvents: (events: GameEvent[]) => void;
    getAddedGadgets: () => GadgetId[]
    getRemovedGadgets: () => GadgetId[]
    getCurrentGadgets: () => GadgetId[]
    getConnectionEvents: () => ({ ConnectionAdded: GadgetConnection } | { ConnectionRemoved: GadgetConnection })[]
    getCurrentConnections: () => GadgetConnection[]
    getTermsOfGadget: (gadgetId: GadgetId) => Map<NodePosition, Term>
    getEquationOfConnection: (connection: GadgetConnection) => Equation
    getCurrentEquations: () => ValueMap<GadgetConnection, Equation>
}

export type HistorySlice = HistoryState & SetupReadonlyState & HistoryActions

export const historySlice: CreateStateWithInitialValue<HistoryState, HistorySlice> = (initialState, set, get): HistorySlice => {
    return {
        ...setupSlice(initialState),
        // TODO: Initialize history with goal gadget and any other gadgets appearing in the initial diagram 
        log: [],
        logEvents: (events: GameEvent[]) => {
            const { log } = get()
            const newLog = [...log, ...events]
            set({ log: newLog })
            // TODO: Synchronize history with server
            // synchronizeHistory(JSON.stringify(newLog))
        },
        getAddedGadgets: () => {
            return get().log
                .filter((event): event is { GadgetAdded: { gadgetId: GadgetId, axiom: Axiom } } => "GadgetAdded" in event)
                .map((event) => event.GadgetAdded.gadgetId)
        },
        getRemovedGadgets: () => {
            return get().log
                .filter((event): event is { GadgetRemoved: { gadgetId: GadgetId } } => "GadgetRemoved" in event)
                .map((event) => event.GadgetRemoved.gadgetId)
        },
        getCurrentGadgets: () => {
            const initialGadgets = get().setup.initialDiagram.gadgets.keys()
            const addedGadgets = get().getAddedGadgets()
            const removedGadgets = get().getRemovedGadgets()
            return [...initialGadgets, ...addedGadgets].filter((gadgetId) => !removedGadgets.includes(gadgetId))
        },
        getConnectionEvents: () => {
            return get().log.filter((event): event is { ConnectionAdded: GadgetConnection } | { ConnectionRemoved: GadgetConnection } =>
                "ConnectionAdded" in event || "ConnectionRemoved" in event)
        },
        getCurrentConnections: () => {
            let connections: GadgetConnection[] = get().setup.initialDiagram.connections
            const events = get().getConnectionEvents()
            for (const event of events) {
                if ("ConnectionAdded" in event) {
                    connections.push(event.ConnectionAdded)
                } else {
                    const index = connections.findIndex((connection) => isEqualConnection(connection, event.ConnectionRemoved))
                    if (index === -1) throw Error(`Invalid history log: Connection that is to be removed has not been added before 
                                                    ${JSON.stringify(event.ConnectionRemoved)}`)
                    connections.splice(index, 1)
                }
            }
            return connections
        },
        getTermsOfGadget: (gadgetId: GadgetId) => {
            const event = get().log.find((event) => "GadgetAdded" in event && event.GadgetAdded.gadgetId === gadgetId)
            if (event === undefined) throw Error(`Gadget with id ${gadgetId} not found`)
            if (!("GadgetAdded"! in event)) throw Error(`Something very weird happened`)
            return getGadgetTerms(event.GadgetAdded.axiom, gadgetId)
        },
        getEquationOfConnection: (connection: GadgetConnection): Equation => {
            const lhs = get().getTermsOfGadget(connection.from).get(OUTPUT_POSITION)
            const rhs = get().getTermsOfGadget(connection.to[0]).get(connection.to[1])
            if (lhs === undefined || rhs === undefined)
                throw Error(`Connection has undefined terms: \n${JSON.stringify(connection)}\nlhs: ${lhs}\nrhs: ${rhs}`)
            return [lhs!, rhs!]
        },
        getCurrentEquations: () => {
            const connections = get().getCurrentConnections()
            const connectionsWithEquations: Array<[GadgetConnection, Equation]> = connections.map((connection) =>
                [connection, get().getEquationOfConnection(connection)])
            return new ValueMap(connectionsWithEquations)
        }
    }
}
