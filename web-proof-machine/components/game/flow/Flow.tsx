import React, { useCallback, useContext, useEffect, useRef } from 'react';
import {
    NodeTypes, useReactFlow, Node as ReactFlowNode,
    EdgeTypes, Edge, getOutgoers, XYPosition, ReactFlow, OnConnectStartParams,
    Background,
    BackgroundVariant,
} from '@xyflow/react';
import { GadgetFlowNode, GadgetNode } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { CustomEdge } from './CustomEdge';
import { ConnectionLineComponent } from './ConnectionLineComponent';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from 'zustand';

import '@xyflow/react/dist/base.css';
import './flow.css'
import { axiomToGadget } from '../../../lib/game/GameLogic';
import { Axiom, GadgetId, GadgetProps, NodePosition, OUTPUT_POSITION } from "../../../lib/game/Primitives";
import { Equation, EquationId } from '../../../lib/game/Unification';
import { Term } from '../../../lib/game/Term';
import { ControlButtons } from './ControlButtons';
import { aritiesMatch, labelsMatch } from 'lib/game/Term';
import { InitialViewportSetting, hasTargetHandle, initViewport } from '../../../lib/util/ReactFlow';
import { useCompletionCheck } from 'lib/hooks/CompletionCheck';
import { useProximityConnect } from 'lib/hooks/ProximityConnect';
import { makeHandleId, getNodePositionFromHandle, getTermOfHandle } from '../gadget/Node';
import { HANDLE_BROKEN_CLASSES } from 'lib/Constants';
import { InitialDiagram, InitialDiagramConnection, InitialDiagramGadget, InitializationData, isAxiom } from 'lib/game/Initialization';
import { GameContext, useGameStateContext } from 'lib/state/StateContextProvider';
import { GameSlice } from 'lib/state/Store';
import { Gadget } from '../gadget/Gadget';

const nodeTypes: NodeTypes = { 'gadgetNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'customEdge': CustomEdge }

function containsPoint(rect: DOMRect, point: XYPosition): boolean {
    return rect.left <= point.x && point.x <= rect.right && rect.top <= point.y && point.y <= rect.bottom
}

function isAbovePalette(position: XYPosition): boolean {
    const paletteElement = document.getElementById("gadget_palette")!
    const paletteRect = paletteElement?.getBoundingClientRect()
    return containsPoint(paletteRect, position)
}

const selector = (state: GameSlice) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onConnectStart: state.onConnectStart,
    removeGadgetNode: state.removeGadgetNode,
    isValidConnection: state.isValidConnection,
    settings: state.setup.settings,
    onNodesDelete: state.onNodesDelete,
});

