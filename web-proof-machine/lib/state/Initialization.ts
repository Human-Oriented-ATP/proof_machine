import { GadgetNode } from "components/game/flow/GadgetFlowNode";
import { GameProps } from "components/game/Game";
import { GameStateInitializedFromData } from "./Store";
import { ReadonlyGameSetup } from './slices/Setup';
import { InitialDiagram, InitialDiagramGadget, isAxiom } from "lib/game/Initialization";
import { makeHandleId } from 'lib/game/Handles';
import { GadgetId } from "lib/game/Primitives";
import { GadgetProps } from "components/game/gadget/Gadget";
import { GOAL_GADGET_ID } from 'lib/game/Primitives';
import { getGadgetTerms } from "lib/game/GameLogic";
import { Edge, ReactFlowInstance } from "@xyflow/react";
import { DEFAULT_SETTINGS } from "components/tutorial/InteractiveLevel";
import { GadgetConnection } from "./slices/History";
import { OUTPUT_POSITION } from 'lib/game/CellPosition';

function getGadgetProps(id: GadgetId, gadget: InitialDiagramGadget): GadgetProps {
    const gadgetTerms = getGadgetTerms(gadget.statement, id)
    return {
        id,
        terms: gadgetTerms,
        isOnShelf: false
    }
}

function makeGadgetNode(id: GadgetId, gadget: InitialDiagramGadget, deletable: boolean, goalNodeDraggable: boolean): GadgetNode {
    const draggable = id === GOAL_GADGET_ID ? goalNodeDraggable : true
    return {
        id,
        type: 'gadgetNode',
        position: gadget.position,
        deletable: deletable && id !== GOAL_GADGET_ID,
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

function getInitialEdge(connection: GadgetConnection, label: string): Edge {
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

export function getInitialState(props: GameProps, rf: ReactFlowInstance): GameStateInitializedFromData {
    const propsWithDefaults = { ...props, settings: props.settings ?? DEFAULT_SETTINGS, tutorialSteps: props.tutorialSteps ?? [] }
    const setup: ReadonlyGameSetup = { ...propsWithDefaults }

    return {
        nodes: getInitialNodes(propsWithDefaults),
        edges: getInitialEdges(propsWithDefaults.initialDiagram),
        rf,
        setup
    }
}