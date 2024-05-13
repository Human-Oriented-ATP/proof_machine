import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
    useNodesState, useEdgesState, addEdge, NodeTypes, Connection, useReactFlow, Node as ReactFlowNode,
    EdgeTypes, Edge, HandleType, getOutgoers
} from 'reactflow';
import { GadgetFlowNode } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { CustomEdge } from './MultiEdge';

import 'reactflow/dist/style.css';
import './flow.css'
import { axiomToGadget } from '../lib/game/GameLogic';
import { Axiom, GadgetId, NodePosition } from "../lib/game/Primitives";
import { Equation } from '../lib/game/Unification';
import { Term } from '../lib/game/Term';
import { GadgetProps } from '../lib/game/Primitives';
import { useIdGenerator } from '../lib/hooks/IdGeneratorHook';
import { ControlButtons, CustomControlProps } from './ControlButtons';
import { sameArity, colorsMatch } from 'lib/game/Term';
import { getGoalNode, hasTargetHandle, init } from '../lib/util/ReactFlow';
import { useCompletionCheck } from 'lib/hooks/CompletionCheckHook';
import { useCustomDelete } from 'lib/hooks/CustomDeleteHook';
import { useProximityConnect } from 'lib/hooks/ProximityConnectHook';
import { getNodePositionFromHandle, getTermOfHandle } from './Node';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': CustomEdge }

interface DiagramProps {
    axioms: Axiom[]
    addGadget: (gadgetId: string, axiom: Axiom) => void
    removeGadget: (gadgetId: string) => void
    addEquation: (from: [GadgetId, NodePosition], to: [GadgetId, NodePosition], equation: Equation) => void
    removeEquation: (from: [GadgetId, NodePosition], to: [GadgetId, NodePosition], equation: Equation) => void
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

    useCompletionCheck({ setProblemSolved: props.setProblemSolved, edges, nodes })

    const getConnectionInfo = useCallback((connection: Connection | Edge): { from: [GadgetId, NodePosition], to: [GadgetId, NodePosition] } => {
        const fromGadget = connection.source!
        const fromNode = getNodePositionFromHandle(connection.sourceHandle!)
        const toGadget = connection.target!
        const toNode = getNodePositionFromHandle(connection.targetHandle!)
        return { from: [fromGadget, fromNode], to: [toGadget, toNode] }
    }, [])

    const deleteEquationsOfEdges = useCallback((edges: Edge[]): void => {
        edges.map(e => {
            const connectionInfo = getConnectionInfo(e)
            props.removeEquation(connectionInfo.from, connectionInfo.to, e.data)
        })
    }, [edges, props])

    const getEquationFromConnection = useCallback((connection: Connection) => {
        const sourceTerms = getNode(connection.source!)!.data.terms
        const targetTerms = getNode(connection.target!)!.data.terms
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
        const edges = getEdges()
        const edgesConnectedToThisHandle = edges.filter(e => hasTargetHandle(e, handleId))
        deleteEquationsOfEdges(edgesConnectedToThisHandle)
        setEdges(edges => {
            return edges.filter(e => !hasTargetHandle(e, handleId))
        })
    }, [getEdges, setEdges, props])

    const savelyAddEdge = useCallback((connection: Connection): void => {
        removeEdgesConnectedToHandle(connection.targetHandle!)
        const equation = getEquationFromConnection(connection)
        const connectionInfo = getConnectionInfo(connection)
        props.addEquation(connectionInfo.from, connectionInfo.to, equation)
        setEdges((edges) => {
            return addEdge({
                ...connection,
                animated: true,
                type: 'multiEdge',
                data: equation
            }, edges)
        });
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
        props.addGadget(id, axiom)
        setNodes((nodes) => nodes.concat(flowNode));
    }

    const onConnectStart = useCallback((event: React.MouseEvent | React.TouchEvent,
        params: { nodeId: string | null; handleId: string | null; handleType: HandleType | null; }) => {

        if (params.handleType === "target") {
            removeEdgesConnectedToHandle(params.handleId!)
        }
    }, [removeEdgesConnectedToHandle]);


    const isInDiagram = useCallback((connection: Connection): boolean => {
        const edges = getEdges()
        return edges.some(edge => edge.sourceHandle === connection.sourceHandle && edge.targetHandle === connection.targetHandle)
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

    const highlightClasses = ["!border-dashed", "!animate-[spin_10s_linear_infinite]", "!border-black", "!bg-white"]

    const updateEdgeAnimation = useCallback(() => {
        function highlightHandle(handleId: string) {
            const handle = document.querySelector(`[data-handleid="${handleId}"]`);
            if (handle) {
                (handle as HTMLElement).classList.add(...highlightClasses)
            }
        }

        document.querySelectorAll("[data-handleid]").forEach(handle => {
            (handle as HTMLElement).classList.remove(...highlightClasses)
        })
        setEdges(edges => edges.map(edge => {
            const edgeIsSatisfied = isSatisfied.get(JSON.stringify(edge.data))
            if (edgeIsSatisfied === undefined) {
                throw new Error("Something went wrong! There is an edge in the diagram without a corresponding equation")
            }
            if (edgeIsSatisfied === false) {
                highlightHandle(edge.sourceHandle!)
                highlightHandle(edge.targetHandle!)
            }
            return { ...edge, animated: !edgeIsSatisfied }
        }))
    }, [isSatisfied, setEdges])

    useEffect(() => {
        updateEdgeAnimation()
    }, [isSatisfied, setEdges, setNodes])

    useCustomDelete({
        isDeletable: (nodeId: string) => nodeId !== "goal_gadget", nodes, edges, setNodes, setEdges,
        onEdgesDelete: deleteEquationsOfEdges,
        onNodesDelete: nodes => nodes.map(node => props.removeGadget(node.id))
    })

    const [onNodeDrag, onNodeDragStop] = useProximityConnect(rf, isValidConnection, savelyAddEdge)

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={(c) => {
                    savelyAddEdge(c)
                }}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                onInit={() => init(rf)}
                onConnectStart={onConnectStart}
                isValidConnection={isValidConnection}
                deleteKeyCode={null}
                minZoom={0.1}
                onNodeDrag={onNodeDrag}
                onNodeDragStop={onNodeDragStop}
            >
                <GadgetPalette {...paletteProps} />
                <ControlButtons {...props.controlProps}></ControlButtons>
            </ReactFlow>
        </>
    )
}
