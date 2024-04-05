import React, { useMemo } from 'react';
import { Edge, getConnectedEdges, Handle, HandleProps, useNodeId, useStore } from 'reactflow';

const selector = (s: any) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
});

const TargetHandle = (props: HandleProps) => {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    const isConnectable = useMemo(() => {
        function isConnectedToThisHandle(e: Edge): boolean {
            return props.id === e.targetHandle || props.id === e.sourceHandle
        }

        const node = nodeInternals.get(nodeId);
        const connectedEdges = getConnectedEdges([node], edges)
        const edgesConnectedToThisHandle = connectedEdges.filter(isConnectedToThisHandle)
        return edgesConnectedToThisHandle.length < 1

    }, [nodeInternals, edges, nodeId, props.id])

    return (
        <Handle {...props} isConnectable={isConnectable}></Handle>
    )
}

export default TargetHandle
