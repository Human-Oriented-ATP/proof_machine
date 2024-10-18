import { CreateStateWithInitialValue } from '../Types';
import { addEdge, applyEdgeChanges, Connection, Edge, EdgeChange, OnConnect, OnEdgesChange, OnNodesChange, ReactFlowInstance, XYPosition } from '@xyflow/react';
import { GadgetNode } from 'components/game/diagram/GadgetFlowNode';
import { connectionToGadgetConnection, EdgeSlice, edgeSlice, EdgeState, isValidConnection } from './Edges';
import { NodeSlice, nodeSlice, NodeState } from './Nodes';
import { GameEvent } from './History';
import { GadgetIdGeneratorSlice, gadgetIdGeneratorSlice } from './GadgetIdGenerator';
import { axiomToGadget } from 'lib/game/GameLogic';
import { Axiom } from 'lib/game/Primitives';
import { unificationSlice, UnificationSlice } from './Unification';
import { aritiesMatch, labelsMatch } from 'lib/game/Term';

export type FlowState = NodeState & EdgeState & {
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
};

export type FlowSlice = NodeSlice & EdgeSlice & UnificationSlice & GadgetIdGeneratorSlice & FlowState & FlowActions

export const flowSlice: CreateStateWithInitialValue<FlowState, FlowSlice> = (initialState, set, get) => {
    return {
        ...edgeSlice(initialState, set, get),
        ...nodeSlice(initialState, set, get),
        ...unificationSlice(set, get),
        ...gadgetIdGeneratorSlice(set, get),
        rf: initialState.rf,

        updateLogicalState(events: GameEvent[]) {
            get().logEvents(events)
            get().runUnification()
            // update handles and nodes
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
            const removedEdges = get().removeEdgesConnectedToHandle(connection.targetHandle)
            set({
                edges: addEdge({ ...connection, type: 'customEdge' }, get().edges),
            });
            const gadgetConnection = connectionToGadgetConnection(connection)
            const removedGadgetConnections = removedEdges.map((edge) => connectionToGadgetConnection(edge as Connection))
            const removalEvents = removedGadgetConnections.map((connection) => ({ ConnectionRemoved: connection }))
            get().updateLogicalState([...removalEvents, { ConnectionAdded: gadgetConnection }])
        },

        isValidConnection: (connection: Connection) => {
            const gadgetConnection = connectionToGadgetConnection(connection)
            const [lhs, rhs] = get().getEquationOfConnection(gadgetConnection)
            const arityOk = aritiesMatch(lhs, rhs)
            const colorsOk = labelsMatch(lhs, rhs)
            const createsNoCycle = get().doesNotCreateACycle(connection)
            const doesNotYetExist = !get().connectionExists(connection)
            return colorsOk && arityOk && createsNoCycle && doesNotYetExist
        }
    }
}