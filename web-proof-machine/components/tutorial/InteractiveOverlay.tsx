import { DelayedDragIndicator, DragIndicatorProps, OverlayPosition } from "./DragIndicator";
import { TextAndDragIndicator, InteractiveLevel, InteractiveStep, GadgetPosition } from "./InteractiveLevel";
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
    interactiveLevel: InteractiveLevel
    step: number
    hideInteractiveContent?: boolean
}

function pickElementIdOfGadgetWithAxiom(axiom: string): string {
    throw Error("Not implemented")
    return ""
}

function getOverlayPosition(gadgetOverlayPosition: GadgetPosition) {
    const anchorPoint = gadgetOverlayPosition.anchorPoint
    const offset = gadgetOverlayPosition.offset
    if ("elementId" in gadgetOverlayPosition.gadget) {
        const elementId = gadgetOverlayPosition.gadget.elementId
        return { elementId, anchorPoint, offset }
    } else {
        const elementId = pickElementIdOfGadgetWithAxiom(gadgetOverlayPosition.gadget.axiom)
        return { elementId, anchorPoint, offset }
    }
}

export interface InteractiveContentProps {
    content: TextAndDragIndicator
    hideInteractiveContent?: boolean
}

function toOverlayPosition(position: GadgetPosition): OverlayPosition {
    if ("elementId" in position.gadget) {
        return { elementId: position.gadget.elementId, anchorPoint: position.anchorPoint, offset: position.offset }
    } else {
        throw Error("Not impemented")
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

export function InteractiveContent(props: InteractiveContentProps) {
    return <div>
        <div className="absolute text-xl top-24 left-44 md:w-full md:text-center md:left-0 md:px-44">
            {props.content.text}
        </div>
        {props.content.dragIndicator && !props.hideInteractiveContent && <DelayedDragIndicator {...getDragIndicatorProps(props.content.dragIndicator)} />}
    </div>
}

export function InteractiveOverlay(props: InteractiveOverlayProps) {
    const step: InteractiveStep = props.interactiveLevel.steps[props.step]
    const content = step.content
    return <div className="fixed left-0 top-0 w-full h-full z-50 pointer-events-none">
        <InteractiveContent content={content} hideInteractiveContent={props.hideInteractiveContent} />
    </div>
}
