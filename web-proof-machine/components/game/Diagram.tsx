import React, { useCallback, useEffect, useRef } from 'react';
import {
    useNodesState, useEdgesState, addEdge, NodeTypes, Connection, useReactFlow, Node as ReactFlowNode,
    EdgeTypes, Edge, HandleType, getOutgoers, useStore, XYPosition, ReactFlow, useEdges, OnConnectStartParams
} from '@xyflow/react';
import { GadgetFlowNode, GadgetNode } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { CustomEdge, EdgeWithEquation } from './MultiEdge';

import '@xyflow/react/dist/base.css';
import './flow.css'
import { axiomToGadget } from '../../lib/game/GameLogic';
import { Axiom, GadgetId, NodePosition } from "../../lib/game/Primitives";
import { Equation } from '../../lib/game/Unification';
import { Term } from '../../lib/game/Term';
import { GadgetProps } from '../../lib/game/Primitives';
import { useIdGenerator } from '../../lib/hooks/IdGeneratorHook';
import { ControlButtons } from './ControlButtons';
import { sameArity, colorsMatch } from 'lib/game/Term';
import { getGoalNode, hasTargetHandle, init } from '../../lib/util/ReactFlow';
import { useCompletionCheck } from 'lib/hooks/CompletionCheckHook';
import { useCustomDelete } from 'lib/hooks/CustomDeleteHook';
import { useProximityConnect } from 'lib/hooks/ProximityConnectHook';
import { getNodePositionFromHandle, getTermOfHandle } from './Node';
import TutorialOverlay from './TutorialOverlay';
import { HANDLE_BROKEN_CLASSES } from 'lib/Constants';

