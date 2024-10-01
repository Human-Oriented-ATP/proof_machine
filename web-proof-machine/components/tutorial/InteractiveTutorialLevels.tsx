import { Connector } from "components/game/gadget/Connector";
import { DragIndicatorProps, OverlayPosition } from "./DragIndicator";
import { GadgetPosition, InteractiveLevel } from "./InteractiveLevel";
import { InitialDiagram } from "lib/game/Initialization";
import { parseAxiom, parseStatement, parseTerm } from "lib/parsing/Semantics";

function SourceConnector() { 
    return <div className="inline-block translate-y-[-2px]"><Connector type={"source"} isInline={true}/></div>
}

function TargetConnector() { 
    return <div className="inline-block translate-y-[-2px]"><Connector type={"target"} isInline={true}/></div>
}

const RESTRICTIVE_SETTINGS = {
    zoomEnabled: false,
    proximityConnectEnabled: false,
    gadgetDeletionEnabled: false
}

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
        offset: { x: -4, y: 0 }
    },
    destination: {
        absolutePosition: {
            gadget: { elementId: "goal_gadget" },
            anchorPoint: "CENTER_LEFT",
            offset: { x: 3, y: 0 }
        }
    },
    drawLine: true
}

const tutorial01: InteractiveLevel = {
    settings: RESTRICTIVE_SETTINGS,
    steps: [{
        content: {
            jsx: <>Drag the matching gadget from the shelf onto the work bench</>,
            dragIndicator: dragFirstAxiomOut
        },
        trigger: { GadgetAdded: { axiom: ":-r(1)"} }
    }, {
        content: {
            jsx: <>Now draw a line between the connectors <SourceConnector/> and <TargetConnector/></>,
            dragIndicator: connectGadgets
        },
        trigger: { ConnectionAdded: {} }
    }, {
        content: {
            jsx: <>Well done!</>
        }
    }]
}

const tutorial02InitialDiagram : InitialDiagram = { 
    gadgets: new Map([
        ["goal_gadget", { statement: { goal: parseTerm("r(1, 2)") }, position: {x : -300, y: 0}}],
        ["initial_gadget_1", { statement: { axiom: parseAxiom("r(2, 1).") }, position: {x : -600, y: -50}}],   
    ]),
    connections: [ {
        from: "initial_gadget_1",
        to: ["goal_gadget", 0]
    } ]
}

const tutorial02DragIndicatorDeleteConnection : DragIndicatorProps<GadgetPosition> = {
    origin: {
        gadget: { elementId: "goal_gadget" },
        anchorPoint: "CENTER_LEFT",
        offset: { x: 0, y: 0}
    },
    destination: { relativePosition: { x: -30, y: 0 } },
    drawLine: false,
}

const tutorial02DragIndicatorAddSwapGadget : DragIndicatorProps<GadgetPosition> = {
    origin: {
        gadget: { elementId: "axiom_2" },
        anchorPoint: "BOTTOM_RIGHT",
        offset: { x: -20, y: -20 }
    },
    destination: { relativePosition: { x: 200, y: 200 } },
    drawLine: false,
}


const tutorial02: InteractiveLevel = {
    settings: RESTRICTIVE_SETTINGS,
    initialDiagram: tutorial02InitialDiagram, 
    steps: [{
        content: { 
            jsx: <>hiya</>,
            dragIndicator: tutorial02DragIndicatorDeleteConnection
        },
        trigger: { ConnectionRemoved: {} }
    }, { 
        content: {
            jsx: <>Try using this gadget to swap the numbers</>,
            dragIndicator: tutorial02DragIndicatorAddSwapGadget
        },
        trigger: { GadgetAdded: { axiom: "r(B, A):-r(A, B)"} } 
    },
    { 
        content: { 
            jsx: <>Well done!</>
        }
    }]
}

export const interactiveTutorialLevels: Map<string, InteractiveLevel> = new Map([
    ["tutorial01", tutorial01],
    ["tutorial02", tutorial02]
])