import { CreateStateWithInitialValue } from '../Types';
import { addEdge, applyEdgeChanges, Connection, Edge, EdgeChange, OnConnect, OnConnectStartParams, OnEdgesChange, OnNodeDrag, ReactFlowInstance, XYPosition } from '@xyflow/react';
import { GadgetNode } from 'components/game/flow/GadgetFlowNode';
import { toGadgetConnection, isValidConnection } from './Edges';
import { aritiesMatch, labelsMatch } from 'lib/game/Term';
import { initViewport } from 'lib/util/ReactFlow';
import { isAboveGadgetShelf } from 'lib/util/Positions';
import { flowUtilitiesSlice, FlowUtilitiesSlice, FlowUtilitiesState, FlowUtilitiesStateInitializedFromData } from './FlowUtilities';

export type FlowStateInitializedFromData = FlowUtilitiesStateInitializedFromData

export type FlowState = FlowUtilitiesState

export interface FlowActions {
    onInit: () => void;
    onEdgesChange: OnEdgesChange;
    onNodesDelete: (nodes: GadgetNode[]) => void;
    onEdgesDelete: (edges: Edge[]) => void;
    onConnectStart: (event: MouseEvent | TouchEvent, params: OnConnectStartParams) => void;
    onConnect: OnConnect;
    onNodeDrag: OnNodeDrag<GadgetNode>
    onNodeDragStop: (event: React.MouseEvent, node: GadgetNode) => void;
};

export type FlowSlice = FlowUtilitiesSlice & FlowActions

export const flowSlice: CreateStateWithInitialValue<FlowStateInitializedFromData, FlowSlice> = (initialState, set, get) => {
    return {
        ...flowUtilitiesSlice(initialState, set, get),

        onInit() {
            const initialViewPortSetting = get().setup.settings.initialViewportSetting
            initViewport(get().rf, initialViewPortSetting)
            get().updateLogicalState([])
        },

        onEdgesChange: (changes: EdgeChange<Edge>[]) => {
            set({ edges: applyEdgeChanges(changes, get().edges), });
        },

        onNodesDelete: (nodes: GadgetNode[]) => {
            nodes.forEach((node) => get().removeGadgetNode(node))
        },

        onEdgesDelete: (edges: Edge[]) => {
            const events = edges.map(edge => ({ ConnectionRemoved: toGadgetConnection(edge as Connection) }))
            get().updateLogicalState(events)
        },

        onConnectStart: (event: MouseEvent | TouchEvent, params: OnConnectStartParams) => {
            if (params.handleType === "target") {
                const events = get().removeEdgesConnectedToHandle(params.handleId!)
                get().updateLogicalState(events)
            }
            // disableHoleFocus()
            // props.setUserIsDraggingOrNavigating(true)
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

        onNodeDrag(event: React.MouseEvent, node: GadgetNode) {
            const proximityConnection = get().getProximityConnection(node.id)
            if (proximityConnection) {
                set({ connectingHandles: [proximityConnection.sourceHandle, proximityConnection.targetHandle] })
            } else {
                set({ connectingHandles: [] })
            }
        },

        onNodeDragStop(event, node) {
            if (isAboveGadgetShelf({ x: event.clientX, y: event.clientY })) {
                get().handleGadgetDraggedAboveShelf(node)
            } else {
                get().handleGadgetDragStopAwayFromShelf(node)
            }
        },

    }
}