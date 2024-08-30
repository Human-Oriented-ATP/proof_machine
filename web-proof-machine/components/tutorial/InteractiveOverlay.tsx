import { DelayedDragIndicator, OverlayPosition } from "./DragIndicator";

const origin: OverlayPosition = {
    elementId: "gadget2",
    anchorPoint: "CENTER_RIGHT",
    offset: { x: -5, y: -1 }
}

const destination: OverlayPosition = {
    elementId: "goal_gadget",
    anchorPoint: "CENTER_LEFT",
    offset: { x: 5, y: 0 }
}

export interface InteractiveOverlayProps {
    hideInteractiveContent?: boolean
}

export function InteractiveOverlay(props: InteractiveOverlayProps) {
    return <div className="fixed left-0 top-0 w-full h-full z-50 pointer-events-none">
        {props.hideInteractiveContent ? <></> : <DelayedDragIndicator origin={origin}
            destination={{ absolutePosition: destination }}
            drawLine={true} />}
    </div>
}