const nodeTypes: NodeTypes = { 'gadgetNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'edgeWithEquation': CustomEdge }

interface DiagramProps {
    problemId: string
    axioms: Axiom[]
    addGadget: (gadgetId: string, axiom: Axiom) => void
    removeGadget: (gadgetId: string) => void
    addEquation: (from: [GadgetId, NodePosition], to: [GadgetId, NodePosition], equation: Equation) => void
    removeEquation: (from: [GadgetId, NodePosition], to: [GadgetId, NodePosition], equation: Equation) => void
    isSatisfied: Map<string, boolean>
    goal: GadgetProps
    setProblemSolved: (b: boolean) => void
}

const nodesLengthSelector = (state) =>
    Array.from(state.nodeLookup.values()).length || 0;

interface GadgetDragStartInfo {
    id: string,
    position: XYPosition
}

function containsPoint(rect: DOMRect, point: XYPosition): boolean {
    return rect.left <= point.x && point.x <= rect.right && rect.top <= point.y && point.y <= rect.bottom
}

function isAbovePalette(position: XYPosition): boolean {
    const paletteElement = document.getElementById("gadget_palette")!
    const paletteRect = paletteElement?.getBoundingClientRect()
    return containsPoint(paletteRect, position)
}

export function Diagram(props: DiagramProps) {
    const myProps = getGoalNode(props.goal)
    const myNode = <GadgetFlowNode {...getGoalNode(props.goal)} />
    const [nodes, setNodes, onNodesChange] = useNodesState([myProps]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeWithEquation>([]);
    const rf = useReactFlow<GadgetNode, EdgeWithEquation>();
    const [generateGadgetId] = useIdGenerator("gadget_")

    const dragStartInfo = useRef<GadgetDragStartInfo | undefined>(undefined)

    const numberOfNodes = useStore(nodesLengthSelector)

    useEffect(() => {
        if (dragStartInfo.current !== undefined) {
            const nodeToBeDragged = document.querySelector(`[data-id='${dragStartInfo.current.id}']`)
            nodeToBeDragged?.dispatchEvent(new MouseEvent("mousedown", {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: dragStartInfo.current.position.x,
                clientY: dragStartInfo.current.position.y,
            }))
        }
        dragStartInfo.current = undefined
    }, [numberOfNodes])

    const getNode = rf.getNode
    const getNodes = rf.getNodes
    const getEdges = rf.getEdges

    useCompletionCheck({ setProblemSolved: props.setProblemSolved, nodes, edges })

    const getConnectionInfo = useCallback((connection: Connection | Edge): { from: [GadgetId, NodePosition], to: [GadgetId, NodePosition] } => {
        const fromGadget = connection.source!
        const fromNode = getNodePositionFromHandle(connection.sourceHandle!)
        const toGadget = connection.target!
        const toNode = getNodePositionFromHandle(connection.targetHandle!)
        return { from: [fromGadget, fromNode], to: [toGadget, toNode] }
    }, [])

    const deleteEquationsOfEdges = useCallback((edges: Edge<{ eq: Equation }>[]): void => {
        edges.map(e => {
            const connectionInfo = getConnectionInfo(e)
            props.removeEquation(connectionInfo.from, connectionInfo.to, e.data!.eq)
        })
    }, [edges, props])

    const getEquationFromConnection = useCallback((connection: Connection) => {
        const sourceTerms = getNode(connection.source!)!.data.terms
        const targetTerms = getNode(connection.target!)!.data.terms
        const sourceTerm: Term = getTermOfHandle(connection.sourceHandle!, sourceTerms)!
        const targetTerm: Term = getTermOfHandle(connection.targetHandle!, targetTerms)!
        const equation: Equation = [sourceTerm, targetTerm]
        return equation
    }, [getNode])

    const doesNotCreateACycle = useCallback((connection: Connection) => {
        const nodes = getNodes();
        const edges = getEdges();

        const target = nodes.find((node) => node.id === connection.target)!
        const hasCycle = (node: ReactFlowNode, visited = new Set()) => {
            if (visited.has(node.id)) return false;

            visited.add(node.id);

            for (const outgoer of getOutgoers(node, nodes, edges)) {
                if (outgoer.id === connection.source) return true;
                if (hasCycle(outgoer, visited)) return true;
            }
        };

        if (target.id === connection.source) return false;
        return !hasCycle(target);
    }, [getNodes, getEdges]);

    const removeEdgesConnectedToHandle = useCallback((handleId: string) => {
        const edges = getEdges()
        const edgesConnectedToThisHandle = edges.filter(e => hasTargetHandle(e, handleId))
        deleteEquationsOfEdges(edgesConnectedToThisHandle)
        setEdges(edges => {
            return edges.filter(e => !hasTargetHandle(e, handleId))
        })
    }, [getEdges, setEdges, props])

    const savelyAddEdge = useCallback((connection: Connection): void => {
        removeEdgesConnectedToHandle(connection.targetHandle!)
        const equation = getEquationFromConnection(connection)
        const connectionInfo = getConnectionInfo(connection)
        props.addEquation(connectionInfo.from, connectionInfo.to, equation)
        setEdges((edges) => {
            return addEdge({
                ...connection,
                type: 'edgeWithEquation',
                animated: true,
                data: { eq: equation }
            }, edges)
        });
    }, [props, setEdges, getEquationFromConnection])

    function makeGadget(axiom: Axiom, axiomPosition: XYPosition): void {
        const id = generateGadgetId()
        const flowNode = {
            id: id,
            type: 'gadgetNode',
            position: rf.screenToFlowPosition(axiomPosition),
            dragging: true,
            data: axiomToGadget(axiom, id)
        }
        props.addGadget(id, axiom)
        setNodes((nodes) => nodes.concat(flowNode));
        dragStartInfo.current = { id, position: axiomPosition }
    }

    const paletteProps: GadgetPaletteProps = {
        axioms: props.axioms,
        makeGadget: makeGadget
    }

    const onConnectStart: (event: MouseEvent | TouchEvent, params: OnConnectStartParams) => void = useCallback((event, params) => {
        if (params.handleType === "target") {
            removeEdgesConnectedToHandle(params.handleId!)
        }
    }, [removeEdgesConnectedToHandle])

    const isInDiagram = useCallback((connection: Connection): boolean => {
        const edges = getEdges()
        return edges.some(edge => edge.sourceHandle === connection.sourceHandle && edge.targetHandle === connection.targetHandle)
    }, [edges, getEquationFromConnection])

    const isValidConnection = useCallback((connection: Connection) => {
        const [source, target] = getEquationFromConnection(connection)
        const arityOk = sameArity(source, target)
        const colorsOk = colorsMatch(source, target)
        const noCycle = doesNotCreateACycle(connection)
        const notYetAConection = !isInDiagram(connection)
        return colorsOk && arityOk && noCycle && notYetAConection
    }, [getEquationFromConnection, getEdges, getNodes]);


    const isSatisfied = props.isSatisfied
    const updateEdgeAnimation = useCallback(() => {
        function highlightHandle(handleId: string) {
            const handle = document.querySelector(`[data-handleid="${handleId}"]`);
            if (handle) {
                (handle as HTMLElement).children[0].classList.add(...HANDLE_BROKEN_CLASSES)
            }
        }

        document.querySelectorAll("[data-handleid]").forEach(handle => {
            (handle as HTMLElement).children[0].classList.remove(...HANDLE_BROKEN_CLASSES)
        })
        setEdges(edges => edges.map(edge => {
            const edgeIsSatisfied = isSatisfied.get(JSON.stringify(edge.data!.eq))
            if (edgeIsSatisfied === undefined) {
                throw new Error("Something went wrong! There is an edge in the diagram without a corresponding equation")
            }
            if (edgeIsSatisfied === false) {
                highlightHandle(edge.sourceHandle!)
                highlightHandle(edge.targetHandle!)
            }
            return { ...edge, animated: !edgeIsSatisfied }
        }))
    }, [isSatisfied, setEdges])

    useEffect(() => {
        updateEdgeAnimation()
    }, [isSatisfied, setEdges, setNodes])

    const deleteNode = useCustomDelete({
        isDeletable: (nodeId: string) => nodeId !== "goal_gadget",
        getNodes, getEdges, setNodes, setEdges,
        onEdgesDelete: deleteEquationsOfEdges,
        onNodesDelete: nodes => nodes.map(node => props.removeGadget(node.id))
    })

    const [onNodeDrag, onNodeDragStopProximityConnect] = useProximityConnect(rf, isValidConnection, savelyAddEdge)

    const onNodeDragStop = useCallback((event: React.MouseEvent, node: ReactFlowNode) => {
        if (isAbovePalette({ x: event.clientX, y: event.clientY })) {
            deleteNode()
        } else {
            onNodeDragStopProximityConnect(event, node)
        }
    }, [])

    return (
        <>
            <GadgetPalette {...paletteProps} />
            <TutorialOverlay problemId={props.problemId} />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={(c) => {
                    savelyAddEdge(c)
                }}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                onInit={() => init(rf)}
                onConnectStart={onConnectStart}
                isValidConnection={isValidConnection}
                deleteKeyCode={null}
                minZoom={0.1}
                onNodeDrag={onNodeDrag}
                onNodeDragStop={onNodeDragStop}
                nodeOrigin={[0.5, 0.5]}
            />
            <ControlButtons rf={rf} ></ControlButtons>
        </>
    )
}
