import { useCallback, useEffect, useMemo, useState } from 'react';
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
} from 'reactflow';
import { GadgetFlowNode, getFlowNodeTerms } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { MultiEdge } from './MultiEdge';

import problemData from "../game/examples/problem1.json"

import 'reactflow/dist/style.css';
import '../flow.css'
import { Axiom, getTermOfHandle, makeAxiomGadget, makeAxiomsFromJSONObject } from '../game/GameLogic';
import { Equation, unifyEquations } from '../game/Unification';
import { Assignment, Term, makeTermWithFreshVariables } from '../game/Term';
import { GadgetId, GadgetProps } from '../game/Primitives';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': MultiEdge }

export function Game() {
    const [gadgetIdCounter, setGadgetIdCounter] = useState(0)

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const reactFlowInstance = useReactFlow()

    const { screenToFlowPosition } = useReactFlow();

    function getGadgetId(): GadgetId {
        setGadgetIdCounter(gadgetIdCounter + 1)
        return "gadget_" + gadgetIdCounter
    }


    const assignment = useMemo(() => {
        function getEquations(): Equation[] {
            const equations = edges.map(edge => edge.data)
            return equations
        }
        const [assignment, eqSatisfied] = unifyEquations(getEquations())
        setNodes(nodes => nodes.map(node => {
            const newData = { ...node.data, assignment }
            return { ...node, data: newData }
        }))
        return assignment
    }, [edges, setNodes])

    function addConnection(params: ReactFlowConnection): void {
        setEdges((edges) => {
            const sourceTerms: Term[] = getFlowNodeTerms(reactFlowInstance.getNode(params.source!)!.data)
            const targetTerms: Term[] = getFlowNodeTerms(reactFlowInstance.getNode(params.target!)!.data)
            const sourceTerm: Term = getTermOfHandle(params.sourceHandle!, sourceTerms)!
            const targetTerm: Term = getTermOfHandle(params.targetHandle!, targetTerms)!
            const equation: Equation = [sourceTerm, targetTerm]
            return addEdge({ ...params, type: 'multiEdge', data: equation }, edges)
        });
    }

    const onConnect = useCallback(addConnection, [setEdges, reactFlowInstance]);

    function createNewGadget(axiom: Axiom, e: React.MouseEvent): void {
        const id = getGadgetId()
        const inputTerms = axiom.hypotheses.map(hyp => makeTermWithFreshVariables(hyp, id))
        const outputTerm = makeTermWithFreshVariables(axiom.conclusion, id)
        const newNode: ReactFlowNode =
        {
            id: id,
            type: 'gadgetFlowNode',
            position: screenToFlowPosition({
                x: e.clientX, y: 250
            }),
            data: { inputs: inputTerms, output: outputTerm, id, assignment }
        }
        setNodes((nodes) => nodes.concat(newNode));
    }

    const panelProps: GadgetPaletteProps = {
        axioms: makeAxiomsFromJSONObject(problemData),
        makeAxiomGadget: makeAxiomGadget,
        makeGadget: createNewGadget
    }

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
        >
            <GadgetPalette {...panelProps} />
            <Controls />
        </ReactFlow>
    )
}