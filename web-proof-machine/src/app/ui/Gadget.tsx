import { useLayoutEffect, useState } from 'react'
import { Node } from './Node'
import { ConnectionSvg, ConnectionSvgProps, ConnectionDrawingData } from './ConnectionSvg'
import { Point, getCenterRelativeToParent } from '../lib/util/Point'
import { GadgetProps, NodeDisplayProps, GadgetId, Focus }
    from '../lib/game/Primitives'
import { HolePosition, InternalConnection, makeConnections } from '../lib/game/ConnectionsFromTerms'

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

        if (props.output) {
            const connections = makeConnections(props.inputs, props.output)
            const drawingData = connections.map(calculateInternalConnectionDrawingData)
            setConnectionState({ connections: drawingData })
        }

    }, [props.inputs, props.output, props.id])

    function makeInputNodes(): JSX.Element[] {
        let buffer: JSX.Element[] = []
        for (let i = 0; i < props.inputs.length; i++) {
            const term = props.inputs[i]
            const nodeDisplayProps: NodeDisplayProps = {
                term,
                holeFocus: focus,
                isInput: true,
                useDummyHandle: props.useDummyHandle,
            }
            buffer.push(<Node {...nodeDisplayProps}></Node>)
        }
        return buffer
    }

    function makeOutputNodeContainer(): JSX.Element {
        if (props.output) {
            const nodeDisplayProps = {
                term: props.output,
                holeFocus: focus,
                isInput: false,
                useDummyHandle: props.useDummyHandle,
            }
            return (<div className="gadgetOutputContainer">
                <Node {...nodeDisplayProps}></Node>
            </div>)
        } else {
            return <></>
        }
    }

    const numberOfInputHolesPerNode = props.inputs.map(term => {
        if ('variable' in term) {
            return 0
        } else {
            return term.args.length
        }
    })
    const numberOfInputHoles = numberOfInputHolesPerNode.reduce((a, b) => a + b, 0)
    const margin = props.output ? 5 * numberOfInputHoles : 0

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