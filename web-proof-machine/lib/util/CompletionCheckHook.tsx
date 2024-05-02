import { useReactFlow, Node, Edge, getIncomers, getConnectedEdges, } from 'reactflow';

import { useCallback, useEffect } from 'react';

interface CompletionCheckProps {
    setProblemSolved: (solved: boolean) => void
    edges: Edge[]
    nodes: Node[]
}

export function useCompletionCheck(props: CompletionCheckProps) {
    const { getNode } = useReactFlow();

    const onlyContainsValidConnections = useCallback((edges: Edge[]) => {
        return edges.every(edge => !edge.animated);
    }, [])

    const hasUnconnectedInputHandle = useCallback((node: Node): boolean => {
        const numberOfIncomingEdges = getIncomers(node, props.nodes, props.edges).length
        const numberOfInputTerms = node.data.inputs.length
        return numberOfInputTerms !== numberOfIncomingEdges
    }, [])

    const isCompleted = useCallback((): boolean => {
        const goalNode = getNode("goal_gadget")!
        let observedComponent: Node<any>[] = []
        let currentLayer = [goalNode]
        while (true) {
            for (const node of currentLayer) {
                if (hasUnconnectedInputHandle(node)) {
                    return false
                }
            }
            observedComponent = observedComponent.concat(currentLayer)
            const nextLayer = currentLayer.map(node => getIncomers(node, props.nodes, props.edges)).flat()
            if (nextLayer.length === 0) {
                break
            } else {
                currentLayer = nextLayer
            }
        }
        const edgesInComponent = getConnectedEdges(observedComponent, props.edges)
        return onlyContainsValidConnections(edgesInComponent)
    }, [getNode, props])

    useEffect(() => {
        props.setProblemSolved(isCompleted())
    }, [isCompleted])
}
