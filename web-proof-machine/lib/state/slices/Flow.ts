import { CreateStateWithInitialValue } from '../Types';
import { addEdge, applyEdgeChanges, Connection, Edge, EdgeChange, OnConnect, OnEdgesChange, OnNodesChange, ReactFlowInstance, XYPosition } from '@xyflow/react';
import { EdgeWithEquationId } from 'components/game/diagram/CustomEdge';
import { GadgetNode } from 'components/game/diagram/GadgetFlowNode';
import { connectionToGadgetConnection, EdgeSlice, edgeSlice, EdgeState, isValidConnection } from './Edges';
import { NodeSlice, nodeSlice, NodeState } from './Nodes';
import { GameEvent } from './History';
import { GadgetIdGeneratorSlice, gadgetIdGeneratorSlice } from './GadgetIdGenerator';
import { axiomToGadget } from 'lib/game/GameLogic';
import { Axiom } from 'lib/game/Primitives';
import { unificationSlice, UnificationSlice } from './Unification';

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
            const equationIsSatisfied = get().runUnification()
            console.log("eq sat", equationIsSatisfied)
            // update edges, handles and nodes
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

        onEdgesChange: (changes: EdgeChange<EdgeWithEquationId>[]) => {
            set({ edges: applyEdgeChanges(changes, get().edges), });
        },

        onConnect: (connection: Connection) => {
            if (!isValidConnection(connection)) throw Error(`Connection is not valid ${connection}`)
            const removedEdges = get().removeEdgesConnectedToHandle(connection.targetHandle)
            set({
                edges: addEdge(connection, get().edges),
            });
            const gadgetConnection = connectionToGadgetConnection(connection)
            const removedGadgetConnections = removedEdges.map((edge) => connectionToGadgetConnection(edge as Connection))
            const removalEvents = removedGadgetConnections.map((connection) => ({ ConnectionRemoved: connection }))
            get().updateLogicalState([...removalEvents, { ConnectionAdded: gadgetConnection }])
        },

        isValidConnection: (connection) => {
            // const arityOk = aritiesMatch(source, target)
            // const colorsOk = labelsMatch(source, target)
            // const noCycle = doesNotCreateACycle(connection)
            // const notYetAConection = !isInDiagram(connection)
            // return colorsOk && arityOk && noCycle && notYetAConection
            return true
        }
    }
}