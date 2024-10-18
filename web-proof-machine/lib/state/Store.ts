import { createStore } from 'zustand'

import { FlowSlice, flowSlice, FlowState } from './slices/Flow';

export type GameState = FlowState
export type GameSlice = FlowSlice

export type GameStore = ReturnType<typeof createGameStore>

export const createGameStore = (initialState: FlowState) => {
    return createStore<GameSlice>()((set, get) => ({
        ...initialState,
        ...flowSlice(initialState, set, get),
    }))
}

