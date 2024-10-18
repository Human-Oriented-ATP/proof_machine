import { Gadget } from "components/game/gadget/Gadget";
import { InitialDiagram } from "lib/game/Initialization";
import { parseTerm, parseAxiom } from "lib/parsing/Semantics";
import { DragIndicatorProps } from "../DragIndicator";
import { GadgetPosition, InteractiveLevel } from "../InteractiveLevel";
import { BrokenTargetConnector } from "../TutorialSetup";
import { RESTRICTIVE_SETTINGS } from "../InteractiveLevel";

const tutorial02InitialDiagram: InitialDiagram = {
    gadgets: new Map([
        ["goal_gadget", { statement: { goal: parseTerm("r(1, 2)") }, position: { x: -300, y: 0 } }],
        ["initial_gadget_1", { statement: { axiom: parseAxiom("r(2, 1).") }, position: { x: -600, y: -50 } }],
    ]),
    connections: [{
        from: "initial_gadget_1",
        to: ["goal_gadget", 0]
    }]
};

const tutorial02DragIndicatorDeleteConnection: DragIndicatorProps<GadgetPosition> = {
    origin: {
        gadget: { elementId: "goal_gadget" },
        anchorPoint: "CENTER_LEFT",
        offset: { x: 25, y: 30 }
    },
    destination: { relativePosition: { x: -25, y: -30 } },
    drawLine: false,
    endWithClick: true
};

function ConverterGadget() {
    return <div className="inline-block backdrop-blur-sm scale-75 align-middle">
        <Gadget id="tutorial_explanation"
            isAxiom={true}
            terms={new Map([[0, parseTerm("r(A, B)")], [-1, parseTerm("r(B, A)")]])} />
    </div>;
}

export const tutorial02: InteractiveLevel = {
    settings: { ...RESTRICTIVE_SETTINGS, initialViewportSetting: "FIT_INITIAL_DIAGRAM", showBrokenConnectionStatusBarMessage: false },
    initialDiagram: tutorial02InitialDiagram,
    steps: [{
        content: {
            jsx: <>The dotted line means that the connection is broken. Remove it by clicking on <BrokenTargetConnector />.</>,
            dragIndicator: tutorial02DragIndicatorDeleteConnection
        },
        trigger: { ConnectionRemoved: {} }
    }, {
        content: {
            jsx: <>Now add the swapper gadget<ConverterGadget />to the work bench</>,
        },
        trigger: { GadgetAdded: { axiom: "r(A, B):-r(B, A)" } }
    },
    {
        content: {
            jsx: <>You can use this gadget to swap the numbers and complete the gadget machine</>
        },
        trigger: { GameCompleted: null }
    }]
};
