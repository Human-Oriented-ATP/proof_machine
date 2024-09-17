import { GameEvent } from "lib/study/GameHistory"
import { AdjustablePosition, DragIndicatorProps } from "./DragIndicator";

export type LevelConfiguration = {
    zoomEnabled: boolean
    proximityConnectEnabled: boolean
    gadgetDeletionEnabled: boolean
}

export type GadgetSelector = { elementId: string } | { axiom: string }

export interface GadgetPosition extends AdjustablePosition {
    gadget: GadgetSelector
}

export type TextAndDragIndicator = {
    text?: string
    dragIndicator?: DragIndicatorProps<GadgetPosition>
}

export type InteractiveStep = {
    trigger?: GameEvent
    content: TextAndDragIndicator
}

export type InteractiveLevel = {
    settings?: LevelConfiguration
    steps: InteractiveStep[]
}