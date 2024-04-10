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
    const { getNode, getNodes, getEdges, screenToFlowPosition, fitView } = useReactFlow();

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

    const onConnect = useCallback(addConnection, [props, setEdges, getEquationFromConnection]);
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

    const hasTargetHandle = useCallback((e: Edge, handleId : string) => {
        if (e.targetHandle) {
            return e.targetHandle === handleId
        } else {
            return false
        }
    }, [])

    const removeEdgesConnectedToHandle = useCallback((handleId : string) => {
        setEdges(edges => {
            const edgesConnectedToThisHandle = edges.filter(e => hasTargetHandle(e, handleId))
            edgesConnectedToThisHandle.map(e => props.deleteEquation(e.data))
            return edges.filter(e => !hasTargetHandle(e, handleId))
        })
    }, [hasTargetHandle, setEdges, props])


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
            const hasCycle = (node : ReactFlowNode, visited = new Set()) => {
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

        function colorsMatch(term1 : Term, term2 : Term): boolean {
            if ("label" in term1 && "label" in term2) {
                return term1.label === term2.label
            }
            return false
        }    

        const [source, target] = getEquationFromConnection(connection)
        const colorsOk = colorsMatch(source, target)
        const noCircle = doesNotCreateACycle()
        return colorsOk && noCircle
    }, [getEquationFromConnection]);

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
            onConnectStart={onConnectStart}
            isValidConnection={isValidConnection}
        >
            <MiniMap></MiniMap>
            <GadgetPalette {...paletteProps} />
            <Controls />
        </ReactFlow>
    )
}