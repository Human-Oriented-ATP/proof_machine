import ReactFlow, { useNodesState, useEdgesState, useReactFlow, NodeTypes, EdgeTypes, Node as ReactFlowNode, Edge, ReactFlowProvider } from 'reactflow';
import { NodePosition, GadgetId, GadgetProps, outputPosition } from '../../lib/game/Primitives';
import { GadgetFlowNode } from './GadgetFlowNode';
import { CustomEdge } from './MultiEdge';
import { Term } from 'lib/game/Term';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': CustomEdge }

interface GadgetPropsWithPosition {
    id: GadgetId,
    inputs: Term[],
    output?: Term,
    isAxiom: boolean
    x: number,
    y: number
}

interface GadgetEdge {
    id: string,
    source: GadgetId,
    target: GadgetId
}

function makeGadgetNode(props: GadgetPropsWithPosition): ReactFlowNode<GadgetProps, 'gadgetFlowNode'> {
    let terms = new Map<NodePosition, Term>()
    props.inputs.forEach((input, i) => {
        terms.set(i, input)
    })
    if (props.output) {
        terms.set(outputPosition, props.output)
    }
    return {
        id: props.id,
        type: 'gadgetFlowNode',
        position: { x: props.x, y: props.y },
        data: { terms, id: props.id, isAxiom: props.isAxiom }
    }
}

function makeEdge(props: GadgetEdge): Edge {
    return { id: props.id, source: props.source, target: props.target, type: 'multiEdge' }
}

interface GadgetGraphProps {
    gadgets: GadgetPropsWithPosition[]
    edges: GadgetEdge[]
}

function StaticDiagramCore(props: GadgetGraphProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(props.gadgets.map(makeGadgetNode));
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges.map(makeEdge));
    const { getNode, getNodes, getEdges } = useReactFlow();

    return <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange} 
        nodeTypes={nodeTypes} 
        edgeTypes={edgeTypes} />
}

export default function StaticDiagram(props: GadgetGraphProps) {
    return <ReactFlowProvider>
        <StaticDiagramCore {...props} />
    </ReactFlowProvider>
}