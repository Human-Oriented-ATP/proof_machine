import { getGadgetTerms } from "lib/game/GameLogic";
import { GetState, SetState } from "../Types"
import { Axiom, GadgetId, NodePosition, OUTPUT_POSITION } from "lib/game/Primitives"
import { Equation } from "lib/game/Unification";
import { Term } from "lib/game/Term";
import { ValueMap } from "lib/util/ValueMap";

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

export type HistoryState = {
    log: GameEvent[]
}

export type HistoryActions = {
    logEvents: (events: GameEvent[]) => void;
    getAddedGadgets: () => GadgetId[]
    getRemovedGadgets: () => GadgetId[]
    getAddedConnections: () => GadgetConnection[]
    getRemovedConnections: () => GadgetConnection[]
    getCurrentGadgets: () => GadgetId[]
    getCurrentConnections: () => GadgetConnection[]
    getTermsOfGadget: (gadgetId: GadgetId) => Map<NodePosition, Term>
    getEquationOfConnection: (connection: GadgetConnection) => Equation
    getCurrentEquations: () => ValueMap<GadgetConnection, Equation>
}

export type HistorySlice = HistoryState & HistoryActions

export const historySlice = (set: SetState<HistorySlice>, get: GetState<HistorySlice>): HistorySlice => {
    return {
        // Need to initialize history with goal gadget and any other gadgets appearing in the initial diagram! 
        log: [],
        logEvents: (events: GameEvent[]) => {
            set({
                log: [...get().log, ...events]
            })
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
        getAddedConnections: () => {
            return get().log
                .filter((event): event is { ConnectionAdded: GadgetConnection } => "ConnectionAdded" in event)
                .map((event) => event.ConnectionAdded)
        },
        getRemovedConnections: () => {
            return get().log
                .filter((event): event is { ConnectionRemoved: GadgetConnection } => "ConnectionRemoved" in event)
                .map((event) => event.ConnectionRemoved)
        },
        getCurrentGadgets: () => {
            const addedGadgets = get().getAddedGadgets()
            const removedGadgets = get().getRemovedGadgets()
            return addedGadgets.filter((gadgetId) => !removedGadgets.includes(gadgetId))
        },
        getCurrentConnections: () => {
            const addedConnections = get().getAddedConnections()
            const removedConnections = get().getRemovedConnections()
            return addedConnections.filter((connection) => !removedConnections.some((removedConnection) =>
                isEqualConnection(connection, removedConnection)))
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
            if (lhs === undefined || rhs === undefined) throw Error(`Connection ${connection} has undefined terms`)
            console.log("lhs", lhs, "rhs", rhs)
            return [lhs!, rhs!]
        },
        getCurrentEquations: () => {
            const connections = get().getCurrentConnections()
            console.log("connections", connections)
            const connectionsWithEquations: Array<[GadgetConnection, Equation]> = connections.map((connection) =>
                [connection, get().getEquationOfConnection(connection)])
            return new ValueMap(connectionsWithEquations)
        }
    }
}