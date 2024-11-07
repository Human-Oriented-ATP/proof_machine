import { getGadgetTerms } from "lib/game/GameLogic";
import { CreateStateWithInitialValue } from "../Types"
import { GadgetId } from "lib/game/Primitives"
import { Equation } from "lib/game/Unification";
import { Term } from "lib/game/Term";
import { ValueMap } from "lib/util/ValueMap";
import { SetupReadonlyState, setupSlice } from "./Setup";
import { CellPosition, OUTPUT_POSITION } from 'lib/game/CellPosition';
import { GadgetDndFromShelfSlice, gadgetDndFromShelfSlice, GadgetDndFromShelfState } from "./DragGadgetFromShelf";
import { synchronizeHistory } from "lib/study/synchronizeHistory";
import { GameHistory } from "lib/study/GameHistory";

const HISTORY_UPLOAD_DELAY = 3 * 1000

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
    log: [GameEvent, Date][]
    timeoutId: NodeJS.Timeout | undefined
    startTime: Date
    finalHistoryUploaded: boolean
}

export type HistoryActions = {
    logEvents: (events: GameEvent[]) => void;
    getEvents: () => GameEvent[];
    makeHistoryObject: () => GameHistory | undefined;
    uploadFinalHistory: () => void;
    uploadHistoryAsynchronously: () => void;
    getAddedGadgets: () => GadgetId[]
    getRemovedGadgets: () => GadgetId[]
    getCurrentGadgets: () => GadgetId[]
    getConnectionEvents: () => ({ ConnectionAdded: GadgetConnection } | { ConnectionRemoved: GadgetConnection })[]
    getCurrentConnections: () => GadgetConnection[]
    getStatementOfInitialGadget: (gadgetId: GadgetId) => string | undefined
    getAxiomOfAddedGadget: (gadgetId: GadgetId) => string
    getAxiomOfGadgetBeingAdded: (gadgetId: GadgetId) => string | undefined
    getStatementOfGadget: (gadgetId: GadgetId) => string
    getSomeGadgetWithAxiom: (axiom: string) => GadgetId
    getTermsOfGadget: (gadgetId: GadgetId) => Map<CellPosition, Term>
    getCurrentCellTerms: () => Term[]
    getCurrentHoleTerms: () => Term[]
    getEquationOfConnection: (connection: GadgetConnection) => Equation
    getCurrentEquations: () => ValueMap<GadgetConnection, Equation>
}

export type HistorySlice = SetupReadonlyState & GadgetDndFromShelfSlice & HistoryStateInitializedFromData & HistoryState & HistoryActions

export const historySlice: CreateStateWithInitialValue<HistoryStateInitializedFromData, HistorySlice> = (initialState, set, get): HistorySlice => {
    return {
        ...setupSlice(initialState),
        ...gadgetDndFromShelfSlice(set, get),
        log: [],
        timeoutId: undefined,
        startTime: new Date(),
        finalHistoryUploaded: false,

        logEvents: (events: GameEvent[]) => {
            const time = new Date()
            const eventsWithTime: [GameEvent, Date][] = events.map((event) => [event, time])
            const newLog = [...get().log, ...eventsWithTime]
            set({ log: newLog })
        },

        makeHistoryObject: () => {
            const { problemId, configurationIdentifier } = get().setup
            if (problemId === undefined || configurationIdentifier === undefined) return undefined
            const history: GameHistory | undefined = {
                problemId: problemId,
                configId: configurationIdentifier,
                startTime: get().startTime,
                completed: get().log.some(([event]) => "GameCompleted" in event),
                log: get().log
            }
            return history
        },

        uploadFinalHistory: async () => {
            if (!get().finalHistoryUploaded) {
                const history = get().makeHistoryObject()
                if (history !== undefined) {
                    synchronizeHistory(JSON.stringify(history))
                    set({ timeoutId: undefined })
                }
                set({ finalHistoryUploaded: true })
            }
        },

        uploadHistoryAsynchronously: async () => {
            if (get().timeoutId === undefined) {
                const timeoutId = setTimeout(() => {
                    get().uploadFinalHistory()
                }, HISTORY_UPLOAD_DELAY)
                set({ timeoutId })
            }
        },

        getEvents: () => {
            const log = get().log
            return log.map(([event, date]) => event)
        },

        getAddedGadgets: () => {
            return get().getEvents()
                .filter((event): event is { GadgetAdded: { gadgetId: GadgetId, axiom: string } } => "GadgetAdded" in event)
                .map((event) => event.GadgetAdded.gadgetId)
        },
        getRemovedGadgets: () => {
            return get().getEvents()
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
            return get().getEvents().filter((event): event is { ConnectionAdded: GadgetConnection } | { ConnectionRemoved: GadgetConnection } =>
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
        getStatementOfInitialGadget(gadgetId: GadgetId) {
            const initialGadgets = get().setup.initialDiagram.gadgets
            const statement = initialGadgets.get(gadgetId)?.statement
            if (statement === undefined)
                return undefined
            return statement
        },
        getAxiomOfGadgetBeingAdded: (gadgetId: GadgetId) => {
            const gadgetBeingDraggedFromShelf = get().gadgetBeingDraggedFromShelf
            if (gadgetBeingDraggedFromShelf === undefined) return undefined
            else {
                const { id, axiom } = gadgetBeingDraggedFromShelf
                return id === gadgetId ? axiom : undefined
            }
        },
        getAxiomOfAddedGadget: (gadgetId: GadgetId) => {
            const event = get().getEvents().find((event) => "GadgetAdded" in event && event.GadgetAdded.gadgetId === gadgetId)
            if (event === undefined) throw Error(`Gadget with id ${gadgetId} not found`)
            if (!("GadgetAdded"! in event)) throw Error(`Something very weird happened`)
            return event.GadgetAdded.axiom
        },
        getStatementOfGadget: (gadgetId: GadgetId) => {
            const { getStatementOfInitialGadget, getAxiomOfGadgetBeingAdded, getAxiomOfAddedGadget } = get();
            const statement = getStatementOfInitialGadget(gadgetId) ?? getAxiomOfGadgetBeingAdded(gadgetId) ?? getAxiomOfAddedGadget(gadgetId);
            return statement
        },
        getSomeGadgetWithAxiom: (axiom: string) => {
            const currentGadgets = get().getCurrentGadgets()
            for (const gadget of currentGadgets) {
                const statement = get().getStatementOfGadget(gadget)
                if (statement === axiom)
                    return gadget
            }
            throw Error(`No gadget with axiom ${axiom} found`)
        },
        getTermsOfGadget: (gadgetId: GadgetId) => {
            const statement = get().getStatementOfGadget(gadgetId)
            const terms = getGadgetTerms(statement, gadgetId)
            return terms
        },
        getCurrentCellTerms: () => {
            const gadgets = get().getCurrentGadgets()
            const terms = gadgets.flatMap(gadgetId => Array.from(get().getTermsOfGadget(gadgetId).values()))
            return terms
        },
        getCurrentHoleTerms: () => {
            const terms = get().getCurrentCellTerms()
            const holeTerms = terms.flatMap((term => {
                if ("variable" in term) {
                    throw Error(`Invalid term! A cell cannot have a single variable as a term: ${term}`)
                } else {
                    return term.args
                }
            }))
            return holeTerms
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
        },

    }
}