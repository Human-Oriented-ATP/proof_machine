import { CreateStateWithInitialValue } from '../Types';
import { addEdge, applyEdgeChanges, Connection, Edge, EdgeChange, OnConnect, OnConnectStartParams, OnEdgesChange, ReactFlowInstance, XYPosition } from '@xyflow/react';
import { GadgetNode } from 'components/game/flow/GadgetFlowNode';
import { toGadgetConnection as toGadgetConnection, EdgeSlice, edgeSlice, EdgeState, isValidConnection } from './Edges';
import { NodeSlice, nodeSlice, NodeState } from './Nodes';
import { GameEvent } from './History';
import { GadgetIdGeneratorSlice, gadgetIdGeneratorSlice } from './GadgetIdGenerator';
import { axiomToGadget } from 'lib/game/GameLogic';
import { Axiom } from 'lib/game/Primitives';
import { unificationSlice, UnificationSlice, UnificationState } from './Unification';
import { aritiesMatch, labelsMatch } from 'lib/game/Term';
import { initViewport } from 'lib/util/ReactFlow';
import { HelpPopupSlice, helpPopupSlice } from './HelpPopup';

export type FlowState = UnificationState & NodeState & EdgeState & {
    rf: ReactFlowInstance;
    levelIsCompleted: boolean
}

export interface FlowActions {
    updateLogicalState: (events: GameEvent[]) => void;
    makeGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => GadgetNode;
    addGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => void;
    removeGadgetNode: (nodeId: string) => void;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    isValidConnection: (connection: any) => boolean;
    onNodesDelete: (nodes: GadgetNode[]) => void;
    onEdgesDelete: (edges: Edge[]) => void;
    onConnectStart: (event: MouseEvent | TouchEvent, params: OnConnectStartParams) => void;
    onInit: () => void;
};

export type FlowSlice = NodeSlice & EdgeSlice & UnificationSlice & GadgetIdGeneratorSlice & HelpPopupSlice
    & FlowState & FlowActions

export const flowSlice: CreateStateWithInitialValue<FlowState, FlowSlice> = (initialState, set, get) => {
    return {
        ...edgeSlice(initialState, set, get),
        ...nodeSlice(initialState, set, get),
        ...unificationSlice(initialState, set, get),
        ...gadgetIdGeneratorSlice(set, get),
        ...helpPopupSlice(set),
        rf: initialState.rf,
        levelIsCompleted: false,

        // TODO: 
        // checkCompletion: () => {
        //     let hasInvalidEdge = false
        //     let currentLayer = ["goal_gadget"]
        //     while (true) {
        //         const incomingEdges = get().edges.filter(edge => currentLayer.includes(edge.target))
        //         const areSatisfied = incomingEdges.map(edge => get().edgeIsSatisfied(edge))
        //         if (areSatisfied.includes(false)) {
        //             hasInvalidEdge = true
        //         }
        //         if (incomingEdges.length === 0) {
        //             break
        //         }
        //     }
        //     // return !hasInvalidEdge
        // },

        updateLogicalState(events: GameEvent[]) {
            get().logEvents(events)
            get().runUnification()
            // update handles
            // check completeness
            // synchronize history
        },

        makeGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => {
            const id = get().generateNewGadgetId()
            const gadgetNode: GadgetNode = {
                id, type: 'gadgetNode',
                position: get().rf.screenToFlowPosition(axiomPosition),
                dragging: true,
                deletable: get().setup.settings.gadgetDeletionEnabled && id !== "goal_gadget",
                data: axiomToGadget(axiom, id)
            }
            return gadgetNode
        },

        addGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => {
            const node = get().makeGadgetNode(axiom, axiomPosition)
            get().setGadgetBeingDraggedFromShelf({ id: node.id, position: node.position, status: "STILL_ABOVE_SHELF" })
            set({
                nodes: [...get().nodes, node],
            });
            // not quite yet: at this point we only know that the user has clicked the gadget, but maybe not yet dragged it away!
            // this should be moved to onNodeDragStop
            get().updateLogicalState([{ GadgetAdded: { gadgetId: node.id, axiom } }])
        },

        removeGadgetNode: (nodeId: string) => {
            const connectionDeletionEvents = get().removeEdgesConnectedToNode(nodeId);
            set({
                nodes: get().nodes.filter((node) => node.id !== nodeId),
            });
            get().updateLogicalState([...connectionDeletionEvents, { GadgetRemoved: { gadgetId: nodeId } }])
        },

        onNodesDelete: (nodes: GadgetNode[]) => {
            nodes.forEach((node) => get().removeGadgetNode(node.id))
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

    }
}