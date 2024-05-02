import React, { useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
    useNodesState, useEdgesState, addEdge, NodeTypes, Connection, useReactFlow, Node as ReactFlowNode,
    EdgeTypes, Edge, HandleType, getOutgoers, getIncomers, getConnectedEdges, useKeyPress, XYPosition,
} from 'reactflow';
import { GadgetFlowNode } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { CustomEdge } from './MultiEdge';

import 'reactflow/dist/style.css';
import './flow.css'
import { axiomToGadget, getTermOfHandle, handleIdFromTerm } from '../lib/game/GameLogic';
import { Axiom } from "../lib/game/Primitives";
import { Equation } from '../lib/game/Unification';
import { Term } from '../lib/game/Term';
import { GadgetProps } from '../lib/game/Primitives';
import { useIdGenerator } from '../lib/util/IdGeneratorHook';
import { ControlButtons, CustomControlProps } from './ControlButtons';
import { getCenter } from 'lib/util/Point';
import { sameArity, colorsMatch } from 'lib/game/Term';
import { getAllTermsOfGadget } from './Gadget';
import { getGoal, isSelectedAndNotGoal, hasTargetHandle } from '../lib/util/ReactFlow';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': CustomEdge }

interface DiagramProps {
    axioms: Axiom[]
    addEquation: (equation: Equation) => void
    deleteEquation: (equation: Equation) => void
    isSatisfied: Map<Equation, boolean>
    goal: GadgetProps
    controlProps: CustomControlProps
    setProblemSolved: (b: boolean) => void
}

