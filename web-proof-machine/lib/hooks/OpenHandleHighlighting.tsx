import { useReactFlow, Edge, getIncomers, getConnectedEdges, } from '@xyflow/react';

import { useCallback, useEffect, useRef } from 'react';
import { GadgetNode } from 'components/game/diagram/GadgetFlowNode';
import { GadgetProps } from 'lib/game/Primitives';
import { makeHandleId, isTargetHandle } from 'components/game/gadget/Node';

interface CompletionCheckProps {
    nodes: GadgetNode[],
    edges: Edge[]
}

function getHandleIds(gadget: GadgetProps) {
    const positions = Array.from(gadget.terms.keys())
    return positions.map(position => makeHandleId(position, gadget.id))
}

export function useOpenHandleHighlighting(props: CompletionCheckProps) {
    const { getNode, setNodes } = useReactFlow<GadgetNode>();

    const openHandles = useRef<string[]>([])

    const isOpenHandle = useCallback((handleId: string, nodeId: string) => {
        const appearsInEdge = props.edges.map(edge => edge.target === nodeId && edge.targetHandle === handleId)
        const appearsInAnyEdge = appearsInEdge.includes(true)
        return isTargetHandle(handleId) && !appearsInAnyEdge
    }, [props])

    const getOpenHandlesOfNode = useCallback((node: GadgetNode): string[] => {
        const handleIds = getHandleIds(node.data)
        const openHandleIds = handleIds.filter(handleId => isOpenHandle(handleId, node.id))
        return openHandleIds
    }, [props])

    const calculateOpenHandles = useCallback(() => {
        const goalNode = getNode("goal_gadget")!
        openHandles.current = []
        let currentLayer = [goalNode]
        while (true) {
            for (const node of currentLayer) {
                openHandles.current = openHandles.current.concat(getOpenHandlesOfNode(node))
            }
            const nextLayer = currentLayer.map(node => getIncomers(node, props.nodes, props.edges)).flat()
            if (nextLayer.length === 0) {
                break
            } else {
                currentLayer = nextLayer
            }
        }
    }, [props.edges])

    useEffect(() => {
        const updateNodesWithOpenHandles = async () => {
            await calculateOpenHandles()
            setNodes((nodes) =>
                nodes.map(node => ({ ...node, data: { ...node.data, openHandles: openHandles.current } }))
            );
        };

        updateNodesWithOpenHandles();
    }, [props.edges, setNodes])

}
