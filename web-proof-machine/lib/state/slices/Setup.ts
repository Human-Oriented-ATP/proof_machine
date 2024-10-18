import { LevelConfiguration, InteractiveStep } from 'components/tutorial/InteractiveLevel';
import { InitialDiagram } from 'lib/game/Initialization';
import { Axiom } from 'lib/game/Primitives';
import { CreateStateWithInitialValue } from '../Types';

export type ReadonlyGameSetup = {
    initialDiagram: InitialDiagram;
    axioms: Axiom[];
    settings: LevelConfiguration;
    tutorialSteps: InteractiveStep[];
    problemId?: string;
    nextProblem?: string;
    configurationIdentifier?: string;
};

export type SetupReadonlyState = {
    setup: ReadonlyGameSetup
}

export const setupSlice = (initialState: SetupReadonlyState) => {
    return {
        ...initialState
    }
}