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

function OpenTargetConnector() { 
    return <div className="inline-block translate-y-[-2px]"><Connector type={"target"} isInline={true} isOpen={true}/></div>
}

const RESTRICTIVE_SETTINGS = {
    zoomEnabled: false,
    proximityConnectEnabled: false,
    gadgetDeletionEnabled: false
}

const DELETE_ONLY_SETTINGS = {
    zoomEnabled: false,
    proximityConnectEnabled: false,
    gadgetDeletionEnabled: true
}

const DEFAULT_SETTINGS = {
    zoomEnabled: true,
    proximityConnectEnabled: true,
    gadgetDeletionEnabled: true
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
            jsx: <>Some better text explaining broken connections</>,
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
            jsx: <>Now connect the remaining gadgets and we're done!</>
        },
        trigger: {
            GameCompleted:null
        }
    }]
}

const tutorial03: InteractiveLevel = {
    settings: RESTRICTIVE_SETTINGS,
    steps: [{
        content: {
            jsx: <>To move forward, close the open connector <OpenTargetConnector/>. </>,
        },
        trigger: { ConnectionAdded: {to: ["goal_gadget",0]} }
    }, {
        content: {
            jsx: <>To finish the level, close <i><b>all</b></i> open connectors <OpenTargetConnector/>.</>,
        },
        trigger: {
            GameCompleted:null
        }
    }]
}

const tutorial04InitialDiagram : InitialDiagram = { 
    gadgets: new Map([
        ["goal_gadget", { statement: { goal: parseTerm("b(1, 2)") }, position: {x : 0, y: 0}}],
        ["initial_gadget_1", { statement: { axiom: parseAxiom("r(1, 2).") }, position: {x : -400, y: -45}}],
        ["initial_gadget_2", { statement: { axiom: parseAxiom("b(A,B):-r(A, B),r(A, C),r(D,B).") }, position: {x : -200, y: 20}}]   
    ]),
    connections: []
}

const tutorial04SrcDragPoint: GadgetPosition = {
    gadget: { elementId: "initial_gadget_1" },
    anchorPoint: "CENTER_RIGHT",
    offset: { x: 0, y: 0 }
}

const tutorial04TgtDragPoint1: GadgetPosition = {
    gadget: { elementId: "initial_gadget_2" },
    anchorPoint: "CENTER_LEFT",
    offset: { x: 0, y: -75 }
}

const tutorial04TgtDragPoint2: GadgetPosition = {
    gadget: { elementId: "initial_gadget_2" },
    anchorPoint: "CENTER_LEFT",
    offset: { x: 0, y: 0 }
}

const tutorial04TgtDragPoint3: GadgetPosition = {
    gadget: { elementId: "initial_gadget_2" },
    anchorPoint: "CENTER_LEFT",
    offset: { x: 0, y: 75 }
}

const tutorial04DragIndicator1 : DragIndicatorProps<GadgetPosition> = {
    origin: tutorial04SrcDragPoint,
    destination : { absolutePosition: tutorial04TgtDragPoint1},
    drawLine: false
}

const tutorial04DragIndicator2 : DragIndicatorProps<GadgetPosition> = {
    origin: tutorial04SrcDragPoint,
    destination : { absolutePosition: tutorial04TgtDragPoint2},
    drawLine: false
}

const tutorial04DragIndicator3 : DragIndicatorProps<GadgetPosition> = {
    origin: tutorial04SrcDragPoint,
    destination : { absolutePosition: tutorial04TgtDragPoint3},
    drawLine: false
}


