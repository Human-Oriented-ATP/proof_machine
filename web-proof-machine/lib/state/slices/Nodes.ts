import { applyNodeChanges, Connection, NodeChange, OnNodesChange } from '@xyflow/react';
import { GadgetNode } from '../../../components/game/diagram/GadgetFlowNode';
import { CreateStateWithInitialValue } from '../Types';
import { gadgetDndFromShelfSlice, GadgetDndFromShelfSlice, GadgetDndFromShelfState } from './DragGadgetFromShelf';
import { Term } from 'lib/game/Term';
import { getNodePositionFromHandle, getTermOfHandle, isTargetHandle } from 'components/game/gadget/Node';
import { GadgetConnection } from './History';
import { OUTPUT_POSITION } from 'lib/game/Primitives';

export type NodeState = {
    nodes: GadgetNode[],
}

export interface NodeActions {
    onNodesChange: OnNodesChange<GadgetNode>;
    getGadgetNodeOfHandle: (handleId: string) => GadgetNode;
    getTermOfHandle: (handleId: string) => Term;
};

export type NodeSlice = GadgetDndFromShelfSlice & NodeState & NodeActions

function hasHandle(node: GadgetNode, handleId: string): boolean {
    const handles = node.handles;
    if (handles === undefined) return false;
    return handles.some((handle) => handle.id === handleId);
}

function newGadgetNodeHasBeenInitialized(nodeChanges: NodeChange[]) {
    return nodeChanges.length === 1 && nodeChanges[0].type === "dimensions"
}

export const nodeSlice: CreateStateWithInitialValue<NodeState, NodeSlice> = (initialState: NodeState, set, get): NodeSlice => {
    return {
        ...gadgetDndFromShelfSlice(set, get),
        nodes: initialState.nodes,
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
    }
}