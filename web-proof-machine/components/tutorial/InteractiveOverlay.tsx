import { DragIndicator, OverlayPosition } from "./DragIndicator";

const origin: OverlayPosition = {
    object: "gadget2",
    objectPosition: "CENTER_RIGHT",
    offset: { x: -5, y: -1 }
}

const destination: OverlayPosition = {
    object: "goal_gadget",
    objectPosition: "CENTER_LEFT",
    offset: { x: 5, y: 0 }
}

export function InteractiveOverlay() {
    return <div className="fixed left-0 top-0 w-full h-full z-50 pointer-events-none">
        <DragIndicator origin={origin}
            moveTo={{ position: destination }}
            drawLine={false}
            duration={3500} />
    </div>
}