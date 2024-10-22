import { CreateStateWithInitialValue } from '../Types';
import { ReactFlowInstance, XYPosition } from '@xyflow/react';
import { GadgetNode } from 'components/game/flow/GadgetFlowNode';
import { EdgeSlice, edgeSlice, EdgeStateInitializedFromData } from './Edges';
import { NodeSlice, nodeSlice, NodeState, NodeStateInitializedFromData } from './Nodes';
import { GameEvent } from './History';
import { GadgetIdGeneratorSlice, gadgetIdGeneratorSlice } from './GadgetIdGenerator';
import { axiomToGadget } from 'lib/game/GameLogic';
import { Axiom, GadgetId } from 'lib/game/Primitives';
import { unificationSlice, UnificationSlice, UnificationState, UnificationStateInitializedFromData } from './Unification';
import { ConnectorStatus } from 'components/game/gadget/Connector';

export type FlowUtilitiesStateInitializedFromData = UnificationStateInitializedFromData & NodeStateInitializedFromData & EdgeStateInitializedFromData & {
    rf: ReactFlowInstance
}

export type FlowUtilitiesState = UnificationState & NodeState & {
    levelIsCompleted: boolean
}

export interface FlowUtilitiesActions {
    updateLogicalState: (events: GameEvent[]) => void;
    calculateCompletionStatusAndOpenHandles: () => { isCompleted: boolean, openHandles: string[] };
    updateHandleStatus: (openHandles: string[]) => void;
    isHandleWithBrokenConnection: (handle: string) => boolean;
    makeGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => GadgetNode;
    addGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => void;
    removeGadgetNode: (node: GadgetNode) => void;
    handleGadgetDraggedAboveShelf: (node: GadgetNode) => void;
    handleGadgetDragStopAwayFromShelf: (node: GadgetNode) => void;
};

export type DependencySlices = NodeSlice & EdgeSlice & UnificationSlice & GadgetIdGeneratorSlice
export type FlowUtilitiesSlice = DependencySlices & FlowUtilitiesStateInitializedFromData & FlowUtilitiesState & FlowUtilitiesActions

