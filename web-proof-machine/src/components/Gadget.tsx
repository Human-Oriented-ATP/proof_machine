import { useLayoutEffect, useState } from 'react'
import { Node } from './Node'
import { ConnectionSvg, ConnectionSvgProps, ConnectionDrawingData } from './ConnectionSvg'
import { Point, getCenterRelativeToParent } from '../util/Point'
import { GadgetProps, NodeDisplayProps, HolePosition, GadgetId, InternalConnection }
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

export function Gadget({ ...props }: GadgetProps) {
    const initialConnectionSetProps: ConnectionSvgProps = { connections: [] }
    const [connectionState, setConnectionState] = useState(initialConnectionSetProps)

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

    function calculateConnections(): ConnectionSvgProps {
        const connections = props.connections.map
            (connection => calculateInternalConnectionDrawingData(connection))
        return { connections }
    }

    useLayoutEffect(() => {
        setConnectionState(calculateConnections())
    }, [])

    function makeInputNodes(): JSX.Element[] {
        let buffer: JSX.Element[] = []
        for (let i = 0; i < props.inputs.length; i++) {
            const nodeProps = props.inputs[i]
            const nodeDisplayProps: NodeDisplayProps = {
                ...nodeProps,
                isInput: true
            }
            buffer.push(<Node {...nodeDisplayProps}></Node>)
        }
        return buffer
    }

    function makeOutputNodeContainer(): JSX.Element {
        if (props.output) {
            const nodeDisplayProps = {
                ...props.output,
                isInput: false
            }
            return (<div className="gadgetOutputContainer">
                <Node {...nodeDisplayProps}></Node>
            </div>)
        } else {
            return <></>
        }
    }

    const numberOfInputHolesPerNode = props.inputs.map(node => node.values.length)
    const numberOfInputHoles = numberOfInputHolesPerNode.reduce((a, b) => a + b, 0)
    const margin = 5 * numberOfInputHoles

    return (
        <div style={{ textAlign: "center" }}>
            {/* <span style={{ color: "grey" }}>{props.id}</span> */}
            <div className="gadget" id={props.id}>
                <div className="gadgetInputContainer"
                    style={props.inputs.length === 0 ? {} : { marginRight: margin + "px" }}>
                    {makeInputNodes()}
                </div>
                {makeOutputNodeContainer()}
                <ConnectionSvg {...connectionState}></ConnectionSvg>
            </div>
        </div>
    )
}