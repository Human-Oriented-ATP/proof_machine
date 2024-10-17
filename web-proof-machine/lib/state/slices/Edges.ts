import { EdgeWithEquationId } from 'components/game/diagram/CustomEdge';
import { CreateStateWithInitialValue } from '../Types';
import { Connection, Edge } from '@xyflow/react';
import { getNodePositionFromHandle } from 'components/game/gadget/Node';
import { OUTPUT_POSITION } from 'lib/game/Primitives';
import { GadgetConnection } from './History';

export interface EdgeState {
    edges: Edge[],
}

export interface EdgeActions {
    isSatisfied: (edgeId: string) => boolean
    removeEdgesConnectedToNode: (nodeId: string) => Edge[];
    removeEdgesConnectedToHandle: (handleId: string) => Edge[];
    getHandlesOfEdge: (edgeId: string) => { sourceHandle: string, targetHandle: string };
};

export type EdgeSlice = EdgeState & EdgeActions

function isSatisfied(edge: Edge) {
    return !edge.animated;
}

export function isValidConnection(connection: Connection): connection is { source: string, target: string, sourceHandle: string; targetHandle: string } {
    return connection.sourceHandle !== null && connection.targetHandle !== null;
}

export function connectionToGadgetConnection(connection: Connection): GadgetConnection {
    if (!isValidConnection(connection)) throw Error(`Connection is not valid ${connection}`)
    const sourcePosition = getNodePositionFromHandle(connection.sourceHandle)
    const targetPosition = getNodePositionFromHandle(connection.targetHandle)
    if (sourcePosition === OUTPUT_POSITION) {
        return {
            from: connection.source,
            to: [connection.source, targetPosition]
        }
    } else {
        return {
            from: connection.target,
            to: [connection.source, sourcePosition]
        }
    }
}

export const edgeSlice: CreateStateWithInitialValue<EdgeState, EdgeSlice> = (initialState, set, get) => {
    return {
        edges: initialState.edges,
        isSatisfied: (edgeId: string) => {
            const edge = get().edges.find((edge) => edge.id === edgeId);
            if (edge === undefined) throw Error(`Trying to look for edge that does not exist: ${edgeId}`);
            return isSatisfied(edge);
        },
        getHandlesOfEdge: (edgeId: string) => {
            const edge = get().edges.find((edge) => edge.id === edgeId);
            if (edge === undefined) throw Error(`Trying to look for edge that does not exist: ${edgeId}`);
            if (!edge.sourceHandle || !edge.targetHandle)
                throw Error(`Edge is missing a source or target handle: ${edgeId} with source ${edge.sourceHandle} and target ${edge.targetHandle}`);
            return {
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle
            }
        },
        removeEdgesConnectedToNode: (nodeId: string) => {
            const edgesToBeRemoved = get().edges.filter((edge) => edge.source === nodeId || edge.target === nodeId);
            set({
                edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
            });
            return edgesToBeRemoved
        },
        removeEdgesConnectedToHandle: (handleId: string) => {
            const edgesToBeRemoved = get().edges.filter((edge) => edge.sourceHandle === handleId || edge.targetHandle === handleId);
            set({
                edges: get().edges.filter((edge) => edge.sourceHandle !== handleId && edge.targetHandle !== handleId),
            });
            return edgesToBeRemoved
        }
    }
}
