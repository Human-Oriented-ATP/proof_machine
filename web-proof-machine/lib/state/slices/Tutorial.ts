import { Trigger } from "components/tutorial/InteractiveLevel";
import { CreateStateWithInitialValue } from "../Types"
import { GameEvent, HistorySlice, historySlice, HistoryState, HistoryStateInitializedFromData } from "./History";

export type TutorialStateInitializedFromData = HistoryStateInitializedFromData

export type TutorialState = HistoryState & {
    tutorialStep: number
}

export type TutorialActions = {
    triggers: (event: GameEvent, trigger: Trigger) => boolean
    getCurrentTrigger: () => Trigger | undefined
    advanceTutorial: (event: GameEvent) => void
    advanceTutorialWithEvents: (events: GameEvent[]) => void
}

export type TutorialSlice = TutorialStateInitializedFromData & HistorySlice & TutorialState & TutorialActions

export const tutorialSlice: CreateStateWithInitialValue<TutorialStateInitializedFromData, TutorialSlice> = (initialState, set, get): TutorialSlice => {
    return {
        ...historySlice(initialState, set, get),
        tutorialStep: 0,

        triggers: (event: GameEvent, trigger: Trigger): boolean => {
            return false
        },
        getCurrentTrigger: () => {
            const currentStep = get().setup.tutorialSteps[get().tutorialStep]
            return currentStep?.trigger
        },
        advanceTutorial: (event: GameEvent) => {
            const trigger = get().getCurrentTrigger()
            if (trigger) {
                if (get().triggers(event, trigger)) {
                    set(state => ({ ...state, tutorialStep: state.tutorialStep + 1 }))
                }
            }
        },
        advanceTutorialWithEvents: (events: GameEvent[]) => {
            events.forEach(event => get().advanceTutorial(event))
        },
    }
}