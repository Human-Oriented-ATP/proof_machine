import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    NodeTypes,
    Connection,
    useReactFlow,
    Node as ReactFlowNode,
    EdgeTypes,
    Edge,
    HandleType,
    getOutgoers,
    getIncomers,
    getConnectedEdges,
    useKeyPress,
} from 'reactflow';
import { GadgetFlowNode } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { CustomEdge } from './MultiEdge';

import 'reactflow/dist/style.css';
import './flow.css'
import { axiomToGadget, getTermOfHandle } from '../lib/game/GameLogic';
import { Axiom } from "../lib/game/Primitives";
import { Equation } from '../lib/game/Unification';
import { Term } from '../lib/game/Term';
import { GadgetProps } from '../lib/game/Primitives';
import { useIdGenerator } from '../lib/util/IdGeneratorHook';
import { ControlButtons, CustomControlProps } from './ControlButtons';

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

export function getFlowNodeTerms(props: GadgetProps): Term[] {
    if (props.output) {
        return props.inputs.concat(props.output)
    } else {
        return props.inputs
    }
}

function hasTargetHandle(e: Edge, handleId: string): boolean {
    if (e.targetHandle) {
        return e.targetHandle === handleId
    } else {
        return false
    }
}

function getGoal(props: GadgetProps): ReactFlowNode {
    return {
        id: props.id,
        type: 'gadgetFlowNode',
        position: { x: 300, y: 300 },
        data: props
    }
}

function isSelectedAndNotGoal(node: ReactFlowNode) {
    return node.selected && node.id !== "goal_gadget"
}

export function Diagram(props: DiagramProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([getGoal(props.goal)]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { getNode, getNodes, getEdges, screenToFlowPosition, fitView } = useReactFlow();
    const [generateGadgetId] = useIdGenerator("gadget_")
    const backspacePressed = useKeyPress("Backspace")

    useEffect(() => {
        if (backspacePressed) {
            setNodes(nodes => {
                return nodes.filter(node => !isSelectedAndNotGoal(node))
            })
        }
    }, [backspacePressed, setNodes])

    const getEquationFromConnection = useCallback((connection: Connection) => {
        const sourceTerms: Term[] = getFlowNodeTerms(getNode(connection.source!)!.data)
        const targetTerms: Term[] = getFlowNodeTerms(getNode(connection.target!)!.data)
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
                x: e.clientX, y: 450
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

    const isValidConnection = useCallback((connection: Connection) => {
        function doesNotCreateACycle(): boolean {
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
        }

        function colorsMatch(term1: Term, term2: Term): boolean {
            if ("label" in term1 && "label" in term2) {
                return term1.label === term2.label
            }
            return false
        }

        const [source, target] = getEquationFromConnection(connection)
        const colorsOk = colorsMatch(source, target)
        const noCircle = doesNotCreateACycle()
        return colorsOk && noCircle
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

    return (
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
        >
            <GadgetPalette {...paletteProps} />
            <ControlButtons {...props.controlProps}></ControlButtons>
        </ReactFlow>
    )
}
