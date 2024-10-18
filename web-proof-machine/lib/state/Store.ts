import { createStore } from 'zustand'

import { FlowSlice, flowSlice, FlowState } from './slices/Flow';
import { StudyConfiguration } from 'lib/study/Types';
import { InteractiveStep, LevelConfiguration } from 'components/tutorial/InteractiveLevel';
import { Axiom } from 'lib/game/Primitives';

export type ReadonlyGameSetup = {
    problemId: string
    configuration: StudyConfiguration // alternatively: nextProblemId, configurationName ??
    settings: LevelConfiguration
    axioms: Axiom[]
    tutorialSteps: InteractiveStep[]
}

export type GameState = FlowState & {
    setup?: ReadonlyGameSetup
}

export interface GameSlice extends FlowSlice {
};

export type GameStore = ReturnType<typeof createGameStore>

export const createGameStore = (initialState: GameState) => {
    return createStore<GameSlice>()((set, get) => ({
        ...initialState,
        ...flowSlice(initialState, set, get),
    }))
}