export function Diagram(props: DiagramProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([getGoal(props.goal)]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { getNode, getNodes, getEdges, screenToFlowPosition, fitView } = useReactFlow();
    const [generateGadgetId] = useIdGenerator("gadget_")
    const backspacePressed = useKeyPress("Backspace")

    const getAdjacentEdges = useCallback((node: ReactFlowNode) => {
        const edges = getEdges()
        const adjacentEdges = edges.filter(e => e.source === node.id || e.target === node.id)
        return adjacentEdges
    }, [getEdges])

    useEffect(() => {
        if (backspacePressed) {
            const nodes = getNodes()
            const nodesToBeDeleted = nodes.filter(node => isSelectedAndNotGoal(node))
            const edgesToBeDeleted = nodesToBeDeleted.map(node => getAdjacentEdges(node)).flat()
            deleteEquationsOfEdges(edgesToBeDeleted)
            const edgeIds = edgesToBeDeleted.map(e => e.id)
            setEdges(edges => edges.filter(edge => !edgeIds.includes(edge.id)))
            setNodes(nodes => nodes.filter(node => !isSelectedAndNotGoal(node)))
        }
    }, [backspacePressed, setNodes])

    const getEquationFromConnection = useCallback((connection: Connection) => {
        const sourceTerms: Term[] = getAllTermsOfGadget(getNode(connection.source!)!.data)
        const targetTerms: Term[] = getAllTermsOfGadget(getNode(connection.target!)!.data)
        const sourceTerm: Term = getTermOfHandle(connection.sourceHandle!, sourceTerms)!
        const targetTerm: Term = getTermOfHandle(connection.targetHandle!, targetTerms)!
        const equation: Equation = [sourceTerm, targetTerm]
        return equation
    }, [getNode])

    function addConnection(connection: Connection): void {
        removeEdgesConnectedToHandle(connection.targetHandle!)
        const equation = getEquationFromConnection(connection)
        props.addEquation(equation)
        setEdges((edges) => {
            return addEdge({
                ...connection,
                animated: true,
                type: 'multiEdge',
                data: equation
            }, edges)
        });
    }

    function deleteEquationsOfEdges(edges: Edge[]): void {
        edges.map(e => props.deleteEquation(e.data))
    }

    const paletteProps: GadgetPaletteProps = {
        axioms: props.axioms,
        makeGadget: makeGadget
    }

    function init() {
        const goalNode: (Partial<ReactFlowNode> & { id: string }) = {
            id: "goal_gadget"
        }
        fitView({ nodes: [goalNode] })
    }

    function makeGadget(axiom: Axiom, e: React.MouseEvent): void {
        const id = generateGadgetId()
        const flowNode: ReactFlowNode = {
            id: id,
            type: 'gadgetFlowNode',
            position: screenToFlowPosition({
                x: 180, y: e.clientY
            }),
            data: axiomToGadget(axiom, id)
        }
        setNodes((nodes) => nodes.concat(flowNode));
    }

    const removeEdgesConnectedToHandle = useCallback((handleId: string) => {
        setEdges(edges => {
            const edgesConnectedToThisHandle = edges.filter(e => hasTargetHandle(e, handleId))
            edgesConnectedToThisHandle.map(e => props.deleteEquation(e.data))
            return edges.filter(e => !hasTargetHandle(e, handleId))
        })
    }, [setEdges, props])

    const onConnectStart = useCallback((event: React.MouseEvent | React.TouchEvent,
        params: { nodeId: string | null; handleId: string | null; handleType: HandleType | null; }) => {

        if (params.handleType === "target") {
            removeEdgesConnectedToHandle(params.handleId!)
        }
    }, [removeEdgesConnectedToHandle]);

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

    const isValidConnection = useCallback((connection: Connection) => {
        const [source, target] = getEquationFromConnection(connection)
        const arityOk = sameArity(source, target)
        const colorsOk = colorsMatch(source, target)
        const noCycle = doesNotCreateACycle(connection)
        return colorsOk && arityOk && noCycle
    }, [getEquationFromConnection, getEdges, getNodes]);

    const isCompleted = useCallback(() => {
        function onlyContainsValidConnections(edges: Edge[]): boolean {
            for (const edge of edges) {
                if (edge.animated) {
                    return false
                }
            }
            return true
        }

        function hasUnconnectedInputHandle(node: ReactFlowNode): boolean {
            const numberOfIncomingEdges = getIncomers(node, nodes, edges).length
            const numberOfInputTerms = node.data.inputs.length
            return numberOfInputTerms !== numberOfIncomingEdges
        }

        const goalNode = getNode("goal_gadget")!
        let observedComponent: ReactFlowNode<any>[] = []
        let currentLayer = [goalNode]
        while (true) {
            for (const node of currentLayer) {
                if (hasUnconnectedInputHandle(node)) {
                    return false
                }
            }
            observedComponent = observedComponent.concat(currentLayer)
            const nextLayer = currentLayer.map(node => getIncomers(node, nodes, edges)).flat()
            if (nextLayer.length === 0) {
                break
            } else {
                currentLayer = nextLayer
            }
        }
        const edgesInComponent = getConnectedEdges(observedComponent, edges)
        return onlyContainsValidConnections(edgesInComponent)
    }, [edges, getNode, nodes])

    const isSatisfied = props.isSatisfied
    const setProblemSolved = props.setProblemSolved

    useEffect(() => {
        setEdges(edges => edges.map(edge => {
            const edgeIsSatisfied = isSatisfied.get(edge.data)
            if (edgeIsSatisfied === undefined) {
                throw new Error("Something went wrong! There is an edge in the diagram without a corresponding equation")
            }
            return { ...edge, animated: edgeIsSatisfied ? false : true }
        }))
    }, [isSatisfied, setEdges, setNodes])

    useEffect(() => {
        if (isCompleted()) {
            setProblemSolved(true)
        } else {
            setProblemSolved(false)
        }
    }, [setProblemSolved, isCompleted])

    const onConnect = useCallback(addConnection, [props, setEdges, getEquationFromConnection, removeEdgesConnectedToHandle]);
    const onEdgesDelete = useCallback(deleteEquationsOfEdges, [props])

    const MIN_DISTANCE = 100

    const getHandles = useCallback((node: ReactFlowNode) => {
        const terms = getAllTermsOfGadget(node.data)
        return terms.map(handleIdFromTerm)
    }, [])

    const getHandlePositions = useCallback((node: ReactFlowNode) => {
        const handlePositions: XYPosition[] = []
        return handlePositions
    }, [])

    const getClosestHandleToPosition = useCallback((position: XYPosition) => {
        const result: [string, number] = ["", 0]
        return result
    }, [])

    const getClosestHandle = useCallback((node: ReactFlowNode) => {
        const handlePositions = getHandlePositions(node)
        const getClosestHandles = handlePositions.map(handlePosition => {
            return getClosestHandleToPosition(handlePosition)
        })
        const [closestHandleId, closestDistance] = getClosestHandles.reduce((acc, [handleId, distance]) => {
            if (distance < acc[1]) {
                return [handleId, distance];
            } else {
                return acc;
            }
        }, ["", Infinity]);
        if (closestDistance < MIN_DISTANCE) {
            return closestHandleId
        } else {
            return null
        }
    }, [])

    const getProximityConnection = useCallback((node: ReactFlowNode) => {
        const connection: Connection | null = {
            source: node.id,
            target: "goal_gadget",
            sourceHandle: "",
            targetHandle: ""
        }
        return connection
    }, [])

    let info = useRef("node info")
    let mouseInfo = useRef("mouse info")
    let handleInfo = useRef("handle info")

    const getHandlePosition = useCallback((handleId: string) => {
        const handle = document.querySelector(`[data-handleid="${handleId}"]`);
        if (handle) {
            const positionOnScreen = getCenter(handle.getBoundingClientRect());
            return screenToFlowPosition(positionOnScreen);
        } else {
            return null
        }
    }, []);

    const onNodeDrag = useCallback((event: React.MouseEvent, node: ReactFlowNode) => {
        info.current = JSON.stringify(node.position)
        mouseInfo.current = JSON.stringify(screenToFlowPosition({ x: event.clientX, y: event.clientY }))
        const handles = getHandles(node)
        const handlePositions = handles.map(getHandlePosition)
        handleInfo.current = JSON.stringify(handlePositions)
        // const candidateConnection = getProximityConnection(node)
        // if (candidateConnection) {
        //     if (isValidConnection(candidateConnection)) {
        //         // make target handle glow
        //     }
        // }
    }, [])

    const onNodeDragStop = useCallback((event, node: ReactFlowNode) => {
        const candidateConnection = getProximityConnection(node)
        if (getClosestHandle(node)) {
            if (isValidConnection(candidateConnection)) {
                addConnection(candidateConnection)
            }
        }
    }, [])

    return (
        <>
            <div>{info.current}</div>
            <div>{mouseInfo.current}</div>
            <div>{handleInfo.current}</div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgesDelete={onEdgesDelete}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                onInit={init}
                onConnectStart={onConnectStart}
                isValidConnection={isValidConnection}
                deleteKeyCode={null}
                minZoom={0.1}
                onNodeDrag={onNodeDrag}
            >
                <GadgetPalette {...paletteProps} />
                <ControlButtons {...props.controlProps}></ControlButtons>
            </ReactFlow>
        </>
    )
}
