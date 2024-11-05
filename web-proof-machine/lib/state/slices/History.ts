import { getGadgetTerms } from "lib/game/GameLogic";
import { CreateStateWithInitialValue } from "../Types"
import { GadgetId } from "lib/game/Primitives"
import { Equation } from "lib/game/Unification";
import { Term } from "lib/game/Term";
import { ValueMap } from "lib/util/ValueMap";
import { SetupReadonlyState, setupSlice } from "./Setup";
import { CellPosition, OUTPUT_POSITION } from 'lib/game/CellPosition';
import { GadgetDndFromShelfSlice, gadgetDndFromShelfSlice, GadgetDndFromShelfState } from "./DragGadgetFromShelf";

export type GadgetConnection = { from: GadgetId, to: [GadgetId, CellPosition] }

function isEqualConnection(connection1: GadgetConnection, connection2: GadgetConnection) {
    return connection1.from === connection2.from
        && connection1.to[0] === connection2.to[0]
        && connection1.to[1] === connection2.to[1]
}

export type GameEvent = { GameCompleted: null }
    | { GadgetAdded: { gadgetId: GadgetId, axiom: string } }
    | { ConnectionAdded: GadgetConnection }
    | { GadgetRemoved: { gadgetId: GadgetId } }
    | { ConnectionRemoved: GadgetConnection };

export type HistoryStateInitializedFromData = SetupReadonlyState

export type HistoryState = GadgetDndFromShelfState & {
    log: GameEvent[]
}

export type HistoryActions = {
    logEvents: (events: GameEvent[]) => void;
    getAddedGadgets: () => GadgetId[]
    getRemovedGadgets: () => GadgetId[]
    getCurrentGadgets: () => GadgetId[]
    getConnectionEvents: () => ({ ConnectionAdded: GadgetConnection } | { ConnectionRemoved: GadgetConnection })[]
    getCurrentConnections: () => GadgetConnection[]
    getTermsOfInitialGadget: (gadgetId: GadgetId) => Map<CellPosition, Term> | undefined
    getTermsOfAddedGadget: (gadgetId: GadgetId) => Map<CellPosition, Term>
    getTermsOfGadgetBeingAdded: (gadgetId: GadgetId) => Map<CellPosition, Term> | undefined
    getTermsOfGadget: (gadgetId: GadgetId) => Map<CellPosition, Term>
    getEquationOfConnection: (connection: GadgetConnection) => Equation
    getCurrentEquations: () => ValueMap<GadgetConnection, Equation>
}

export type HistorySlice = SetupReadonlyState & GadgetDndFromShelfSlice & HistoryStateInitializedFromData & HistoryState & HistoryActions

export const historySlice: CreateStateWithInitialValue<HistoryStateInitializedFromData, HistorySlice> = (initialState, set, get): HistorySlice => {
    return {
        ...setupSlice(initialState),
        ...gadgetDndFromShelfSlice(set, get),
        log: [],
        logEvents: (events: GameEvent[]) => {
            const { log } = get()
            const newLog = [...log, ...events]
            set({ log: newLog })
        },
        getAddedGadgets: () => {
            return get().log
                .filter((event): event is { GadgetAdded: { gadgetId: GadgetId, axiom: string } } => "GadgetAdded" in event)
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
            let connections: GadgetConnection[] = Array.from(get().setup.initialDiagram.connections)
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
        getTermsOfInitialGadget(gadgetId: GadgetId) {
            const initialGadgets = get().setup.initialDiagram.gadgets
            const statement = initialGadgets.get(gadgetId)?.statement
            if (statement === undefined)
                return undefined
            return getGadgetTerms(statement, gadgetId)
        },
        getTermsOfGadgetBeingAdded: (gadgetId: GadgetId) => {
            const gadgetBeingDraggedFromShelf = get().gadgetBeingDraggedFromShelf
            if (gadgetBeingDraggedFromShelf === undefined) return undefined
            else {
                const { id, axiom } = gadgetBeingDraggedFromShelf
                return id === gadgetId ? getGadgetTerms(axiom, id) : undefined
            }
        },
        getTermsOfAddedGadget: (gadgetId: GadgetId) => {
            const event = get().log.find((event) => "GadgetAdded" in event && event.GadgetAdded.gadgetId === gadgetId)
            if (event === undefined) throw Error(`Gadget with id ${gadgetId} not found`)
            if (!("GadgetAdded"! in event)) throw Error(`Something very weird happened`)
            return getGadgetTerms(event.GadgetAdded.axiom, gadgetId)
        },
        getTermsOfGadget: (gadgetId: GadgetId) => {
            const { getTermsOfInitialGadget, getTermsOfGadgetBeingAdded, getTermsOfAddedGadget } = get();

            return (
                getTermsOfInitialGadget(gadgetId) ??
                getTermsOfGadgetBeingAdded(gadgetId) ??
                getTermsOfAddedGadget(gadgetId)
            );
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
