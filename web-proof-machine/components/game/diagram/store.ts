import { create } from 'zustand'

import { addEdge, applyNodeChanges, applyEdgeChanges, Edge as EdgeWithEquation, OnNodesChange, OnEdgesChange, OnConnect } from '@xyflow/react';
import { GadgetNode } from './GadgetFlowNode';

type AppState = {
    nodes: GadgetNode[];
    edges: EdgeWithEquation[];
    onNodesChange: OnNodesChange<GadgetNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: GadgetNode[]) => void;
    setEdges: (edges: EdgeWithEquation[]) => void;
};

export const initialNode: GadgetNode = {
    id: 'gadget1',
    type: 'gadgetNode',
    data: {
        id: 'mygadget11',
        terms: new Map([[-1, { label: 'r', args: [{variable: 'x'}] }]]),
        isAxiom: false,
        displayHoleFocus: false,
    },
    position: { x: 100, y: 100 },
}

const useStore = create<AppState>((set, get) => ({
    nodes: [initialNode],
    edges: [],
    somestate: "123",
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    setNodes: (nodes) => {
        set({ nodes });
    },
    setEdges: (edges) => {
        set({ edges });
    },
}));

export default useStore;
