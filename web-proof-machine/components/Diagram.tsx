import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
    useNodesState, useEdgesState, addEdge, NodeTypes, Connection, useReactFlow, Node as ReactFlowNode,
    EdgeTypes, Edge, HandleType, getOutgoers,
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
import { sameArity, colorsMatch } from 'lib/game/Term';
import { getAllTermsOfGadget } from './Gadget';
import { getGoalNode, hasTargetHandle, init } from '../lib/util/ReactFlow';
import { useCompletionCheck } from 'lib/util/CompletionCheckHook';
import { useCustomDelete } from 'lib/util/CustomDeleteHook';
import { useProximityConnect } from 'lib/util/ProximityConnectHook';
import { get } from 'http';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': CustomEdge }

interface DiagramProps {
    axioms: Axiom[]
    addEquation: (equation: Equation) => void
    deleteEquation: (equation: Equation) => void
    isSatisfied: Map<string, boolean>
    goal: GadgetProps
    controlProps: CustomControlProps
    setProblemSolved: (b: boolean) => void
}

export function Diagram(props: DiagramProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([getGoalNode(props.goal)]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const rf = useReactFlow();
    const [generateGadgetId] = useIdGenerator("gadget_")

    const getNode = rf.getNode
    const getNodes = rf.getNodes
    const getEdges = rf.getEdges

    const deleteEquationsOfEdges = useCallback((edges: Edge[]): void => {
        edges.map(e => props.deleteEquation(e.data))
    }, [edges, props])

    const getEquationFromConnection = useCallback((connection: Connection) => {
        const sourceTerms: Term[] = getAllTermsOfGadget(getNode(connection.source!)!.data)
        const targetTerms: Term[] = getAllTermsOfGadget(getNode(connection.target!)!.data)
        const sourceTerm: Term = getTermOfHandle(connection.sourceHandle!, sourceTerms)!
        const targetTerm: Term = getTermOfHandle(connection.targetHandle!, targetTerms)!
        const equation: Equation = [sourceTerm, targetTerm]
        return equation
    }, [getNode])

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

    const removeEdgesConnectedToHandle = useCallback((handleId: string) => {
        console.log("running")
        setEdges(edges => {
            const edgesConnectedToThisHandle = edges.filter(e => hasTargetHandle(e, handleId))
            deleteEquationsOfEdges(edgesConnectedToThisHandle)
            return edges.filter(e => !hasTargetHandle(e, handleId))
        })
    }, [setEdges, props])

    const savelyAddEdge = useCallback((connection: Connection): void => {
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
        console.log("end of function")
    }, [props, setEdges, getEquationFromConnection])

    const paletteProps: GadgetPaletteProps = {
        axioms: props.axioms,
        makeGadget: makeGadget
    }

    function makeGadget(axiom: Axiom, e: React.MouseEvent): void {
        const id = generateGadgetId()
        const flowNode: ReactFlowNode = {
            id: id,
            type: 'gadgetFlowNode',
            position: rf.screenToFlowPosition({
                x: 180, y: e.clientY
            }),
            data: axiomToGadget(axiom, id)
        }
        setNodes((nodes) => nodes.concat(flowNode));
    }

    // const onConnectStart = useCallback((event: React.MouseEvent | React.TouchEvent,
    //     params: { nodeId: string | null; handleId: string | null; handleType: HandleType | null; }) => {

    //     if (params.handleType === "target") {
    //         removeEdgesConnectedToHandle(params.handleId!)
    //     }
    // }, [removeEdgesConnectedToHandle]);

    const isInDiagram = useCallback((connection: Connection): boolean => {
        const equation = JSON.stringify(getEquationFromConnection(connection))
        return props.isSatisfied.has(equation)
    }, [edges, getEquationFromConnection])

    const isValidConnection = useCallback((connection: Connection) => {
        const [source, target] = getEquationFromConnection(connection)
        const arityOk = sameArity(source, target)
        const colorsOk = colorsMatch(source, target)
        const noCycle = doesNotCreateACycle(connection)
        const notYetAConection = !isInDiagram(connection)
        return colorsOk && arityOk && noCycle && notYetAConection
    }, [getEquationFromConnection, getEdges, getNodes]);

    const isSatisfied = props.isSatisfied

    const updateEdgeAnimation = useCallback(() => {
        setEdges(edges => edges.map(edge => {
            const edgeIsSatisfied = isSatisfied.get(JSON.stringify(edge.data))
            if (edgeIsSatisfied === undefined) {
                throw new Error("Something went wrong! There is an edge in the diagram without a corresponding equation")
            }
            return { ...edge, animated: !edgeIsSatisfied }
        }))
    }, [isSatisfied, setEdges])

    useEffect(() => {
        updateEdgeAnimation()
    }, [isSatisfied, setEdges, setNodes])

    // useCompletionCheck({ setProblemSolved: props.setProblemSolved, edges, nodes })
    // useCustomDelete({ isDeletable: (nodeId: string) => nodeId !== "goal_gadget", nodes, edges, setNodes, setEdges, deleteEquationsOfEdges })

    // const [onNodeDrag, onNodeDragStop] = useProximityConnect(rf, isValidConnection, savelyAddEdge)

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={(c) => {
                    console.log("onConnect")
                    savelyAddEdge(c)
                }}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                onInit={() => init(rf)}
                // onConnectStart={onConnectStart}
                isValidConnection={isValidConnection}
                deleteKeyCode={null}
                minZoom={0.1}
            // onNodeDrag={onNodeDrag}
            // onNodeDragStop={onNodeDragStop}
            >
                <GadgetPalette {...paletteProps} />
                <ControlButtons {...props.controlProps}></ControlButtons>
            </ReactFlow>
        </>
    )
}
