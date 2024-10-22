import { CreateStateWithInitialValue } from '../Types';
import { addEdge, applyEdgeChanges, Connection, Edge, EdgeChange, OnConnect, OnConnectStartParams, OnEdgesChange, ReactFlowInstance, XYPosition } from '@xyflow/react';
import { GadgetNode } from 'components/game/flow/GadgetFlowNode';
import { toGadgetConnection as toGadgetConnection, EdgeSlice, edgeSlice, EdgeStateInitializedFromData, isValidConnection } from './Edges';
import { NodeSlice, nodeSlice, NodeState, NodeStateInitializedFromData } from './Nodes';
import { GameEvent } from './History';
import { GadgetIdGeneratorSlice, gadgetIdGeneratorSlice } from './GadgetIdGenerator';
import { axiomToGadget } from 'lib/game/GameLogic';
import { Axiom, GadgetId } from 'lib/game/Primitives';
import { unificationSlice, UnificationSlice, UnificationState, UnificationStateInitializedFromData } from './Unification';
import { aritiesMatch, labelsMatch } from 'lib/game/Term';
import { initViewport } from 'lib/util/ReactFlow';
import { HelpPopupSlice, helpPopupSlice } from './HelpPopup';
import { isAboveGadgetShelf } from 'lib/util/Positions';

export type FlowStateInitializedFromData = UnificationStateInitializedFromData & NodeStateInitializedFromData & EdgeStateInitializedFromData & {
    rf: ReactFlowInstance
}

export type FlowState = UnificationState & NodeState & {
    levelIsCompleted: boolean
}

export interface FlowActions {
    updateLogicalState: (events: GameEvent[]) => void;
    runCompletionCheck: () => { isCompleted: boolean, openHandles: string[] };
    makeGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => GadgetNode;
    addGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => void;
    removeGadgetNode: (node: GadgetNode) => void;
    handleGadgetDraggedAboveShelf: (node: GadgetNode) => void;
    handleGadgetDragStopAwayFromShelf: (node: GadgetNode) => void;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    isValidConnection: (connection: any) => boolean;
    onNodesDelete: (nodes: GadgetNode[]) => void;
    onEdgesDelete: (edges: Edge[]) => void;
    onConnectStart: (event: MouseEvent | TouchEvent, params: OnConnectStartParams) => void;
    onInit: () => void;
    onNodeDragStop: (event: React.MouseEvent, node: GadgetNode) => void;
};

export type DependencySlices = NodeSlice & EdgeSlice & UnificationSlice & GadgetIdGeneratorSlice & HelpPopupSlice
export type FlowSlice = DependencySlices & FlowStateInitializedFromData & FlowState & FlowActions

