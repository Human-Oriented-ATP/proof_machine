import { createStore } from 'zustand'
import { FlowSlice, flowSlice, FlowStateInitializedFromData } from './slices/Flow'
import { HelpPopupSlice, helpPopupSlice } from './slices/HelpPopup'
import { HoleFocusSlice, holeFocusSlice } from './slices/HoleFocus'

export type GameStateInitializedFromData = FlowStateInitializedFromData
export type GameSlice = FlowSlice & HelpPopupSlice & HoleFocusSlice

export type GameStore = ReturnType<typeof createGameStore>

export const createGameStore = (initialState: GameStateInitializedFromData) => {
    return createStore<GameSlice>()((set, get) => ({
        ...initialState,
        ...flowSlice(initialState, set, get),
        ...helpPopupSlice(set),
        ...holeFocusSlice(set),
    }))
}
