import { GadgetNode } from "components/game/diagram/GadgetFlowNode";
import { GameProps } from "components/game/GameNew";
import { GameState, ReadonlyGameSetup } from "./Store";
import { InitialDiagram, InitialDiagramConnection, InitialDiagramGadget, isAxiom } from "lib/game/Initialization";
import { makeHandleId } from "components/game/gadget/Node";
import { GadgetId, GadgetProps, OUTPUT_POSITION } from "lib/game/Primitives";
import { axiomToGadget } from "lib/game/GameLogic";
import { Edge, ReactFlowInstance } from "@xyflow/react";
import { DEFAULT_SETTINGS } from "components/tutorial/InteractiveLevel";

function getGadgetProps(id: GadgetId, gadget: InitialDiagramGadget): GadgetProps {
    if (isAxiom(gadget.statement)) {
        return axiomToGadget(gadget.statement.axiom, id)
    } else {
        return {
            id,
            terms: new Map([[0, gadget.statement.goal]]),
            isAxiom: false
        }
    }
}

function makeGadgetNode(id: GadgetId, gadget: InitialDiagramGadget, deletable: boolean, goalNodeDraggable: boolean): GadgetNode {
    const draggable = id === "goal_gadget" ? goalNodeDraggable : true
    return {
        id,
        type: 'gadgetNode',
        position: gadget.position,
        deletable: deletable && id !== "goal_gadget",
        draggable,
        data: getGadgetProps(id, gadget)
    }
}

function getInitialNodes(props: GameProps): GadgetNode[] {
    const initialGadgetsArray = Array.from(props.initialDiagram.gadgets)
    const deletable = props.settings!.gadgetDeletionEnabled
    const goalNodeDraggable = props.settings!.panEnabled
    const initialNodes: GadgetNode[] = initialGadgetsArray.map(([gadgetId, gadget]) =>
        makeGadgetNode(gadgetId, gadget, deletable, goalNodeDraggable))
    return initialNodes
}

function getInitialEdge(connection: InitialDiagramConnection, label: string): Edge {
    return {
        id: label,
        source: connection.from,
        sourceHandle: makeHandleId(OUTPUT_POSITION, connection.from),
        target: connection.to[0],
        targetHandle: makeHandleId(connection.to[1], connection.to[0]),
        type: 'customEdge',
        animated: true
    }
}

function getInitialEdges(initialDiagram: InitialDiagram): Edge[] {
    return initialDiagram.connections.map((edge, idx) => getInitialEdge(edge, `edge_${idx}`))
}

export function getInitialState(props: GameProps, rf: ReactFlowInstance): GameState {
    const propsWithDefaults = { ...props, settings: props.settings ?? DEFAULT_SETTINGS, tutorialSteps: props.tutorialSteps ?? [] }
    const setup: ReadonlyGameSetup = { ...propsWithDefaults }

    return {
        nodes: getInitialNodes(propsWithDefaults),
        edges: getInitialEdges(propsWithDefaults.initialDiagram),
        rf,
        setup
    }
}