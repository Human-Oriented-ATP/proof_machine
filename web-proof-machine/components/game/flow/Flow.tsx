import React from 'react';
import { NodeTypes, EdgeTypes, ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import { useGameStateContext } from 'lib/state/StateContextProvider';
import { GameSlice } from 'lib/state/Store';
import { useShallow } from 'zustand/react/shallow';
import { GadgetFlowNode } from './GadgetFlowNode';
import { CustomEdge } from './CustomEdge';
import { ConnectionLineComponent } from './ConnectionLineComponent';
import { ControlButtons } from './ControlButtons';

import '@xyflow/react/dist/base.css';
import './flow.css'

const nodeTypes: NodeTypes = { 'gadgetNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'customEdge': CustomEdge }

const selector = (state: GameSlice) => ({
    nodes: state.nodes,
    edges: state.edges,
    onInit: state.onInit,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onConnectStart: state.onConnectStart,
    isValidConnection: state.isValidConnection,
    onNodesDelete: state.onNodesDelete,
    onEdgesDelete: state.onEdgesDelete,
    onNodeDrag: state.onNodeDrag,
    onNodeDragStop: state.onNodeDragStop,
    settings: state.setup.settings,
});

export function Flow() {
    const { nodes, edges, onInit, onNodesChange, onEdgesChange, onConnect, onConnectStart, isValidConnection,
        onNodesDelete, onEdgesDelete, onNodeDrag, onNodeDragStop, settings } = useGameStateContext(useShallow(selector));

    // const onNodeDrag = useCallback((event: React.MouseEvent, node: GadgetNode) => {
    //     props.setUserIsDraggingOrNavigating(true)
    // }, [])

    // const onConnectEnd = useCallback(() => {
    //     props.setUserIsDraggingOrNavigating(false)
    //     enableHoleFocus()
    // }, [])

    const zoomProps = settings.zoomEnabled ? { minZoom: 0.1 } : { minZoom: 1, maxZoom: 1 }

    return <>
        <ReactFlow
            className='relative'
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgesDelete={onEdgesDelete}
            onNodesDelete={onNodesDelete}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            onInit={onInit}
            onConnectStart={onConnectStart}
            // onConnectEnd={onConnectEnd}
            isValidConnection={isValidConnection}
            onNodeDrag={onNodeDrag}
            // onNodeDragStart={() => props.setUserIsDraggingOrNavigating(true)}
            onNodeDragStop={onNodeDragStop}
            nodeOrigin={[0.5, 0.5]}
            // onMove={() => props.setUserIsDraggingOrNavigating(true)}
            // onMoveEnd={() => props.setUserIsDraggingOrNavigating(false)}
            {...zoomProps}
            panOnDrag={settings.panEnabled}
            connectionLineComponent={ConnectionLineComponent}
            zoomOnDoubleClick={false}
            autoPanOnConnect={false}
            autoPanOnNodeDrag={false}
        >
            <Background color="#bbb" size={1.8} variant={BackgroundVariant.Dots} />
        </ReactFlow>
        <ControlButtons />
    </>
}