export function Flow() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onConnectStart, removeGadgetNode, onNodesDelete, isValidConnection, settings } = useGameStateContext(useShallow(selector));
    const rf = useReactFlow<GadgetNode, Edge>();

    const gadgetThatIsBeingAdded = useRef<{ gadgetId: string, axiom: Axiom } | undefined>(undefined)

    // useCompletionCheck({ markLevelAsCompleted: props.markLevelAsCompleted, nodes, edges })
    // useOpenHandleHighlighting({ nodes, edges })

    // const getConnectionInfo = useCallback((connection: Connection | Edge): { from: GadgetId, to: [GadgetId, NodePosition] } => {
    //     const fromGadget = connection.source!
    //     const toGadget = connection.target!
    //     const toNode = getNodePositionFromHandle(connection.targetHandle!)
    //     return { from: fromGadget, to: [toGadget, toNode] }
    // }, [])

    // const deleteEquationsOfEdges = useCallback((edges: Edge<{ eq: EquationId }>[]): void => {
    //     edges.map(e => {
    //         const connectionInfo = getConnectionInfo(e)
    //         props.removeEquation(connectionInfo.from, connectionInfo.to)
    //     })
    // }, [edges, props])

    // const getEquationFromConnection = useCallback((connection: Connection) => {
    //     const sourceTerms = getNode(connection.source!)!.data.terms
    //     const targetTerms = getNode(connection.target!)!.data.terms
    //     const sourceTerm: Term = getTermOfHandle(connection.sourceHandle!, sourceTerms)!
    //     const targetTerm: Term = getTermOfHandle(connection.targetHandle!, targetTerms)!
    //     const equation: Equation = [sourceTerm, targetTerm]
    //     return equation
    // }, [getNode])

    // const removeEdgesConnectedToHandle = useCallback((handleId: string) => {
    //     const edges = getEdges()
    //     const edgesConnectedToThisHandle = edges.filter(e => hasTargetHandle(e, handleId))
    //     deleteEquationsOfEdges(edgesConnectedToThisHandle)
    //     setEdges(edges => {
    //         return edges.filter(e => !hasTargetHandle(e, handleId))
    //     })
    // }, [getEdges, setEdges, props])

    // const savelyAddEdge = useCallback((connection: Connection): void => {
    //     removeEdgesConnectedToHandle(connection.targetHandle!)
    //     const equation = getEquationFromConnection(connection)
    //     const connectionInfo = getConnectionInfo(connection)
    //     props.addEquation(connectionInfo.from, connectionInfo.to, equation)
    //     setEdges((edges) => {
    //         return addEdge({
    //             ...connection,
    //             type: 'customEdge',
    //             animated: true,
    //             data: { eq: getEquationId(connectionInfo.from, connectionInfo.to) }
    //         }, edges)
    //     });
    // }, [props, setEdges, getEquationFromConnection, props.addEquation])

    const paletteProps: GadgetPaletteProps = {
        abortAddingGadget: () => {
            if (gadgetThatIsBeingAdded.current) {
                removeGadgetNode(gadgetThatIsBeingAdded.current.gadgetId)
            }
            gadgetThatIsBeingAdded.current = undefined
        }
    }

    // const enableHoleFocus = useCallback(() => {
    //     setNodes(nodes => nodes.map(node => {
    //         return { ...node, data: { ...node.data, displayHoleFocus: true } }
    //     }))
    // }, [])

    // const onConnect = useCallback((connection: Connection) => {
    //     savelyAddEdge(connection)
    // }, [savelyAddEdge])

    // const isSatisfied = props.isSatisfied
    // const updateEdgeAnimation = useCallback(() => {
    //     function highlightHandle(handleId: string) {
    //         const handle = document.querySelector(`[data-handleid="${handleId}"]`);
    //         if (handle) {
    //             (handle as HTMLElement).children[0].classList.add(...HANDLE_BROKEN_CLASSES)
    //         }
    //     }

    //     document.querySelectorAll("[data-handleid]").forEach(handle => {
    //         (handle as HTMLElement).children[0].classList.remove(...HANDLE_BROKEN_CLASSES)
    //     })
    //     setEdges(edges => edges.map(edge => {
    //         const edgeIsSatisfied = isSatisfied.get(edge.data!.eq)
    //         if (edgeIsSatisfied === undefined) {
    //             throw new Error("There is an edge in the diagram without a corresponding equation")
    //         }
    //         if (edgeIsSatisfied === false) {
    //             highlightHandle(edge.sourceHandle!)
    //             highlightHandle(edge.targetHandle!)
    //         }
    //         return { ...edge, animated: !edgeIsSatisfied }
    //     }))
    // }, [isSatisfied, setEdges])

    // const [onNodeDragProximityConnect, onNodeDragStopProximityConnect] = props.proximityConnectEnabled ?
    //     useProximityConnect(rf, isValidConnection, savelyAddEdge)
    //     : [(e, n) => void 0, (e, n) => void 0]

    // const onNodeDrag = useCallback((event: React.MouseEvent, node: GadgetNode) => {
    //     onNodeDragProximityConnect(event, node)
    //     props.setUserIsDraggingOrNavigating(true)
    // }, [])

    // const onNodeDragStop = useCallback((event: React.MouseEvent, node: GadgetNode) => {
    //     if (isAbovePalette({ x: event.clientX, y: event.clientY })) {
    //         const edgesToBeDeleted = getEdges().filter(e => node.id === e.source || node.id === e.target)
    //         if (gadgetThatIsBeingAdded.current !== undefined) {
    //             gadgetThatIsBeingAdded.current = undefined
    //             deleteEquationsOfEdges(edgesToBeDeleted)
    //             setNodes(nodes => nodes.filter(n => n.id !== node.id))
    //         } else {
    //             props.removeGadget(node.id)
    //             deleteEquationsOfEdges(edgesToBeDeleted)
    //             setNodes(nodes => nodes.filter(n => n.id !== node.id || n.deletable === false))
    //         }
    //         setEdges(edges => edges.filter(e => node.id !== e.source && node.id !== e.target))
    //     } else {
    //         if (gadgetThatIsBeingAdded.current !== undefined) {
    //             props.addGadget(gadgetThatIsBeingAdded.current.gadgetId, gadgetThatIsBeingAdded.current.axiom)
    //         }
    //         onNodeDragStopProximityConnect(event, node)
    //     }
    //     props.setUserIsDraggingOrNavigating(false)
    // }, [props.removeGadget])

    // const onConnectEnd = useCallback(() => {
    //     props.setUserIsDraggingOrNavigating(false)
    //     // enableHoleFocus()
    // }, [])

    // const onEdgesDelete = useCallback((edges: Edge[]) => {
    //     deleteEquationsOfEdges(edges)
    // }, [])

    // const zoomProps = props.zoomEnabled ? { minZoom: 0.1 } : { minZoom: 1, maxZoom: 1 }

    // const init = useCallback(() => {
    //     initViewport(rf, props.initialViewportSetting)
    //     updateEdgeAnimation()
    // }, [])

    return <>
        <GadgetPalette {...paletteProps} />
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // onEdgesDelete={onEdgesDelete}
            onNodesDelete={onNodesDelete}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            // onInit={init}
            onConnectStart={onConnectStart}
            // onConnectEnd={onConnectEnd}
            isValidConnection={isValidConnection}
            // {...zoomProps}
            // onNodeDrag={onNodeDrag}
            // onNodeDragStart={() => props.setUserIsDraggingOrNavigating(true)}
            // onNodeDragStop={onNodeDragStop}
            nodeOrigin={[0.5, 0.5]}
            // onMove={() => props.setUserIsDraggingOrNavigating(true)}
            // onMoveEnd={() => props.setUserIsDraggingOrNavigating(false)}
            panOnDrag={settings.panEnabled}
            zoomOnDoubleClick={false}
            autoPanOnConnect={false}
            autoPanOnNodeDrag={false}
            connectionLineComponent={ConnectionLineComponent}
        >
            <Background color="#bbb" size={1.8} variant={BackgroundVariant.Dots} />
        </ReactFlow>
        <ControlButtons />
    </>
}
