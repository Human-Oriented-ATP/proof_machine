import { CreateStateWithInitialValue } from '../Types';
import { addEdge, applyEdgeChanges, Connection, Edge, EdgeChange, OnConnect, OnConnectStartParams, OnEdgesChange, OnNodesChange, ReactFlowInstance, XYPosition } from '@xyflow/react';
import { GadgetNode } from 'components/game/flow/GadgetFlowNode';
import { connectionToGadgetConnection, EdgeSlice, edgeSlice, EdgeState, isValidConnection } from './Edges';
import { NodeSlice, nodeSlice, NodeState } from './Nodes';
import { GameEvent, HistoryState } from './History';
import { GadgetIdGeneratorSlice, gadgetIdGeneratorSlice } from './GadgetIdGenerator';
import { axiomToGadget } from 'lib/game/GameLogic';
import { Axiom } from 'lib/game/Primitives';
import { unificationSlice, UnificationSlice, UnificationState } from './Unification';
import { aritiesMatch, labelsMatch } from 'lib/game/Term';

export type FlowState = UnificationState & NodeState & EdgeState & {
    rf: ReactFlowInstance;
}

export interface FlowActions {
    makeGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => GadgetNode;
    addGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => void;
    removeGadgetNode: (nodeId: string) => void;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    isValidConnection: (connection: any) => boolean;
    updateLogicalState: (events: GameEvent[]) => void;
    onNodesDelete: (nodes: GadgetNode[]) => void;
    onConnectStart: (event: MouseEvent | TouchEvent, params: OnConnectStartParams) => void;
};

export type FlowSlice = NodeSlice & EdgeSlice & UnificationSlice & GadgetIdGeneratorSlice & FlowState & FlowActions

export const flowSlice: CreateStateWithInitialValue<FlowState, FlowSlice> = (initialState, set, get) => {
    return {
        ...edgeSlice(initialState, set, get),
        ...nodeSlice(initialState, set, get),
        ...unificationSlice(initialState, set, get),
        ...gadgetIdGeneratorSlice(set, get),
        rf: initialState.rf,

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
                deletable: false, // props.gadgetDeletionEnabled,
                data: axiomToGadget(axiom, id)
            }
            // gadgetThatIsBeingAdded.current = { gadgetId: id, axiom }
            return gadgetNode
        },

        addGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => {
            const node = get().makeGadgetNode(axiom, axiomPosition)
            get().setGadgetBeingDraggedFromShelf({ id: node.id, position: node.position })
            set({
                nodes: [...get().nodes, node],
            });
            get().updateLogicalState([{ GadgetAdded: { gadgetId: node.id, axiom } }])
        },

        removeGadgetNode: (nodeId: string) => {
            get().removeEdgesConnectedToNode(nodeId);
            set({
                nodes: get().nodes.filter((node) => node.id !== nodeId),
            });
            // !! Need to also log the removal of the edges
            get().updateLogicalState([{ GadgetRemoved: { gadgetId: nodeId } }])
        },

        onNodesDelete: (nodes: GadgetNode[]) => {
            nodes.forEach((node) => get().removeGadgetNode(node.id))
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
            const gadgetConnection = connectionToGadgetConnection(connection)
            get().updateLogicalState([...edgeRemovalEvents, { ConnectionAdded: gadgetConnection }])
        },

        isValidConnection: (connection: Connection) => {
            const gadgetConnection = connectionToGadgetConnection(connection)
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

    }
}