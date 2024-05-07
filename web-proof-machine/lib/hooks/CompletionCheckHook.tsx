import { useReactFlow, Node, Edge, getIncomers, getConnectedEdges, } from 'reactflow';

import { useEffect } from 'react';
import { GadgetProps, isInputPosition } from 'lib/game/Primitives';

interface CompletionCheckProps {
    setProblemSolved: (solved: boolean) => void
    edges: Edge[]
    nodes: Node[]
}

function onlyContainsValidConnections(edges: Edge[]) {
    return edges.every(edge => !edge.animated);
}

function getNumberOfInputTerms(gadget: GadgetProps) {
    const inputTerms = Array.from(gadget.terms.keys()).filter(pos => isInputPosition(pos))
    return inputTerms.length
}

export function useCompletionCheck(props: CompletionCheckProps) {
    const { getNode, getEdges } = useReactFlow();

    useEffect(() => {
        function hasUnconnectedInputHandle(node: Node): boolean {
            const edges = getEdges()
            const incomingEdges = edges.filter(edge => edge.target === node.id)
            const numberOfInputTerms = getNumberOfInputTerms(node.data)
            return numberOfInputTerms !== incomingEdges.length
        }

        function isCompleted(): boolean {
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
        }

        props.setProblemSolved(isCompleted())
    }, [getNode, props.edges, props.nodes, props.setProblemSolved])
}
