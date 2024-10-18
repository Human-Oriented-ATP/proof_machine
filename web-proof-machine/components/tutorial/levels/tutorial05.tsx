import { InitialDiagram } from "lib/game/Initialization";
import { parseTerm, parseAxiom } from "lib/parsing/Semantics";
import { GadgetPosition, InteractiveLevel } from "../InteractiveLevel";
import { DELETE_ONLY_SETTINGS } from "../InteractiveLevel";
import { DragIndicatorProps } from "../DragIndicator";

const tutorial05InitialDiagram: InitialDiagram = {
    gadgets: new Map([
        ["goal_gadget", { statement: { goal: parseTerm("r(1, 4)") }, position: { x: 0, y: 0 } }],
        ["initial_gadget_1", { statement: { axiom: parseAxiom("g(X, Y, Z, W) :- b(X, Y, Z, W), g(X, Z, W, Y).") }, position: { x: -60, y: -75 } }],
        ["initial_gadget_2", { statement: { axiom: parseAxiom("g(X, Y, Z, W) :- b(X, Y, Z, W), g(X, Z, W, Y).") }, position: { x: -75, y: 50 } }],
        ["initial_gadget_3", { statement: { axiom: parseAxiom("g(X, Y, Z, W) :- b(X, Y, Z, W), g(X, Z, W, Y).") }, position: { x: -90, y: -150 } }]
    ]),
    connections: []
};

const dragOverGadgetShelf: DragIndicatorProps<GadgetPosition> = {
    origin: { gadget: { elementId: "initial_gadget_3" }, anchorPoint: "CENTER_MIDDLE", offset: { x: 0, y: 0 } },
    destination: { absolutePosition: { gadget: { elementId: "gadget_shelf" }, anchorPoint: "CENTER_MIDDLE", offset: { x: 0, y: 0 } } },
    drawLine: false
};

export const tutorial05: InteractiveLevel = {
    settings: DELETE_ONLY_SETTINGS,
    initialDiagram: tutorial05InitialDiagram,
    steps: [{
        content: {
            jsx: <>What chaos! Drag gadgets over the gadget shelf to delete them.</>,
            dragIndicator: dragOverGadgetShelf
        },
        trigger: { GadgetRemoved: {} }
    }, {
        content: {
            jsx: <>Well done! Remove the other gadgets in the same way.</>,
        },
        trigger: { GadgetRemoved: {} }
    }, {
        content: {
            jsx: <>Well done! Remove the other gadgets in the same way.</>,
        },
        trigger: { GadgetRemoved: {} }
    }, {
        content: {
            jsx: <>That's better, now solve the level!</>,
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
