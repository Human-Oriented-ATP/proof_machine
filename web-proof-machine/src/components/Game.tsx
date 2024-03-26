import { useCallback, useState } from 'react';
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
    Edge
} from 'reactflow';
import { GadgetFlowNode } from './GadgetFlowNode';
import { AbstractGadgetProps, GadgetDisplayProps, AbstractNodeProps } from '../game/Primitives';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { MultiEdge } from './MultiEdge';
import { gadgetIdFromNodeId, nodeIdFromHandleId, nodePositionFromNodeId } from '../util/IdGenerator';

import 'reactflow/dist/style.css';
import '../flow.css'
import { axiom, axiom2 } from '../util/AxiomsForTesting';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': MultiEdge }

interface GameState {
    activeGadgets: GadgetDisplayProps[]
    nextId: number
}

const initialState: GameState = {
    activeGadgets: [],
    nextId: 0
}

export function Game() {
    const [state, setState] = useState(initialState);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();

    function makeNewId(): number {
        const id = state.nextId
        setState({ ...state, nextId: state.nextId + 1 })
        return id
    }

    function getGadgetFromId(gadgetId: string): GadgetDisplayProps {
        for (let i = 0; i < state.activeGadgets.length; i++) {
            if (state.activeGadgets[i].id === gadgetId) {
                return state.activeGadgets[i]
            }
        }
        throw Error("No gadget with id: " + gadgetId)
    }

    function getNodeAndGadgetFromNodeId(nodeId: string): [AbstractNodeProps, GadgetDisplayProps] {
        const gadgetId = gadgetIdFromNodeId(nodeId)
        const gadget = getGadgetFromId(gadgetId)
        const position = nodePositionFromNodeId(nodeId)
        if (position === "output") {
            if (gadget.outputNode) {
                return [gadget.outputNode, gadget]
            } else {
                throw Error("Not a node id: " + nodeId)
            }
        } else {
            const node = gadget.inputNodes[position]
            return [node, gadget]
        }
    }

    function isValidConnection(sourceHandleId: string, targetHandleId: string) {
        const sourceNodeId = nodeIdFromHandleId(sourceHandleId)
        const targetNodeId = nodeIdFromHandleId(targetHandleId)
        const [sourceNode] = getNodeAndGadgetFromNodeId(sourceNodeId)
        const [targetNode] = getNodeAndGadgetFromNodeId(targetNodeId)
        return sourceNode.color === targetNode.color
            && sourceNode.holes.length === targetNode.holes.length
    }

    function addEdgeIfValid(edges: Edge<any>[], params: ReactFlowConnection): Edge[] {
        if (isValidConnection(params.sourceHandle!, params.targetHandle!)) {
            // Call unification
            return addEdge({ ...params, type: 'multiEdge' }, edges)
        } else {
            return edges
        }
    }

    function addConnection(params: ReactFlowConnection): void {
        setEdges((edges) => addEdgeIfValid(edges, params))
    }

    function createNewGadget(e: MouseEvent, axiom: AbstractGadgetProps) {
        const newId = makeNewId()
        const gadgetId = "gadget" + newId
        const newGadget = {
            ...axiom,
            id: gadgetId,
            isAxiom: false
        }
        state.activeGadgets.push(newGadget)
        // Call unification
        const newNode: ReactFlowNode =
        {
            id: newId.toString(),
            type: 'gadgetFlowNode',
            position: screenToFlowPosition({
                x: e.clientX, y: 250
            }),
            data: newGadget,
            dragging: true
        }
        setNodes((nds) => nds.concat(newNode));
    }

    const onConnect = useCallback(addConnection, [setEdges]);

    const panelProps: GadgetPaletteProps = { axioms: [axiom, axiom2], createNewGadget }

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