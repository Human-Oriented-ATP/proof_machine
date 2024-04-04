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
import { Term, TermAssignment, hashTerm, makeTermWithFreshVariables } from '../game/Term';
import { useIdGenerator } from '../util/IdGeneratorHook';
import { useMap } from 'usehooks-ts';
import { HoleValue } from '../game/Primitives';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': MultiEdge }

const equationSelector = (state: ReactFlowState) => {
    return state.edges.map(edge => edge.data)
}

function compare(prev: Equation[], next: Equation[]) {
    return prev.length === next.length

}

function getNextFreeHoleValue(offset: number, enumerationMap: Map<number, HoleValue>): number {
    const values = Array.from(enumerationMap.values())
    for (let i = offset; true; i++) {
        if (!values.includes(i)) {
            return i
        }
    }
}

function updateEnumeration(offset: number, immutablePreviousEnumeration: Map<number, HoleValue>,
    termAssignment: TermAssignment) {
    let previousEnumeration = new Map(immutablePreviousEnumeration)
    const allAssignedTerms = termAssignment.getAssignedValues()
    for (const term of allAssignedTerms) {
        const hash = hashTerm(term)
        if (!(hash in previousEnumeration.keys())) {
            const value = getNextFreeHoleValue(offset, previousEnumeration)
            previousEnumeration.set(hash, value)
        }
    }
    return previousEnumeration
}

function toHoleValue(t: Term, enumerationMap: Map<number, HoleValue>): HoleValue {
    if ("variable" in t) {
        throw Error("Cannot get hole value for a variable" + t)
    } else {
        if (t.args.length === 0) {
            const value = Number(t.label)
            return value
        } else {
            const hash = hashTerm(t)
            const lookup = enumerationMap.get(hash)
            if (lookup) {
                return lookup
            } else {
                return "?"
            }
        }
    }
}

function getHoleValueAssignment(enumerationMap: Map<number, HoleValue>, termAssignment: TermAssignment):
    HoleValueAssignment {
    return (t => {
        if ("variable" in t) {
            const term = termAssignment.getAssignedValue(t.variable)
            if (term) {
                return toHoleValue(term, enumerationMap)
            } else {
                return ""
            }
        } else {
            return toHoleValue(t, enumerationMap)
        }
    })
}

export function Game() {
    const axioms = makeAxiomsFromJSONObject(problemData)
    const getGadgetId = useIdGenerator("gadget_")
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { getNode, screenToFlowPosition } = useReactFlow();
    const equationsFromStore = useStore(equationSelector, compare)

    const init = new Map()
    const [enumerationMap, setEnumerationMap] = useState<Map<number, HoleValue>>(init)

    const offset = 5

    const [assignment, eqSatisfied] = useMemo(() => {
        console.log("...unifying...")
        const [assignment, eqSatisfied] = unifyEquations(equationsFromStore)
        console.log("...calculated assignment: ", assignment)
        setEnumerationMap(map => updateEnumeration(offset, map, assignment))
        return [assignment, eqSatisfied]
    }, [equationsFromStore, setEnumerationMap])

    // Need to useMemo so this only happens when the values actually change 
    const updateDiagramElements = useMemo(() => {
        console.log("...in 2nd memo function...")
        console.log("enumMap", enumerationMap)
        const holeValueAssignment = getHoleValueAssignment(enumerationMap, assignment)
        setNodes(nodes => nodes.map(node => {
            const newData = { ...node.data, assignment: holeValueAssignment }
            return { ...node, data: newData }
        }))
        setEdges(edges => edges.map(edge => {
            const isSatisfied = eqSatisfied.get(edge.data)
            return { ...edge, animated: isSatisfied ? false : true }
        }))
    }, [assignment, eqSatisfied, enumerationMap, setNodes, setEdges]);


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
                x: e.clientX, y: 450
            }),
            data: { inputs: inputTerms, output: outputTerm, id, assignment: emptyAssignment }
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