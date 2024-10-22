import React, { useRef } from 'react';
import { NodeTypes, useReactFlow, EdgeTypes, Edge, XYPosition, ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import { GadgetFlowNode, GadgetNode } from './GadgetFlowNode';
import { CustomEdge } from './CustomEdge';
import { ConnectionLineComponent } from './ConnectionLineComponent';
import { useShallow } from 'zustand/react/shallow';

import '@xyflow/react/dist/base.css';
import './flow.css'
import { ControlButtons } from './ControlButtons';
import { useGameStateContext } from 'lib/state/StateContextProvider';
import { GameSlice } from 'lib/state/Store';

const nodeTypes: NodeTypes = { 'gadgetNode': GadgetFlowNode }
const edgeTypes: EdgeTypes = { 'customEdge': CustomEdge }

const selector = (state: GameSlice) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onConnectStart: state.onConnectStart,
    isValidConnection: state.isValidConnection,
    onInit: state.onInit,
    settings: state.setup.settings,
    onNodesDelete: state.onNodesDelete,
    onEdgesDelete: state.onEdgesDelete,
    onNodeDragStop: state.onNodeDragStop
});

export function Flow() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onConnectStart,
        onNodesDelete, onEdgesDelete, isValidConnection, onInit, onNodeDragStop, settings } = useGameStateContext(useShallow(selector));

    // useCompletionCheck({ markLevelAsCompleted: props.markLevelAsCompleted, nodes, edges })
    // useOpenHandleHighlighting({ nodes, edges })

    // const savelyAddEdge = useCallback((connection: Connection): void => {
    //     removeEdgesConnectedToHandle(connection.targetHandle!)
    //     const equation = getEquationFromConnection(connection)
    //     const connectionInfo = getConnectionInfo(connection)
    //     props.addEquation(connectionInfo.from, connectionInfo.to, equation)
    //     setEdges((edges) => {
    //         return addEdge({
    //             ...connection,
    //             type: 'customEdge',
    //             animated: true,
    //             data: { eq: getEquationId(connectionInfo.from, connectionInfo.to) }
    //         }, edges)
    //     });
    // }, [props, setEdges, getEquationFromConnection, props.addEquation])

    // const enableHoleFocus = useCallback(() => {
    //     setNodes(nodes => nodes.map(node => {
    //         return { ...node, data: { ...node.data, displayHoleFocus: true } }
    //     }))
    // }, [])

    // const onConnect = useCallback((connection: Connection) => {
    //     savelyAddEdge(connection)
    // }, [savelyAddEdge])

    // const [onNodeDragProximityConnect, onNodeDragStopProximityConnect] = props.proximityConnectEnabled ?
    //     useProximityConnect(rf, isValidConnection, savelyAddEdge)
    //     : [(e, n) => void 0, (e, n) => void 0]

    // const onNodeDrag = useCallback((event: React.MouseEvent, node: GadgetNode) => {
    //     onNodeDragProximityConnect(event, node)
    //     props.setUserIsDraggingOrNavigating(true)
    // }, [])

    // const onNodeDragStop = useCallback((event: React.MouseEvent, node: GadgetNode) => {
    //     if (isAbovePalette({ x: event.clientX, y: event.clientY })) {
    //         const edgesToBeDeleted = getEdges().filter(e => node.id === e.source || node.id === e.target)
    //         if (gadgetThatIsBeingAdded.current !== undefined) {
    //             gadgetThatIsBeingAdded.current = undefined
    //             deleteEquationsOfEdges(edgesToBeDeleted)
    //             setNodes(nodes => nodes.filter(n => n.id !== node.id))
    //         } else {
    //             props.removeGadget(node.id)
    //             deleteEquationsOfEdges(edgesToBeDeleted)
    //             setNodes(nodes => nodes.filter(n => n.id !== node.id || n.deletable === false))
    //         }
    //         setEdges(edges => edges.filter(e => node.id !== e.source && node.id !== e.target))
    //     } else {
    //         if (gadgetThatIsBeingAdded.current !== undefined) {
    //             props.addGadget(gadgetThatIsBeingAdded.current.gadgetId, gadgetThatIsBeingAdded.current.axiom)
    //         }
    //         onNodeDragStopProximityConnect(event, node)
    //     }
    //     props.setUserIsDraggingOrNavigating(false)
    // }, [props.removeGadget])

    // const onConnectEnd = useCallback(() => {
    //     props.setUserIsDraggingOrNavigating(false)
    //     // enableHoleFocus()
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
            // onNodeDrag={onNodeDrag}
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
