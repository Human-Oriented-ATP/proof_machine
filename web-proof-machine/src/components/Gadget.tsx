import { useEffect, useState } from 'react'
import { Node } from './Node'
import { ConnectionSvg, ConnectionSvgProps, ConnectionDrawingData } from './ConnectionSvg'
import { Point, getCenterRelativeToParent } from '../util/Point'
import { GadgetDisplayProps, NodeDisplayProps, HolePosition, GadgetId, InternalConnection }
    from '../game/Primitives'

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

export function Gadget({ ...props }: GadgetDisplayProps) {
    const initialConnectionSetProps: ConnectionSvgProps = { connections: [] }
    const [connectionState, setConnectionState] = useState(initialConnectionSetProps)

    const withoutHandles = props.isInPalette

    function calculateInternalConnectionDrawingData(internalConnection: InternalConnection):
        ConnectionDrawingData {
        const start = calculateHolePosition(props.id, internalConnection.from)
        const end = calculateHolePosition(props.id, internalConnection.to)
        const [fromNode] = internalConnection.from
        const [toNode] = internalConnection.to
        const from_input = fromNode !== "output"
        const to_output = toNode === "output"
        return { start, end, from_input, to_output }
    }

    function calculateConnections(): ConnectionSvgProps {
        const connections = props.connections.map
            (connection => calculateInternalConnectionDrawingData(connection))
        return { connections }
    }

    useEffect(() => {
        setConnectionState(calculateConnections())
    }, [])

    function makeInputNodes(): JSX.Element[] {
        let buffer: JSX.Element[] = []
        for (let i = 0; i < props.inputs.length; i++) {
            const nodeProps = props.inputs[i]
            const nodeDisplayProps: NodeDisplayProps = {
                ...nodeProps,
                isInput: true,
                withoutHandles
            }
            buffer.push(<Node {...nodeDisplayProps}></Node>)
        }
        return buffer
    }

    function makeOutputNodeContainer(): JSX.Element {
        if (props.output) {
            const nodeDisplayProps = {
                ...props.output,
                isInput: false,
                withoutHandles
            }
            return (<div className="gadgetOutputContainer">
                <Node {...nodeDisplayProps}></Node>
            </div>)
        } else {
            return <></>
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <span style={{ color: "grey" }}>{props.id}</span>
            <div className="gadget" id={props.id}>
                <div className="gadgetInputContainer"
                    style={props.inputs.length === 0 ? { margin: "0px" } : {}}>
                    {makeInputNodes()}
                </div>
                {makeOutputNodeContainer()}
                <ConnectionSvg {...connectionState}></ConnectionSvg>
            </div>
        </div>
    )
}