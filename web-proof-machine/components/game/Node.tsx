import { NodeDisplayProps, NodePosition, isInputPosition, isOutputPosition } from '../../lib/game/Primitives';
import { Handle, HandleProps, Position } from '@xyflow/react';
import { Hole } from './Hole';
import { DummyHandle } from '../primitive/DummyHandle';
import { twJoin } from 'tailwind-merge';
import { Term } from 'lib/game/Term';
import { CustomHandle } from './CustomHandle';

function backgroundColorFromAbbreviation(abbreviation: string) {
    switch (abbreviation) {
        case "r": return "bg-red";
        case "y": return "bg-yellow";
        case "g": return "bg-green";
        case "b": return "bg-blue";
        case "w": return "bg-white";
        case "bl": return "bg-black";
        case "o": return "bg-orange";
        case "p": return "bg-purple";
        case "c": return "bg-cyan";
    }
}

function backgroundFromColorAbbreviation(abbreviation: string) {
    if (abbreviation.substring(0, 8) === "striped_") {
        const color = abbreviation.substring(8)
        return 'bg-striped ' + backgroundColorFromAbbreviation(color)
    } else {
        return backgroundColorFromAbbreviation(abbreviation)
    }
}

export function getHandleId(position: NodePosition, gadgetId: string): string {
    return `handle_${JSON.stringify(position)}_of_${gadgetId}`
}

export function getTermOfHandle(handleId: string, gadgetTerms: Map<NodePosition, Term>) {
    const position = handleId.split("_")[1]
    for (const [termPosition, term] of gadgetTerms) {
        if (JSON.stringify(termPosition) === position) {
            return term
        }
    }
    throw Error("Term not found for handle " + handleId)
}

export function getNodePositionFromHandle(handleId: string): NodePosition {
    const position = handleId.split("_")[1]
    return JSON.parse(position)
}

export function Node(props: NodeDisplayProps) {
    function getHandleProps(id: string): HandleProps {
        if (isInputPosition(props.position)) {
            return { type: "target", position: Position.Left, id }
        } else {
            return { type: "source", position: Position.Right, id }
        }
    }

    function renderHandle(): JSX.Element {
        if (!props.useDummyHandle) {
            const handleId = getHandleId(props.position, props.gadgetId)
            const handleProps = getHandleProps(handleId)
            return <Handle {...handleProps}><CustomHandle type={handleProps.type} isConnected={false} /></Handle>
        } else {
            const position = (isInputPosition(props.position)) ? "target" : "source"
            return <DummyHandle position={position}></DummyHandle>
        }
    }

    if ("variable" in props.term) {
        console.error("Term cannot be rendered as node:" + props.term)
        return <></>
    } else {
        const background = backgroundFromColorAbbreviation(props.term.label)
        return (
            <div className="flex items-center">
                <div className={twJoin("m-1 border-black border-2 rounded-lg p-0.5", background)}>
                    {props.term.args.map(arg => <Hole term={arg} focus={props.holeFocus}></Hole>)}
                </div>
                {renderHandle()}
            </div>
        )
    }
}