import { useCallback, useEffect } from "react"
import { useKeyPress, Node, Edge } from "reactflow"

interface CustomDeleteProps {
    isDeletable: (nodeId: string) => boolean
    nodes: Node[]
    edges: Edge[]
    setNodes: any
    setEdges: any
    onNodesDelete: (nodes: Node[]) => void
    onEdgesDelete: (edges: Edge[]) => void
}

export function useCustomDelete(props: CustomDeleteProps) {
    const backspacePressed = useKeyPress("Backspace")


    const deleteDeletableSelectedNodes = useCallback(() => {
        function isSelectedAndDeletable(node: Node) {
            return node.selected && props.isDeletable(node.id!);
        }

        function getAdjacentEdges(node: Node) {
            const adjacentEdges = props.edges.filter(e => e.source === node.id || e.target === node.id)
            return adjacentEdges
        }

        const nodesToBeDeleted = props.nodes.filter(node => isSelectedAndDeletable(node))
        props.onNodesDelete(nodesToBeDeleted)
        const edgesToBeDeleted = nodesToBeDeleted.map(node => getAdjacentEdges(node)).flat()
        props.onEdgesDelete(edgesToBeDeleted)
        const edgeIds = edgesToBeDeleted.map(e => e.id)
        props.setEdges(edges => edges.filter(edge => !edgeIds.includes(edge.id)))
        props.setNodes(nodes => nodes.filter(node => !isSelectedAndDeletable(node)))
    }, [])

    useEffect(() => {
        if (backspacePressed) {
            deleteDeletableSelectedNodes()
        }
    }, [backspacePressed])

    return deleteDeletableSelectedNodes
}
