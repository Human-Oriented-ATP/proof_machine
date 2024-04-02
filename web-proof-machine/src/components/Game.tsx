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
} from 'reactflow';
import { GadgetFlowNode } from './GadgetFlowNode';
import { GadgetPalette, GadgetPaletteProps } from './GadgetPalette';
import { MultiEdge } from './MultiEdge';

import 'reactflow/dist/style.css';
import '../flow.css'
import { useGameLogic } from '../game/GameLogicHook';
import { Axiom } from '../game/GameLogic';

const nodeTypes: NodeTypes = { 'gadgetFlowNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'multiEdge': MultiEdge }

export function Game() {
    const [gameLogic, makeAxiomGadget, makeGadget] = useGameLogic()
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();

    function addConnection(params: ReactFlowConnection): void {
        setEdges((edges) => {
            //
            return addEdge({ ...params, type: 'multiEdge' }, edges)
        });
    }

    const onConnect = useCallback(addConnection, [setEdges]);

    function createNewGadget(a: Axiom, e: React.MouseEvent): void {
        const gadgetContainerProps = makeGadget(a)
        const gadget = gadgetContainerProps.gadget
        const newNode: ReactFlowNode =
        {
            id: gadget.id,
            type: 'gadgetFlowNode',
            position: screenToFlowPosition({
                x: e.clientX, y: 250
            }),
            data: gadget,
            dragging: true
        }
        setNodes((nds) => nds.concat(newNode));
    }

    const panelProps: GadgetPaletteProps = {
        axioms: gameLogic.getAxioms(),
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