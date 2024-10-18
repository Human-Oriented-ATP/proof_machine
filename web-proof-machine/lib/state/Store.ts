import { createStore } from 'zustand'

import { FlowSlice, flowSlice, FlowState } from './slices/Flow';
import { InteractiveStep, LevelConfiguration } from 'components/tutorial/InteractiveLevel';
import { Axiom } from 'lib/game/Primitives';

export type ReadonlyGameSetup = {
    problemId?: string,
    nextProblem?: string,
    configurationIdentifier?: string
    settings: LevelConfiguration
    axioms: Axiom[]
    tutorialSteps: InteractiveStep[]
}

export type GameState = FlowState & {
    setup: ReadonlyGameSetup
}

export type GameSlice = GameState & FlowSlice

export type GameStore = ReturnType<typeof createGameStore>

export const createGameStore = (initialState: GameState) => {
    return createStore<GameSlice>()((set, get) => ({
        ...initialState,
        ...flowSlice(initialState, set, get),
    }))
}

