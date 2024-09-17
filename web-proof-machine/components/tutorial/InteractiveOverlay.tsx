import { DelayedDragIndicator, DragIndicatorProps, OverlayPosition } from "./DragIndicator";
import { TextAndDragIndicator, InteractiveLevel, InteractiveStep, GadgetPosition, GadgetSelector } from "./InteractiveLevel";
import { interactiveTutorialLevels as interactiveTutorialLevels } from "./InteractiveTutorialLevels";

// const origin: OverlayPosition = {
//     elementId: "gadget2",
//     anchorPoint: "CENTER_RIGHT",
//     offset: { x: -5, y: -1 }
// }

// const destination: OverlayPosition = {
//     elementId: "goal_gadget",
//     anchorPoint: "CENTER_LEFT",
//     offset: { x: 5, y: 0 }
// }

export interface InteractiveOverlayProps {
    interactiveSteps: InteractiveStep[]
    stepIndex: number
    hideInteractiveContent?: boolean
    getGadgetElementId: (gadget: GadgetSelector) => string | undefined
}

export interface InteractiveContentProps {
    content: TextAndDragIndicator
    getGadgetElementId: (gadget: GadgetSelector) => string | undefined
    hideInteractiveContent?: boolean
}

export function InteractiveContent(props: InteractiveContentProps) {
    function toOverlayPosition(position: GadgetPosition): OverlayPosition {
        const elementId = props.getGadgetElementId(position.gadget)
        if (!elementId) {
            throw new Error(`Element not found for gadget ${position.gadget}`)
        } else {
            return { elementId, anchorPoint: position.anchorPoint, offset: position.offset }
        }
    }

    function getDragIndicatorProps(dragIndicator: DragIndicatorProps<GadgetPosition>): DragIndicatorProps<OverlayPosition> {
        return {
            origin: toOverlayPosition(dragIndicator.origin),
            destination: "absolutePosition" in dragIndicator.destination ?
                { absolutePosition: toOverlayPosition(dragIndicator.destination.absolutePosition) }
                : dragIndicator.destination,
            drawLine: dragIndicator.drawLine
        }
    }

    return <div>
        <div className="absolute text-xl top-24 left-44 md:w-full md:text-center md:left-0 md:px-44">
            {props.content.text}
        </div>
        {props.content.dragIndicator && !props.hideInteractiveContent && <DelayedDragIndicator {...getDragIndicatorProps(props.content.dragIndicator)} />}
    </div>
}

export function InteractiveOverlay(props: InteractiveOverlayProps) {
    const step: InteractiveStep = props.interactiveSteps[props.stepIndex]
    const content = step.content
    return <div className="fixed left-0 top-0 w-full h-full z-50 pointer-events-none">
        <InteractiveContent content={content} hideInteractiveContent={props.hideInteractiveContent} getGadgetElementId={props.getGadgetElementId} />
    </div>
}
