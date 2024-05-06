import { useLayoutEffect, useState } from 'react'
import { Node } from './Node'
import { ConnectionSvg, ConnectionSvgProps, ConnectionDrawingData } from './ConnectionSvg'
import { Point, getCenterRelativeToParent } from '../lib/util/Point'
import { GadgetProps, NodeDisplayProps, GadgetId, Focus, isInputPosition, outputPosition, isOutputPosition }
    from '../lib/game/Primitives'
import { HolePosition, InternalConnection, makeConnections } from '../lib/game/ConnectionsFromTerms'
import { twMerge } from 'tailwind-merge'

function calculateOutputHolePosition(gadget: HTMLElement, holeIndex: number) {
    const outputNodeContainer = gadget.childNodes[1]
    const outputNode = outputNodeContainer.childNodes[0].childNodes[0]
    const holeElement = outputNode.childNodes[holeIndex]
    return getCenterRelativeToParent(holeElement as HTMLElement)
}

function calculateInputHolePosition(gadget: HTMLElement, nodeIndex: number, holeIndex: number) {
    const inputNodeContainer = gadget.childNodes[0]
    const nodeElement = inputNodeContainer.childNodes[nodeIndex].childNodes[0]
    const holeElement = nodeElement.childNodes[holeIndex]
    return getCenterRelativeToParent(holeElement as HTMLElement)
}

function calculateHolePositionFromGadgetHTMLElement(gadget: HTMLElement, hole: HolePosition) {
    const [nodeIndex, holeIndex] = hole
    if (nodeIndex === "output") {
        return calculateOutputHolePosition(gadget, holeIndex)
    } else {
        return calculateInputHolePosition(gadget, nodeIndex, holeIndex)
    }
}

export function calculateHolePosition(gadgetId: GadgetId, hole: HolePosition): Point {
    const gadget = document.getElementById(gadgetId)
    if (gadget) {
        return calculateHolePositionFromGadgetHTMLElement(gadget, hole)
    } else {
        throw new Error("Couldn't find gadget with id " + gadgetId)
    }
}

export function Gadget({ ...props }: GadgetProps) {
    const initialConnectionSetProps: ConnectionSvgProps = { connections: [] }
    const [connectionState, setConnectionState] = useState(initialConnectionSetProps)
    const [focussedHole, setFocussedHole] = useState("")

    const focus: Focus<string> = {
        isFocussed: hole => hole === focussedHole,
        focus: hole => setFocussedHole(hole),
        resetFocus: () => setFocussedHole("")
    }

    function hasOutputNode(): boolean {
        const positions = Array.from(props.terms.keys())
        return positions.some(isOutputPosition)
    }

    useLayoutEffect(() => {
        function calculateInternalConnectionDrawingData(internalConnection: InternalConnection):
            ConnectionDrawingData {
            const start = calculateHolePosition(props.id, internalConnection.from)
            const end = calculateHolePosition(props.id, internalConnection.to)
            const [fromNode] = internalConnection.from
            const [toNode] = internalConnection.to
            const from_input = fromNode !== "output"
            const to_output = toNode === "output"
            return { start, end, fromInput: from_input, toOutput: to_output }
        }

        if (hasOutputNode()) {
            const inputs = Array.from(props.terms).filter(key => isInputPosition(key[0]))
            const inputTerms = inputs.map(kv => kv[1])
            const connections = makeConnections(inputTerms, props.terms.get(outputPosition)!)
            const drawingData = connections.map(calculateInternalConnectionDrawingData)
            setConnectionState({ connections: drawingData })
        }

    }, [props.terms, props.id])

    function makeInputNodes(): JSX.Element[] {
        let buffer: JSX.Element[] = []
        for (const [position, term] of props.terms) {
            const nodeDisplayProps: NodeDisplayProps = {
                term,
                position: position,
                gadgetId: props.id,
                holeFocus: focus,
                useDummyHandle: props.isAxiom,
            }
            if (isInputPosition(position)) {
                buffer.push(<Node {...nodeDisplayProps}></Node>)
            }
        }
        return buffer
    }

    function makeOutputNodeContainer(): JSX.Element {
        if (hasOutputNode()) {
            const nodeDisplayProps = {
                term: props.terms.get(outputPosition)!,
                position: outputPosition,
                gadgetId: props.id,
                holeFocus: focus,
                useDummyHandle: props.isAxiom,
            }
            return (<div className="flex flex-col justify-center">
                <Node {...nodeDisplayProps}></Node>
            </div>)
        } else {
            return <></>
        }
    }

    function hasInputNodes(): boolean {
        return Array.from(props.terms.keys()).some(isInputPosition)
    }

    return (
        <div className="text-center relative">
            {/* <span style={{ color: "grey" }}>{props.id}</span> */}
            <div className={twMerge("flex", hasInputNodes() && "space-x-5")} id={props.id}>
                <div className="flex flex-col items-start">
                    {makeInputNodes()}
                </div>
                {makeOutputNodeContainer()}
            </div>
            <ConnectionSvg {...connectionState}></ConnectionSvg>
        </div>
    )
}