export const flowSlice: CreateStateWithInitialValue<FlowStateInitializedFromData, FlowSlice> = (initialState, set, get) => {
    return {
        ...edgeSlice(initialState, set, get),
        ...nodeSlice(initialState, set, get),
        ...unificationSlice(initialState, set, get),
        ...gadgetIdGeneratorSlice(set, get),
        ...helpPopupSlice(set),
        rf: initialState.rf,
        levelIsCompleted: false,

        // TODO: 
        runCompletionCheck: () => {
            let openHandles = new Array()
            let currentLayer: GadgetId[] = new Array()
            currentLayer.push("goal_gadget")
            let hasInvalidEdge = false
            while (true) {
                const gadgetNodesInCurrentLayer = get().nodes.filter(node => currentLayer.includes(node.id))
                const inputHandlesInCurrentLayer = gadgetNodesInCurrentLayer.map(node => get().getInputHandlesOfNode(node.id)).flat()
                if (inputHandlesInCurrentLayer.length === 0) {
                    break
                }
                let nextLayer = new Array()
                for (const handle of inputHandlesInCurrentLayer) {
                    const incomingEdges = get().edges.filter(edge => edge.targetHandle === handle)
                    if (incomingEdges.length === 0) {
                        openHandles.push(handle)
                    } else if (incomingEdges.length === 1) {
                        const incomingEdge = incomingEdges[0]
                        if (!get().edgeIsSatisfied(incomingEdge)) {
                            hasInvalidEdge = true
                        }
                        const nextNode = incomingEdge.source
                        nextLayer.push(nextNode)
                    } else {
                        throw Error(`Unexpected number of incoming edges: handle ${handle} has ${incomingEdges.length} incoming edges`)
                    }
                }
                currentLayer = nextLayer
            }
            const isCompleted = openHandles.length === 0 && !hasInvalidEdge
            return { isCompleted, openHandles }
        },

        updateLogicalState(events: GameEvent[]) {
            get().logEvents(events)
            get().runUnification()
            const { isCompleted, openHandles } = get().runCompletionCheck()
            if (isCompleted) {
                set({ levelIsCompleted: true })
            }
            console.log("Open handles: ", openHandles)
            // update handles
            // check completeness
            // synchronize history
        },

        makeGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => {
            const id = get().generateNewGadgetId()
            const gadgetProps = axiomToGadget(axiom, id)
            const gadgetNode: GadgetNode = {
                id, type: 'gadgetNode',
                position: get().rf.screenToFlowPosition(axiomPosition),
                dragging: true,
                deletable: get().setup.settings.gadgetDeletionEnabled && id !== "goal_gadget",
                data: gadgetProps
            }
            return gadgetNode
        },

        addGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => {
            const node = get().makeGadgetNode(axiom, axiomPosition)
            set({ gadgetBeingDraggedFromShelf: { id: node.id, position: node.position, status: "STILL_ABOVE_SHELF", axiom } })
            set({ nodes: [...get().nodes, node], });
            // Intentionally no update of logical state here -- this happens in onNodeDragStop
        },

        removeGadgetNode: (node: GadgetNode) => {
            if (node.deletable) {
                const connectionDeletionEvents = get().removeEdgesConnectedToNode(node.id);
                set({ nodes: get().nodes.filter((n) => n.id !== node.id), });
                get().updateLogicalState([...connectionDeletionEvents, { GadgetRemoved: { gadgetId: node.id } }])
            }
        },

        onNodesDelete: (nodes: GadgetNode[]) => {
            nodes.forEach((node) => get().removeGadgetNode(node))
        },

        onEdgesDelete: (edges: Edge[]) => {
            const events = edges.map(edge => ({ ConnectionRemoved: toGadgetConnection(edge as Connection) }))
            get().updateLogicalState(events)
        },

        onEdgesChange: (changes: EdgeChange<Edge>[]) => {
            set({ edges: applyEdgeChanges(changes, get().edges), });
        },

        onConnect: (connection: Connection) => {
            if (!isValidConnection(connection)) throw Error(`Connection is not valid ${connection}`)
            const edgeRemovalEvents = get().removeEdgesConnectedToHandle(connection.targetHandle)
            set({
                edges: addEdge({ ...connection, type: 'customEdge' }, get().edges),
            });
            const gadgetConnection = toGadgetConnection(connection)
            get().updateLogicalState([...edgeRemovalEvents, { ConnectionAdded: gadgetConnection }])
        },

        isValidConnection: (connection: Connection) => {
            const gadgetConnection = toGadgetConnection(connection)
            const [lhs, rhs] = get().getEquationOfConnection(gadgetConnection)
            const arityOk = aritiesMatch(lhs, rhs)
            const colorsOk = labelsMatch(lhs, rhs)
            const createsNoCycle = get().doesNotCreateACycle(connection)
            const doesNotYetExist = !get().connectionExists(connection)
            return colorsOk && arityOk && createsNoCycle && doesNotYetExist
        },

        onConnectStart: (event: MouseEvent | TouchEvent, params: OnConnectStartParams) => {
            if (params.handleType === "target") {
                const events = get().removeEdgesConnectedToHandle(params.handleId!)
                get().updateLogicalState(events)
            }
            // disableHoleFocus()
            // props.setUserIsDraggingOrNavigating(true)
        },

        onInit() {
            const initialViewPortSetting = get().setup.settings.initialViewportSetting
            initViewport(get().rf, initialViewPortSetting)
            get().updateLogicalState([])
        },

        handleGadgetDraggedAboveShelf(node: GadgetNode) {
            const gadgetBeingDraggedFromShelf = get().gadgetBeingDraggedFromShelf
            if (gadgetBeingDraggedFromShelf === undefined) {
                get().removeGadgetNode(node)
            } else {
                if (node.id !== gadgetBeingDraggedFromShelf.id)
                    throw Error("Impossible value for gadgetBeingDraggedFromShelf")
                set({ nodes: get().nodes.filter((n) => n.id !== gadgetBeingDraggedFromShelf.id) });
                set({ gadgetBeingDraggedFromShelf: undefined });
            }
        },

        handleGadgetDragStopAwayFromShelf(node: GadgetNode) {
            const gadgetBeingDraggedFromShelf = get().gadgetBeingDraggedFromShelf
            // TODO: events = proximityConnect()
            if (gadgetBeingDraggedFromShelf !== undefined) {
                const { id, axiom } = gadgetBeingDraggedFromShelf
                const event = { GadgetAdded: { gadgetId: id, axiom } }
                set({ gadgetBeingDraggedFromShelf: undefined });
                get().updateLogicalState([event]) // TODO: need to add the connection event from proximity connect as well!
            } else {
                // TODO: update logical state with only proximity connect event!
            }
            // Set userIsDraggingOrNavigating to false
        },

        onNodeDragStop(event, node) {
            if (isAboveGadgetShelf({ x: event.clientX, y: event.clientY })) {
                get().handleGadgetDraggedAboveShelf(node)
            } else {
                get().handleGadgetDragStopAwayFromShelf(node)
            }
        }

    }
}