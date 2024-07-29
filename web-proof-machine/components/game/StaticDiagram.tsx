"use client"
import ReactFlow, { useNodesState, useEdgesState, useReactFlow, NodeTypes, EdgeTypes, Node as ReactFlowNode, Edge, ReactFlowProvider, ReactFlowInstance } from 'reactflow';
import { NodePosition, GadgetId, GadgetProps, outputPosition, Axiom } from '../../lib/game/Primitives';
import { GadgetFlowNode } from './GadgetFlowNode';
import { CustomEdge } from './MultiEdge';
import { Term } from 'lib/game/Term';
import { getHandleId } from './Node';
import demoDiagramProps from "public/demo_diagram_props.json"
import { Equation, unifyEquations } from 'lib/game/Unification';
import { getMaximumInTerms, TermEnumerator } from 'lib/game/TermEnumeration';
import { AssignmentContext } from 'lib/game/AssignmentContext';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': CustomEdge }

interface GadgetPropsWithPosition {
    id: GadgetId
    inputs: Term[]
    output?: Term
    isAxiom: boolean
    x: number
    y: number
}

interface GadgetEdge {
    id: string
    source: GadgetId
    target: GadgetId
    targetPosition: NodePosition
}

function getTermsInGadget(props: GadgetPropsWithPosition): Term[] {
    return props.inputs.concat(props.output ? props.output : [])
}

function makeGadgetNode(rf: ReactFlowInstance<GadgetProps, Edge>, props: GadgetPropsWithPosition): ReactFlowNode<GadgetProps, 'gadgetFlowNode'> {
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
        position: rf.screenToFlowPosition({ x: props.x, y: props.y }),
        data: { terms, id: props.id, isAxiom: props.isAxiom }
    }
}

function makeEdge(props: GadgetEdge): Edge {
    return { 
        id: props.id, 
        source: props.source, 
        sourceHandle: getHandleId(outputPosition, props.source),
        target: props.target,
        targetHandle: getHandleId(props.targetPosition, props.target),
        type: 'multiEdge' 
    }
}

interface GadgetGraphProps {
    gadgets: GadgetPropsWithPosition[]
    edges: GadgetEdge[]
}

function getEquationsFromGadgetGraph(props: GadgetGraphProps): Equation[] {
    function getEquationFromEdge(edge: GadgetEdge): Equation | null {
        const sourceNode = props.gadgets.find(node => node.id === edge.source)
        const targetNode = props.gadgets.find(node => node.id === edge.target)
        if (!sourceNode || !targetNode) {
            return null
        }
        const sourceTerm = sourceNode.output
        const targetTerm = targetNode.inputs[edge.targetPosition]
        if (!sourceTerm || !targetTerm) {
            return null
        }
        return [sourceTerm, targetTerm]
    }
    return props.edges.map(getEquationFromEdge).filter((eq) => eq !== null)
}

function StaticDiagramCore(props: GadgetGraphProps) {
    console.log(props)
    const rf = useReactFlow<GadgetProps, Edge>()
    const [nodes, setNodes, onNodesChange] = useNodesState(props.gadgets.map((gadget) => makeGadgetNode(rf, gadget)));
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges.map(makeEdge));

    const enumerationOffset = getMaximumInTerms(props.gadgets.flatMap(getTermsInGadget))
    const enumeration = new TermEnumerator(enumerationOffset)
    const equations = getEquationsFromGadgetGraph(props)
    const [assignment, eqSatisfied] = unifyEquations(equations)
    const termEnumeration = enumeration.getHoleValueAssignment(assignment)

    return (
        <AssignmentContext.Provider value={termEnumeration}>
            <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodesChange={onNodesChange} 
            onEdgesChange={onEdgesChange} 
            nodeTypes={nodeTypes} 
            edgeTypes={edgeTypes} />
        </AssignmentContext.Provider>
    )
}

const demoProps: GadgetGraphProps = demoDiagramProps

export default function StaticDiagram(props: GadgetGraphProps) {
    return (
    <div className="w-full h-screen max-w-full mx-auto">
        <ReactFlowProvider>
            <StaticDiagramCore {...props} />
        </ReactFlowProvider>
    </div>
    )
}