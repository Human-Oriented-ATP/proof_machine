import React, { useCallback, useEffect, useRef } from 'react';
import {
    useNodesState, useEdgesState, addEdge, NodeTypes, Connection, useReactFlow, Node as ReactFlowNode,
    EdgeTypes, Edge, getOutgoers, useStore, XYPosition, ReactFlow, OnConnectStartParams
} from '@xyflow/react';
import { GadgetFlowNode, GadgetNode } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { CustomEdge, EdgeWithEquation } from './CustomEdge';

import '@xyflow/react/dist/base.css';
import './flow.css'
import { axiomToGadget } from '../../../lib/game/GameLogic';
import { Axiom, GadgetId, GadgetProps, NodePosition, OUTPUT_POSITION } from "../../../lib/game/Primitives";
import { Equation, EquationId } from '../../../lib/game/Unification';
import { Term } from '../../../lib/game/Term';
import { useIdGenerator } from '../../../lib/hooks/IdGeneratorHook';
import { ControlButtons } from './ControlButtons';
import { sameArity, colorsMatch } from 'lib/game/Term';
import { InitialViewportSetting, hasTargetHandle, init } from '../../../lib/util/ReactFlow';
import { useCompletionCheck } from 'lib/hooks/CompletionCheckHook';
import { useProximityConnect } from 'lib/hooks/ProximityConnectHook';
import { getHandleId, getNodePositionFromHandle, getTermOfHandle } from '../gadget/Node';
import { HANDLE_BROKEN_CLASSES } from 'lib/Constants';
import { InitialDiagram, InitialDiagramConnection, InitialDiagramGadget, InitializationData, isAxiom } from 'lib/game/Initialization';
import { getEquationId } from '../Game';

