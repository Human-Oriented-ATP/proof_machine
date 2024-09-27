import { Connector } from "components/game/gadget/Connector";
import { DragIndicatorProps, OverlayPosition } from "./DragIndicator";
import { GadgetPosition, InteractiveLevel } from "./InteractiveLevel";
import { InitialDiagram } from "lib/game/Initialization";
import { parseAxiom, parseTerm } from "lib/parsing/Semantics";

const firstAxiomDragPoint: GadgetPosition = {
    gadget: { elementId: "axiom_1" },
    anchorPoint: "BOTTOM_RIGHT",
    offset: { x: -20, y: -20 }
}

const dragFirstAxiomOut: DragIndicatorProps<GadgetPosition> = {
    origin: firstAxiomDragPoint,
    destination: { relativePosition: { x: 200, y: 200 } },
    drawLine: false
}

const connectGadgets: DragIndicatorProps<GadgetPosition> = {
    origin: {
        gadget: { axiom: ":-r(1)" },
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

const TUTORIAL_SETTINGS = {
    zoomEnabled: false,
    proximityConnectEnabled: false,
    gadgetDeletionEnabled: false
}

const initialDiagram: InitialDiagram = { 
    gadgets: new Map([
        ["axiom_1", { statement: {axiom: parseAxiom("r(1, 2, 3).")}, position: { x: -100, y: -30 } }],
        ["goal_gadget", { statement: { goal: parseTerm("y(12)") }, position: { x: 0, y: 0 } }]
    ]),
    connections: [
        { from: "axiom_1", to: ["goal_gadget", 0] }
    ]
}

const tutorial01: InteractiveLevel = {
    settings: TUTORIAL_SETTINGS,
    initialDiagram: initialDiagram,
    steps: [{
        content: {
            jsx: <>Drag the matching gadget onto the building area. Example of a connector: <Connector type={"source"} isInline={true}/></>,
            dragIndicator: dragFirstAxiomOut
        },
        trigger: { GadgetAdded: { axiom: ":-r(1)"} }
    }, {
        content: {
            jsx: <>"Now draw a line between the connectors"</>,
            dragIndicator: connectGadgets
        },
        trigger: { EquationAdded: {} }
    }, {
        content: {
            jsx: <>"Well done!"</>
        }
    }]
}

const tutorial02: InteractiveLevel = {
    settings: TUTORIAL_SETTINGS,
    steps: []
}

export const interactiveTutorialLevels: Map<string, InteractiveLevel> = new Map([
    ["tutorial01", tutorial01],
    ["tutorial02", tutorial02]
])