import { GameEvent } from "lib/study/GameHistory"

export type TutorialSettings = {
    zoomEnabled: boolean
    proximityConnectEnabled: boolean
}

type MakeGadgetAddedFieldsOptional<T> = T extends { GadgetAdded: infer G }
    ? { GadgetAdded: Partial<G> }
    : T;

export type InteractiveStep = {
    trigger: MakeGadgetAddedFieldsOptional<GameEvent>
    content: string
}

export type InteractiveLevel = {
    settings: TutorialSettings
}