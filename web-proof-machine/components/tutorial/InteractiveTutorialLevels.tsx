import { DragIndicatorProps, OverlayPosition } from "./DragIndicator";
import { GadgetPosition, InteractiveLevel } from "./InteractiveLevel";

const myOrigin: GadgetPosition = {
    gadget: { elementId: "axiom_1" },
    anchorPoint: "BOTTOM_RIGHT",
    offset: { x: -20, y: -20 }
}

const dragIndicator1: DragIndicatorProps<GadgetPosition> = {
    origin: myOrigin,
    destination: { relativePosition: { x: 200, y: 200 } },
    drawLine: false
}

const dragIndicator2: DragIndicatorProps<GadgetPosition> = {
    origin: {
        gadget: { axiom: ":-r(A)" },
        anchorPoint: "CENTER_RIGHT",
        offset: { x: 0, y: 0 }
    },
    destination: {
        absolutePosition: {
            gadget: { elementId: "goal_gadget" },
            anchorPoint: "CENTER_LEFT",
            offset: { x: 0, y: 0 }
        }
    },
    drawLine: true
}
export const interactiveTutorialLevels: Map<string, InteractiveLevel> = new Map([
    ["tutorial01", {
        steps: [
            {
                trigger: { GadgetAdded: {} },
                content: {
                    text: "Drag the gadget onto the building area",
                    dragIndicator: dragIndicator1
                }
            },
            {
                trigger: { EquationAdded: {} },
                content: {
                    text: "Now draw a line between the connectors",
                    dragIndicator: dragIndicator2
                }
            },
            {
                content: {
                    text: "Well done!"
                }
            }
        ]
    }]
])