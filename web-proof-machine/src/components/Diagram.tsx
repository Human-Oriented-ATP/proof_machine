import { useCallback, useEffect } from 'react';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    NodeTypes,
    Connection,
    useReactFlow,
    Node as ReactFlowNode,
    EdgeTypes,
    Edge,
    MiniMap,
    HandleType,
    getOutgoers,
} from 'reactflow';
import { GadgetFlowNode } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { CustomEdge } from './MultiEdge';

import 'reactflow/dist/style.css';
import '../flow.css'
import { axiomToGadget, getTermOfHandle } from '../game/GameLogic';
import { Axiom } from "../game/Primitives";
import { Equation } from '../game/Unification';
import { Term } from '../game/Term';
import { GadgetProps } from '../game/Primitives';
import { useIdGenerator } from '../util/IdGeneratorHook';
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

export function Diagram(props: DiagramProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([getGoal(props.goal)]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { getNode, getNodes, getEdges, screenToFlowPosition, fitView } = useReactFlow();
    const [generateGadgetId] = useIdGenerator("gadget_")

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
        setEdges((edges) => {
            const equation = getEquationFromConnection(connection)
            props.addEquation(equation)
            return addEdge({
                ...connection,
                type: 'multiEdge',
                data: equation
            }, edges)
        });
    }

    function deleteConnections(edges: Edge[]): void {
        function deleteConnection(edge: Edge): void {
            props.deleteEquation(edge.data)
        }
        edges.map(deleteConnection)
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
        const flowNode: ReactFlowNode =
        {
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

    useEffect(() => {
        setEdges(edges => edges.map(edge => {
            const isSatisfied = props.isSatisfied.get(edge.data)
            return { ...edge, animated: isSatisfied ? false : true }
        }))
    }, [props.isSatisfied, setEdges, setNodes])

    const onConnect = useCallback(addConnection, [props, setEdges, getEquationFromConnection, removeEdgesConnectedToHandle]);
    const onEdgesDelete = useCallback(deleteConnections, [props])

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
        >
            <GadgetPalette {...paletteProps} />
            <ControlButtons {...props.controlProps}></ControlButtons>
        </ReactFlow>
    )
}
