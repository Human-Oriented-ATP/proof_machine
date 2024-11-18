import { DragIndicatorProps } from "../DragIndicator";
import { GadgetPosition, InteractiveLevel, RESET_DISABLED } from "../InteractiveLevel";
import { GOAL_GADGET_ID } from 'lib/game/Primitives';
import { InitialDiagram } from "lib/game/Initialization";

const firstAxiomDragPoint: GadgetPosition = {
    elementId: "axiom_0",
    anchorPoint: "BOTTOM_RIGHT",
    offset: { x: -20, y: -20 }
};

const dragFirstAxiomOut: DragIndicatorProps<GadgetPosition> = {
    origin: firstAxiomDragPoint,
    destination: { relativePosition: { x: 280, y: 240 } },
};

const initialDiagram: InitialDiagram = {
    gadgets: new Map([
        [GOAL_GADGET_ID, { statement: ":-b(A)", position: { x: 0, y: 0 } }],
        ["initial_gadget_1", { statement: "b(A) :- r(A, 1), r(A, 1)", position: { x: -200, y: -40 } }],
    ]),
    connections: [{
        from: "initial_gadget_1",
        to: [GOAL_GADGET_ID, 0]
    }]
};

const connectGadgets1: DragIndicatorProps<GadgetPosition> = {
    origin: {
        gadget: { gadgetId: "g_0" },
        anchorPoint: "CENTER_RIGHT",
        offset: { x: -4, y: 0 }
    },
    destination: {
        absolutePosition: {
            elementId: "initial_gadget_1",
            anchorPoint: "CENTER_LEFT",
            offset: { x: 3, y: -38 }
        }
    },
    drawLine: true
};

const connectGadgets2: DragIndicatorProps<GadgetPosition> = {
    origin: {
        gadget: { gadgetId: "g_1" },
        anchorPoint: "CENTER_RIGHT",
        offset: { x: -4, y: 0 }
    },
    destination: {
        absolutePosition: {
            elementId: "initial_gadget_1",
            anchorPoint: "CENTER_LEFT",
            offset: { x: 3, y: 38 }
        }
    },
    drawLine: true
};

export const mystery_tutorial01: InteractiveLevel = {
    settings: RESET_DISABLED,
    initialDiagram: initialDiagram,
    steps: [{
        content: {
            jsx: <> Drag the mystery gadget from the shelf onto the work bench.</>,
            dragIndicator: dragFirstAxiomOut
        },
        trigger: { GadgetAdded: { axiom: "r(f(X), X)" } }
    }, {
        content: {
            jsx: <>The pink circle generates letters! Add another copy of the same gadget.</>,
        },
        trigger: { GadgetAdded: { axiom: "r(f(X), X)" } }
    }, {
        content: {
            jsx: <>See what happens when you make a connection.</>,
            dragIndicator: connectGadgets1
        },
        trigger: { ConnectionAdded: {} }
    }, {
        content: {
            jsx: <>The B changes into an A if the circle below it becomes a 1.</>,
            dragIndicator: connectGadgets2
        },
        trigger: { ConnectionAdded: {} }
    }, {
        content: {
            jsx: <>Well done!</>
        }
    }]
};
