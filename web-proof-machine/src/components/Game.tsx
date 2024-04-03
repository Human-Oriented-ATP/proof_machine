import { useCallback, useMemo, useState } from 'react';
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
    useStore,
    ReactFlowState,
} from 'reactflow';
import { GadgetFlowNode, getFlowNodeTerms } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { MultiEdge } from './MultiEdge';
import problemData from "../game/examples/problem1.json"

import 'reactflow/dist/style.css';
import '../flow.css'
import { Axiom, HoleValueAssignment, getTermOfHandle, makeAxiomGadget, makeAxiomsFromJSONObject } from '../game/GameLogic';
import { Equation, unifyEquations } from '../game/Unification';
import { Term, makeTermWithFreshVariables } from '../game/Term';
import { GadgetId } from '../game/Primitives';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': MultiEdge }

const equationSelector = (state: ReactFlowState) => {
    return state.edges.map(edge => edge.data)
}

function compare(prev: Equation[], next: Equation[]) {
    return prev.length === next.length

}

export function Game() {
    const axioms = makeAxiomsFromJSONObject(problemData)

    const [gadgetIdCounter, setGadgetIdCounter] = useState(0)
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { getNode, screenToFlowPosition } = useReactFlow();

    function getGadgetId(): GadgetId {
        setGadgetIdCounter(gadgetIdCounter + 1)
        return "gadget_" + gadgetIdCounter
    }

    const equationsFromStore = useStore(equationSelector, compare)

    const [holeValueAssignment] = useMemo(() => {
        console.log("...unifying...")
        const [assignment, eqSatisfied] = unifyEquations(equationsFromStore)
        console.log("calculated assignment: ", assignment)
        const holeValueAssignment = (t: Term) => "x"
        setNodes(nodes => nodes.map(node => {
            const newData = { ...node.data, holeValueAssignment }
            return { ...node, data: newData }
        }))
        setEdges(edges => edges.map(edge => {
            const isSatisfied = eqSatisfied.get(edge.data)
            return { ...edge, animated: isSatisfied ? false : true }
        }))
        return [holeValueAssignment]
    }, [equationsFromStore, setNodes, setEdges])

    function addConnection(params: ReactFlowConnection): void {
        setEdges((edges) => {
            const sourceTerms: Term[] = getFlowNodeTerms(getNode(params.source!)!.data)
            const targetTerms: Term[] = getFlowNodeTerms(getNode(params.target!)!.data)
            const sourceTerm: Term = getTermOfHandle(params.sourceHandle!, sourceTerms)!
            const targetTerm: Term = getTermOfHandle(params.targetHandle!, targetTerms)!
            const equation: Equation = [sourceTerm, targetTerm]
            return addEdge({ ...params, type: 'multiEdge', data: equation }, edges)
        });
    }

    const onConnect = useCallback(addConnection, [getNode, setEdges]);

    function createNewGadget(axiom: Axiom, e: React.MouseEvent): void {
        const id = getGadgetId()
        const inputTerms = axiom.hypotheses.map(hyp => makeTermWithFreshVariables(hyp, id))
        const outputTerm = makeTermWithFreshVariables(axiom.conclusion, id)
        const emptyAssignment: HoleValueAssignment = (t: Term) => ""
        const newNode: ReactFlowNode =
        {
            id: id,
            type: 'gadgetFlowNode',
            position: screenToFlowPosition({
                x: e.clientX, y: 250
            }),
            data: { inputs: inputTerms, output: outputTerm, id, assignment: holeValueAssignment }
        }
        setNodes((nodes) => nodes.concat(newNode));
    }

    const panelProps: GadgetPaletteProps = {
        axioms: axioms,
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