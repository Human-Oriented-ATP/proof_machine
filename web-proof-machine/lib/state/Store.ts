import { createStore } from 'zustand'

import { FlowSlice, flowSlice, FlowStateInitializedFromData } from './slices/Flow';

export type GameStateInitializedFromData = FlowStateInitializedFromData
export type GameSlice = FlowSlice

export type GameStore = ReturnType<typeof createGameStore>

export const createGameStore = (initialState: GameStateInitializedFromData) => {
    return createStore<GameSlice>()((set, get) => ({
        ...initialState,
        ...flowSlice(initialState, set, get),
    }))
}