export const flowUtilitiesSlice: CreateStateWithInitialValue<FlowUtilitiesStateInitializedFromData, FlowUtilitiesSlice> = (initialState, set, get) => {
    return {
        ...edgeSlice(initialState, set, get),
        ...nodeSlice(initialState, set, get),
        ...unificationSlice(initialState, set, get),
        ...gadgetIdGeneratorSlice(set, get),
        rf: initialState.rf,
        levelIsCompleted: false,

        calculateCompletionStatusAndOpenHandles: () => {
            let openHandles = new Array()
            let currentLayer: GadgetId[] = new Array()
            currentLayer.push("goal_gadget")
            let hasInvalidEdge = false
            while (true) {
                const gadgetNodesInCurrentLayer = get().nodes.filter(node => currentLayer.includes(node.id))
                const inputHandlesInCurrentLayer = gadgetNodesInCurrentLayer.map(node => get().getInputHandlesOfNode(node.id)).flat()
                if (inputHandlesInCurrentLayer.length === 0) {
                    break
                }
                let nextLayer = new Array()
                for (const handle of inputHandlesInCurrentLayer) {
                    const incomingEdges = get().edges.filter(edge => edge.targetHandle === handle)
                    if (incomingEdges.length === 0) {
                        openHandles.push(handle)
                    } else if (incomingEdges.length === 1) {
                        const incomingEdge = incomingEdges[0]
                        if (!get().edgeIsSatisfied(incomingEdge)) {
                            hasInvalidEdge = true
                        }
                        const nextNode = incomingEdge.source
                        nextLayer.push(nextNode)
                    } else {
                        throw Error(`Unexpected number of incoming edges: handle ${handle} has ${incomingEdges.length} incoming edges`)
                    }
                }
                currentLayer = nextLayer
            }
            const isCompleted = openHandles.length === 0 && !hasInvalidEdge
            return { isCompleted, openHandles }
        },

        isHandleWithBrokenConnection(handle: string) {
            const edges = get().getEdgesConnectedToHandle(handle)
            return edges.some((edge) => !get().edgeIsSatisfied(edge))
        },

        updateHandleStatus(openHandles: string[]) {
            const allHandles = get().getAllHandles()
            const handleStatus = new Map<string, ConnectorStatus>()
            for (const handle of allHandles) {
                if (openHandles.includes(handle)) {
                    handleStatus.set(handle, "OPEN")
                } else if (get().isHandleWithBrokenConnection(handle)) {
                    handleStatus.set(handle, "BROKEN")
                } else if (get().isConnectedHandle(handle)) {
                    handleStatus.set(handle, "CONNECTED")
                } else {
                    handleStatus.set(handle, "DEFAULT")
                }
            }
            set({ handleStatus })
        },

        updateLogicalState(events: GameEvent[]) {
            get().logEvents(events)
            get().runUnification()
            const { isCompleted, openHandles } = get().calculateCompletionStatusAndOpenHandles()
            get().updateHandleStatus(openHandles)
            if (isCompleted) {
                set({ levelIsCompleted: true })
            }
            // synchronize history
        },

        makeGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => {
            const id = get().generateNewGadgetId()
            const gadgetProps = axiomToGadget(axiom, id)
            const gadgetNode: GadgetNode = {
                id, type: 'gadgetNode',
                position: get().rf.screenToFlowPosition(axiomPosition),
                dragging: true,
                deletable: get().setup.settings.gadgetDeletionEnabled && id !== "goal_gadget",
                data: gadgetProps
            }
            return gadgetNode
        },

        addGadgetNode: (axiom: Axiom, axiomPosition: XYPosition) => {
            const node = get().makeGadgetNode(axiom, axiomPosition)
            set({ gadgetBeingDraggedFromShelf: { id: node.id, position: node.position, status: "STILL_ABOVE_SHELF", axiom } })
            set({ nodes: [...get().nodes, node], });
            // Intentionally no update of logical state here -- this happens in onNodeDragStop
        },

        removeGadgetNode: (node: GadgetNode) => {
            if (node.deletable) {
                const connectionDeletionEvents = get().removeEdgesConnectedToNode(node.id);
                set({ nodes: get().nodes.filter((n) => n.id !== node.id), });
                get().updateLogicalState([...connectionDeletionEvents, { GadgetRemoved: { gadgetId: node.id } }])
            }
        },

        handleGadgetDraggedAboveShelf(node: GadgetNode) {
            const gadgetBeingDraggedFromShelf = get().gadgetBeingDraggedFromShelf
            if (gadgetBeingDraggedFromShelf === undefined) {
                get().removeGadgetNode(node)
            } else {
                if (node.id !== gadgetBeingDraggedFromShelf.id)
                    throw Error("Impossible value for gadgetBeingDraggedFromShelf")
                set({ nodes: get().nodes.filter((n) => n.id !== gadgetBeingDraggedFromShelf.id) });
                set({ gadgetBeingDraggedFromShelf: undefined });
            }
        },

        handleGadgetDragStopAwayFromShelf(node: GadgetNode) {
            const gadgetBeingDraggedFromShelf = get().gadgetBeingDraggedFromShelf
            // TODO: events = proximityConnect()
            if (gadgetBeingDraggedFromShelf !== undefined) {
                const { id, axiom } = gadgetBeingDraggedFromShelf
                const event = { GadgetAdded: { gadgetId: id, axiom } }
                set({ gadgetBeingDraggedFromShelf: undefined });
                get().updateLogicalState([event]) // TODO: need to add the connection event from proximity connect as well!
            } else {
                // TODO: update logical state with only proximity connect event!
            }
            // Set userIsDraggingOrNavigating to false
        },

    }
}