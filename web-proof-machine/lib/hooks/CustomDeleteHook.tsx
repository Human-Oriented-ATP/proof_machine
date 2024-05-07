import { useEffect } from "react"
import { useKeyPress, Node, Edge } from "reactflow"

interface CustomDeleteProps {
    isDeletable: (nodeId: string) => boolean
    nodes: Node[]
    edges: Edge[]
    setNodes: any
    setEdges: any
    deleteEquationsOfEdges: (edges: Edge[]) => void
}

export function useCustomDelete(props: CustomDeleteProps) {
    const backspacePressed = useKeyPress("Backspace")

    useEffect(() => {
        function isSelectedAndDeletable(node: Node) {
            return node.selected && props.isDeletable(node.id!);
        }

        function getAdjacentEdges(node: Node) {
            const adjacentEdges = props.edges.filter(e => e.source === node.id || e.target === node.id)
            return adjacentEdges
        }

        function deleteDeletableSelectedNodes() {
            const nodesToBeDeleted = props.nodes.filter(node => isSelectedAndDeletable(node))
            const edgesToBeDeleted = nodesToBeDeleted.map(node => getAdjacentEdges(node)).flat()
            props.deleteEquationsOfEdges(edgesToBeDeleted)
            const edgeIds = edgesToBeDeleted.map(e => e.id)
            props.setEdges(edges => edges.filter(edge => !edgeIds.includes(edge.id)))
            props.setNodes(nodes => nodes.filter(node => !isSelectedAndDeletable(node)))
        }

        if (backspacePressed) {
            deleteDeletableSelectedNodes()
        }
    }, [backspacePressed])
}
