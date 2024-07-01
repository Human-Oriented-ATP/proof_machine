import ReactFlow, { useNodesState, useEdgesState, useReactFlow, NodeTypes, EdgeTypes, Node as ReactFlowNode, Edge } from 'reactflow';
import { GadgetProps } from '../../lib/game/Primitives';
import { GadgetFlowNode } from './GadgetFlowNode';
import { CustomEdge } from './MultiEdge';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': CustomEdge }

interface GadgetGraphProps {
    gadgets: ReactFlowNode<GadgetProps, 'gadgetFlowNode'>[]
    edges: Edge[]
}

export function StaticDiagram(props: GadgetGraphProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(props.gadgets);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);
    const { getNode, getNodes, getEdges } = useReactFlow();

    return <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange} 
            onEdgesChange={onEdgesChange} 
            nodeTypes={nodeTypes} 
            edgeTypes={edgeTypes} />;
}