const nodeTypes: NodeTypes = { 'gadgetNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'edgeWithEquation': CustomEdge }

interface DiagramProps {
    initData: InitializationData
    addGadget: (gadgetId: string, axiom: Axiom) => void
    removeGadget: (gadgetId: string) => void
    addEquation: (from: GadgetId, to: [GadgetId, NodePosition], equation: Equation) => void
    removeEquation: (from: GadgetId, to: [GadgetId, NodePosition]) => void
    isSatisfied: Map<EquationId, boolean>
    setProblemSolved: () => void
    setUserIsDraggingOrNavigating: (isInteracting: boolean) => void
    proximityConnectEnabled: boolean
    zoomEnabled: boolean
    initialViewportSetting: InitialViewportSetting
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

function getGadgetProps(id: GadgetId, gadget: InitialDiagramGadget): GadgetProps {
    if (isAxiom(gadget.statement)) {
        return axiomToGadget(gadget.statement.axiom, id)
    } else {
        return {
            id,
            terms: new Map([[0, gadget.statement.goal]]),
            isAxiom: false,
            displayHoleFocus: true
        }
    }
}

function getGadgetNode(id: GadgetId, gadget: InitialDiagramGadget): GadgetNode {
    return {
        id,
        type: 'gadgetNode',
        position: gadget.position,
        deletable: id !== "goal_gadget",
        data: getGadgetProps(id, gadget)
    }
}

export function Diagram(props: DiagramProps) {
    const initialGadgetsArray = Array.from(props.initData.initialDiagram.gadgets)
    const initialNodes: GadgetNode[] = initialGadgetsArray.map(([gadgetId, gadget]) => getGadgetNode(gadgetId, gadget))

    const gadgetThatIsBeingAdded = useRef<{ gadgetId: string, axiom: Axiom } | undefined>(undefined)

    const getInitialEdge = useCallback((connection: InitialDiagramConnection, label: string): EdgeWithEquation => {
        return {
            id: label,
            source: connection.from,
            sourceHandle: getHandleId(OUTPUT_POSITION, connection.from),
            target: connection.to[0],
            targetHandle: getHandleId(connection.to[1], connection.to[0]),
            type: 'edgeWithEquation',
            animated: true,
            data: { eq: getEquationId(connection.from, connection.to) }
        }
    }, [])

    const getInitialEdges = useCallback((initialDiagram: InitialDiagram): EdgeWithEquation[] => {
        return initialDiagram.connections.map((edge, idx) => getInitialEdge(edge, `edge_${idx}`))
    }, [])

    const initialEdges: EdgeWithEquation[] = getInitialEdges(props.initData.initialDiagram)

    const rf = useReactFlow<GadgetNode, EdgeWithEquation>();
    const [nodes, setNodes, onNodesChange] = useNodesState<GadgetNode>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeWithEquation>(initialEdges);

    const getNode = rf.getNode
    const getNodes = rf.getNodes
    const getEdges = rf.getEdges

    const [generateGadgetId] = useIdGenerator("gadget_")

    const dragStartInfo = useRef<GadgetDragStartInfo | undefined>(undefined)

    const numberOfNodes = useStore(nodesLengthSelector)

    useEffect(() => {
        if (dragStartInfo.current !== undefined) {
            const nodeToBeDragged = document.querySelector(`[data-id='${dragStartInfo.current.id}']`)
            props.setUserIsDraggingOrNavigating(true)
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

    useCompletionCheck({ setProblemSolved: props.setProblemSolved, nodes, edges })

    const getConnectionInfo = useCallback((connection: Connection | Edge): { from: GadgetId, to: [GadgetId, NodePosition] } => {
        const fromGadget = connection.source!
        const toGadget = connection.target!
        const toNode = getNodePositionFromHandle(connection.targetHandle!)
        return { from: fromGadget, to: [toGadget, toNode] }
    }, [])

    const deleteEquationsOfEdges = useCallback((edges: Edge<{ eq: EquationId }>[]): void => {
        edges.map(e => {
            const connectionInfo = getConnectionInfo(e)
            props.removeEquation(connectionInfo.from, connectionInfo.to)
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
                data: { eq: getEquationId(connectionInfo.from, connectionInfo.to) }
            }, edges)
        });
    }, [props, setEdges, getEquationFromConnection, props.addEquation])

    function makeGadget(axiom: Axiom, axiomPosition: XYPosition): void {
        const id = generateGadgetId()
        const flowNode: GadgetNode = {
            id: id,
            type: 'gadgetNode',
            position: rf.screenToFlowPosition(axiomPosition),
            dragging: true,
            deletable: true,
            data: axiomToGadget(axiom, id)
        }
        gadgetThatIsBeingAdded.current = { gadgetId: id, axiom }
        setNodes((nodes) => nodes.concat(flowNode));
        dragStartInfo.current = { id, position: axiomPosition }
    }

    const paletteProps: GadgetPaletteProps = {
        axioms: props.initData.axioms,
        makeGadget: makeGadget
    }

    const disableHoleFocus = useCallback(() => {
        setNodes(nodes => nodes.map(node => {
            return { ...node, data: { ...node.data, displayHoleFocus: false } }
        }))
    }, [])

    const onConnectStart: (event: MouseEvent | TouchEvent, params: OnConnectStartParams) => void = useCallback((event, params) => {
        if (params.handleType === "target") {
            removeEdgesConnectedToHandle(params.handleId!)
        }
        disableHoleFocus()
        props.setUserIsDraggingOrNavigating(true)
    }, [removeEdgesConnectedToHandle])

    const enableHoleFocus = useCallback(() => {
        setNodes(nodes => nodes.map(node => {
            return { ...node, data: { ...node.data, displayHoleFocus: true } }
        }))
    }, [])

    const onConnect = useCallback((connection: Connection) => {
        savelyAddEdge(connection)
        enableHoleFocus()
        props.setUserIsDraggingOrNavigating(false)
    }, [savelyAddEdge])

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
            const edgeIsSatisfied = isSatisfied.get(edge.data!.eq)
            if (edgeIsSatisfied === undefined) {
                throw new Error("There is an edge in the diagram without a corresponding equation")
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

    const [onNodeDragProximityConnect, onNodeDragStopProximityConnect] = props.proximityConnectEnabled ?
        useProximityConnect(rf, isValidConnection, savelyAddEdge)
        : [(e, n) => void 0, (e, n) => void 0]

    const onNodeDrag = useCallback((event: React.MouseEvent, node: GadgetNode) => {
        onNodeDragProximityConnect(event, node)
        props.setUserIsDraggingOrNavigating(true)
    }, [])

    const onNodeDragStop = useCallback((event: React.MouseEvent, node: GadgetNode) => {
        if (isAbovePalette({ x: event.clientX, y: event.clientY })) {
            if (gadgetThatIsBeingAdded.current !== undefined) {
                gadgetThatIsBeingAdded.current = undefined
            } else {
                props.removeGadget(node.id)
            }
            const edgesToBeDeleted = getEdges().filter(e => node.id === e.source || node.id === e.target)
            deleteEquationsOfEdges(edgesToBeDeleted)
            setNodes(nodes => nodes.filter(n => n.id !== node.id || n.deletable === false))
            setEdges(edges => edges.filter(e => node.id !== e.source && node.id !== e.target))
        } else {
            if (gadgetThatIsBeingAdded.current !== undefined) {
                props.addGadget(gadgetThatIsBeingAdded.current.gadgetId, gadgetThatIsBeingAdded.current.axiom)
            }
            onNodeDragStopProximityConnect(event, node)
        }
        props.setUserIsDraggingOrNavigating(false)
    }, [props.removeGadget])

    const onEdgesDelete = useCallback((edges: EdgeWithEquation[]) => {
        deleteEquationsOfEdges(edges)
    }, [])

    const onNodesDelete = useCallback((nodes: GadgetNode[]) => {
        nodes.map(node => props.removeGadget(node.id))
    }, [props.removeGadget])

    const zoomProps = props.zoomEnabled ? { minZoom: 0.1 } : { minZoom: 1, maxZoom: 1 }

    return <>
        {props.initData.axioms.length !== 0 && <GadgetPalette {...paletteProps} />}
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgesDelete={onEdgesDelete}
            onNodesDelete={onNodesDelete}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            onInit={() => init(rf, props.initialViewportSetting)}
            onConnectStart={onConnectStart}
            onConnectEnd={() => props.setUserIsDraggingOrNavigating(false)}
            isValidConnection={isValidConnection}
            {...zoomProps}
            onNodeDrag={onNodeDrag}
            onNodeDragStart={() => props.setUserIsDraggingOrNavigating(true)}
            onNodeDragStop={onNodeDragStop}
            nodeOrigin={[0.5, 0.5]}
            onMove={() => props.setUserIsDraggingOrNavigating(true)}
            onMoveEnd={() => props.setUserIsDraggingOrNavigating(false)}
        />
        <ControlButtons rf={rf} zoomEnabled={props.zoomEnabled} ></ControlButtons>
    </>
}
