import { Trigger } from "components/tutorial/InteractiveLevel";
import { CreateStateWithInitialValue } from "../Types"
import { GameEvent, HistorySlice, historySlice, HistoryState, HistoryStateInitializedFromData } from "./History";

export type TutorialStateInitializedFromData = HistoryStateInitializedFromData

export type TutorialState = HistoryState & {
    tutorialStep: number
    displayAnimatedTutorialContent: boolean
}

export type TutorialActions = {
    triggers: (event: GameEvent, trigger: Trigger) => boolean
    getCurrentTrigger: () => Trigger | undefined
    advanceTutorial: (event: GameEvent) => void
    advanceTutorialWithEvents: (events: GameEvent[]) => void
    hideAnimatedTutorialContent: () => void
    showAnimatedTutorialContent: () => void
}

export type TutorialSlice = TutorialStateInitializedFromData & HistorySlice & TutorialState & TutorialActions

export const tutorialSlice: CreateStateWithInitialValue<TutorialStateInitializedFromData, TutorialSlice> = (initialState, set, get): TutorialSlice => {
    return {
        ...historySlice(initialState, set, get),
        tutorialStep: 0,
        displayAnimatedTutorialContent: false,

        triggers: (event: GameEvent, trigger: Trigger): boolean => {
            const [type] = Object.keys(trigger)

            switch (type) {
                case "GameCompleted":
                    return "GameCompleted" in event
                case "GadgetAdded":
                    return "GadgetAdded" in event
                case "ConnectionAdded":
                    return "ConnectionAdded" in event
                case "GadgetRemoved":
                    return "GadgetRemoved" in event
                case "ConnectionRemoved":
                    return "ConnectionRemoved" in event
            }
            throw Error(`Invalid trigger in tutorial specification: ${trigger}`)
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

        hideAnimatedTutorialContent: () => {
            set({ displayAnimatedTutorialContent: false })
        },

        showAnimatedTutorialContent: () => {
            set({ displayAnimatedTutorialContent: true })
        }
    }
}