const tutorial04 : InteractiveLevel = {
    settings: RESTRICTIVE_SETTINGS,
    initialDiagram: tutorial04InitialDiagram, 
    steps: [{
        content: {
            jsx: <>You can create multiple connections from one gadget by dragging multiple times.</>,
            dragIndicator: tutorial04DragIndicator1
        },
        trigger: { ConnectionAdded: {to: ["initial_gadget_2",0]} }
    },{
        content: {
            jsx: <>You can create multiple connections from one gadget by dragging multiple times.</>,
            dragIndicator: tutorial04DragIndicator2
        },
        trigger: { ConnectionAdded: {to: ["initial_gadget_2",1]} }
    },{
        content: {
            jsx: <>You can create multiple connections from one gadget by dragging multiple times.</>,
            dragIndicator: tutorial04DragIndicator3
        },
        trigger: { ConnectionAdded: {to: ["initial_gadget_2",2]} }
    },{
        content: {
            jsx: <>Now make the final connection to finish the level!</>,
        },
        trigger: {
            GameCompleted:null
        }
    }]
}

const tutorial05InitialDiagram : InitialDiagram = { 
    gadgets: new Map([
        ["goal_gadget", { statement: { goal: parseTerm("r(1, 4)") }, position: {x : 0, y: 0}}],
        ["initial_gadget_1", { statement: { axiom: parseAxiom("g(X, Y, Z, W) :- b(X, Y, Z, W), g(X, Z, W, Y).") }, position: {x : -60, y: -75}}],
        ["initial_gadget_2", { statement: { axiom: parseAxiom("g(X, Y, Z, W) :- b(X, Y, Z, W), g(X, Z, W, Y).") }, position: {x : -75, y: 50}}],
        ["initial_gadget_3", { statement: { axiom: parseAxiom("g(X, Y, Z, W) :- b(X, Y, Z, W), g(X, Z, W, Y).") }, position: {x : -90, y: -150}}]   
    ]),
    connections: []
}

const tutorial05SrcDragPoint: GadgetPosition = {
    gadget: { elementId: "initial_gadget_1" },
    anchorPoint: "CENTER_LEFT",
    offset: { x: 0, y: 0 }
}

const tutorial05TgtDragPoint: GadgetPosition = {
    gadget: { elementId: "axiom_1" },
    anchorPoint: "BOTTOM_RIGHT",
    offset: { x: 50, y: 225 }
}

const tutorial05DragIndicator: DragIndicatorProps<GadgetPosition> = {
    origin: tutorial05SrcDragPoint,
    destination: {absolutePosition: tutorial05TgtDragPoint},
    drawLine: false
}


const tutorial05 : InteractiveLevel = {
    settings: DELETE_ONLY_SETTINGS,
    initialDiagram: tutorial05InitialDiagram, 
    steps: [{
        content: {
            jsx: <>What chaos! Drag gadgets over the pallet to delete them.</>,
            dragIndicator: tutorial05DragIndicator
        },
        trigger: { GadgetRemoved: {gadgetId: "initial_gadget_1" }}
    },{
        content: {
            jsx: <>That's better, now solve the level!</>,
        },
        trigger: {
            GameCompleted:null
        }
    }]
}

const tutorial06SrcDragPoint: GadgetPosition = {
    gadget: { elementId: "axiom_4" },
    anchorPoint: "CENTER_RIGHT",
    offset: { x: 0, y: 0 }
}

const tutorial06TgtDragPoint: GadgetPosition = {
    gadget: { elementId: "goal_gadget" },
    anchorPoint: "CENTER_LEFT",
    offset: { x: -20, y: 0 }
}

const tutorial06DragIndicator: DragIndicatorProps<GadgetPosition> = {
    origin: tutorial06SrcDragPoint,
    destination: {absolutePosition: tutorial06TgtDragPoint},
    drawLine: false
}

const tutorial06 : InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>To save time, if you connector near each other they connect automatically!</>,
            dragIndicator: tutorial06DragIndicator
        },
        trigger: { ConnectionAdded: {to: ["goal_gadget",0]}}
    },{
        content: {
            jsx: <>To save time, if you drag connectors near each other they connect automatically!</>,
            },
        trigger: {GameCompleted:null}
    }]
}



export const interactiveTutorialLevels: Map<string, InteractiveLevel> = new Map([
    ["tutorial01", tutorial01],
    ["tutorial02", tutorial02],
    ["tutorial03", tutorial03],
    ["tutorial04", tutorial04],
    ["tutorial05", tutorial05],
    ["tutorial06", tutorial06]
])