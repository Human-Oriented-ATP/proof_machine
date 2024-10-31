import { CreateStateWithInitialValue } from "../Types"
import { GameEvent, HistorySlice, historySlice, HistoryState, HistoryStateInitializedFromData } from "./History";

export type TutorialStateInitializedFromData = HistoryStateInitializedFromData

export type TutorialState = HistoryState & {
    tutorialStep: number
}

export type TutorialActions = {
    advanceTutorialState: (event: GameEvent) => void
}

export type TutorialSlice = TutorialStateInitializedFromData & HistorySlice & TutorialState & TutorialActions

export const tutorialSlice: CreateStateWithInitialValue<TutorialStateInitializedFromData, TutorialSlice> = (initialState, set, get): TutorialSlice => {
    return {
        ...historySlice(initialState, set, get),
        tutorialStep: 0,

        advanceTutorialState: (event: GameEvent) => {
        },
    }
}
