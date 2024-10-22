import { applyNodeChanges, NodeChange, OnNodesChange } from '@xyflow/react';
import { GadgetNode } from '../../../components/game/flow/GadgetFlowNode';
import { CreateStateWithInitialValue } from '../Types';
import { gadgetDndFromShelfSlice, GadgetDndFromShelfSlice } from './DragGadgetFromShelf';
import { Term } from 'lib/game/Term';
import { getTermOfHandle, makeHandleId } from 'lib/game/Handles';
import { ConnectorStatus } from 'components/game/gadget/Connector';
import { OUTPUT_POSITION } from 'lib/game/CellPosition';

export type NodeStateInitializedFromData = {
    nodes: GadgetNode[],
}

export type NodeState = {
    handleStatus: Map<string, ConnectorStatus>
    connectingHandles: string[]
}

export interface NodeActions {
    onNodesChange: OnNodesChange<GadgetNode>;
    getGadgetNodeOfHandle: (handleId: string) => GadgetNode;
    getTermOfHandle: (handleId: string) => Term;
    abortAddingGadget: () => void;
    getInputHandlesOfNode: (nodeId: string) => string[];
    getNode(nodeId: string): GadgetNode;
};

export type NodeSlice = GadgetDndFromShelfSlice & NodeStateInitializedFromData & NodeState & NodeActions

function hasHandle(node: GadgetNode, handleId: string): boolean {
    const handles = node.handles;
    if (handles === undefined) return false;
    return handles.some((handle) => handle.id === handleId);
}

function newGadgetNodeHasBeenInitialized(nodeChanges: NodeChange[]) {
    return nodeChanges.length === 1 && nodeChanges[0].type === "dimensions"
}

export const nodeSlice: CreateStateWithInitialValue<NodeStateInitializedFromData, NodeSlice> = (initialState: NodeStateInitializedFromData, set, get): NodeSlice => {
    return {
        ...gadgetDndFromShelfSlice(set, get),
        nodes: initialState.nodes,
        handleStatus: new Map<string, ConnectorStatus>(),
        connectingHandles: [],

        onNodesChange: (changes) => {
            if (newGadgetNodeHasBeenInitialized(changes)) {
                get().initializeSyntheticDraggging()
            }
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },

        getGadgetNodeOfHandle(handleId: string): GadgetNode {
            const node = get().nodes.find((node) => hasHandle(node, handleId));
            if (node === undefined) throw Error(`Trying to look for handle that does not exist: ${handleId}`);
            return node
        },

        getTermOfHandle(handleId: string): Term {
            const node = get().getGadgetNodeOfHandle(handleId)
            const terms = node.data.terms
            return getTermOfHandle(handleId, terms)
        },

        abortAddingGadget: () => {
            const { gadgetBeingDraggedFromShelf } = get();
            if (gadgetBeingDraggedFromShelf !== undefined) {
                const { id } = gadgetBeingDraggedFromShelf
                set({ nodes: get().nodes.filter((node) => node.id !== id), });
            }
            set({ gadgetBeingDraggedFromShelf: undefined });
        },

        getNode: (nodeId: string): GadgetNode => {
            const node = get().nodes.find((node) => node.id === nodeId);
            if (node === undefined)
                throw Error(`Trying to look for node that does not exist: ${nodeId}`);
            return node
        },

        getInputHandlesOfNode: (nodeId: string): string[] => {
            const node = get().getNode(nodeId)
            const inputPositions = Array.from(node.data.terms.keys()).filter((position) => position !== OUTPUT_POSITION)
            const inputHandles = inputPositions.map((position) => makeHandleId(position, node.data.id))
            return inputHandles
        }

    }
}