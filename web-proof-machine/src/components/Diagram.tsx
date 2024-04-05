import { useCallback, useEffect } from 'react';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    NodeTypes,
    Connection as ReactFlowConnection,
    useReactFlow,
    Node as ReactFlowNode,
    EdgeTypes,
    Edge,
    MiniMap,
} from 'reactflow';
import { GadgetFlowNode, GadgetFlowNodeProps, getFlowNodeTerms } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { MultiEdge } from './MultiEdge';

import 'reactflow/dist/style.css';
import '../flow.css'
import { Axiom, HoleValueAssignment, getTermOfHandle, makeAxiomGadget } from '../game/GameLogic';
import { Equation } from '../game/Unification';
import { Term } from '../game/Term';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': MultiEdge }

interface DiagramProps {
    axioms: Axiom[]
    makeNewGadget: (axiom: Axiom) => GadgetFlowNodeProps
    addEquation: (equation: Equation) => void
    deleteEquation: (equation: Equation) => void
    isSatisfied: Map<Equation, boolean>
    holeValueAssignment: HoleValueAssignment
    goalNodeProps: GadgetFlowNodeProps
}

export function Diagram(props: DiagramProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([getGoalNode()]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { getNode, screenToFlowPosition, fitView } = useReactFlow();

    function getGoalNode() {
        const gadgetFlowNodeProps = props.goalNodeProps
        const flowNode: ReactFlowNode =
        {
            id: gadgetFlowNodeProps.id,
            type: 'gadgetFlowNode',
            position: { x: 300, y: 300 },
            data: gadgetFlowNodeProps
        }
        return flowNode
    }

    function addConnection(params: ReactFlowConnection): void {
        setEdges((edges) => {
            const sourceTerms: Term[] = getFlowNodeTerms(getNode(params.source!)!.data)
            const targetTerms: Term[] = getFlowNodeTerms(getNode(params.target!)!.data)
            const sourceTerm: Term = getTermOfHandle(params.sourceHandle!, sourceTerms)!
            const targetTerm: Term = getTermOfHandle(params.targetHandle!, targetTerms)!
            const equation: Equation = [sourceTerm, targetTerm]
            props.addEquation(equation)
            return addEdge({
                ...params,
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

    const onConnect = useCallback(addConnection, [props, getNode, setEdges]);
    const onEdgesDelete = useCallback(deleteConnections, [props])

    function createNewGadget(axiom: Axiom, e: React.MouseEvent): void {
        const gadgetFlowNodeProps = props.makeNewGadget(axiom)
        const flowNode: ReactFlowNode =
        {
            id: gadgetFlowNodeProps.id,
            type: 'gadgetFlowNode',
            position: screenToFlowPosition({
                x: e.clientX, y: 450
            }),
            data: gadgetFlowNodeProps
        }
        setNodes((nodes) => nodes.concat(flowNode));
    }

    const paletteProps: GadgetPaletteProps = {
        axioms: props.axioms,
        makeAxiomGadget: makeAxiomGadget,
        makeGadget: createNewGadget
    }

    useEffect(() => {
        setNodes(nodes => nodes.map(node => {
            const newData = { ...node.data, assignment: props.holeValueAssignment }
            return { ...node, data: newData }
        }))
        setEdges(edges => edges.map(edge => {
            const isSatisfied = props.isSatisfied.get(edge.data)
            return { ...edge, animated: isSatisfied ? false : true }
        }))
    }, [props.isSatisfied, props.holeValueAssignment, setEdges, setNodes])

    function init() {
        const goalNode: (Partial<ReactFlowNode> & { id: string }) = {
            id: "goal_gadget"
        }
        fitView({ nodes: [goalNode] })
    }

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
        >
            <MiniMap></MiniMap>
            <GadgetPalette {...paletteProps} />
            <Controls />
        </ReactFlow>
    )
}