import { createStore } from 'zustand'

import { addEdge, applyNodeChanges, applyEdgeChanges, Edge as EdgeWithEquation, OnNodesChange, OnEdgesChange, OnConnect } from '@xyflow/react';
import { GadgetNode } from '../../components/game/diagram/GadgetFlowNode';

export interface GameInitialState {
    nodes: GadgetNode[],
    edges: EdgeWithEquation[],
    gameIsCompleted: boolean,
    holeFocusVisible: boolean,
    tutorialStep: number
}

interface GameState extends GameInitialState {
    onNodesChange: OnNodesChange<GadgetNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addGadgetNode: (node: GadgetNode) => void;
    removeGadgetNode: (nodeId: string) => void;
};

export type GameStore = ReturnType<typeof createGameStore>

export const createGameStore = (initialState: GameInitialState) => {
    return createStore<GameState>()((set, get) => ({
        ...initialState,
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
        addGadgetNode: (node: GadgetNode) => {
            set({
                nodes: [...get().nodes, node],
            });
        },
        removeGadgetNode: (nodeId: string) => {
            set({
                nodes: get().nodes.filter((node) => node.id !== nodeId),
            });
        }
    }))
}
