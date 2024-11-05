import { createStore } from 'zustand'
import { FlowSlice, flowSlice, FlowStateInitializedFromData } from './slices/Flow'
import { HelpPopupSlice, helpPopupSlice } from './slices/HelpPopup'
import { devtools } from 'zustand/middleware'

export type GameStateInitializedFromData = FlowStateInitializedFromData
export type GameSlice = FlowSlice & HelpPopupSlice

export type GameStore = ReturnType<typeof createGameStore>

export const createGameStore = (initialState: GameStateInitializedFromData) => {
    return createStore<GameSlice>()(devtools((set, get) => ({
        ...initialState,
        ...flowSlice(initialState, set, get),
        ...helpPopupSlice(set),
    })))
}
