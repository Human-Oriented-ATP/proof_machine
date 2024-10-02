import { GameEvent } from "lib/study/GameHistory"
import { AdjustablePosition, DragIndicatorProps } from "./DragIndicator";
import { InitialDiagram } from "lib/game/Initialization";
import { InitialViewportSetting } from "lib/util/ReactFlow";

export type LevelConfiguration = {
    zoomEnabled: boolean
    proximityConnectEnabled: boolean
    gadgetDeletionEnabled: boolean
    panEnabled?: boolean
    initialViewportSetting?: InitialViewportSetting
    showBrokenConnectionStatusBarMessage?: boolean
}

export type GadgetSelector = { elementId: string } | { axiom: string }

export interface GadgetPosition extends AdjustablePosition {
    gadget: GadgetSelector
}

export type JsxAndDragIndicator = {
    jsx?: JSX.Element
    dragIndicator?: DragIndicatorProps<GadgetPosition>
}

export type InteractiveStep = {
    trigger?: GameEvent
    content: JsxAndDragIndicator
}

export type InteractiveLevel = {
    settings?: LevelConfiguration
    initialDiagram?: InitialDiagram
    steps: InteractiveStep[]
}