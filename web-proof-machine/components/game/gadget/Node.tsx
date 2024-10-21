import { NodeDisplayProps, isInputPosition, isOutputPosition } from '../../../lib/game/Primitives';
import { Handle, HandleProps, Position } from '@xyflow/react';
import { Hole } from './Hole';
import { DummyHandle } from './DummyHandle';
import { twMerge } from 'tailwind-merge';
import { Connector } from './Connector';
import { makeHandleId } from 'lib/game/Handles';

function getBackgroundColorFromAbbreviation(abbreviation: string) {
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

function getBackgroundClassNameFromAbbreviation(abbreviation: string) {
    if (abbreviation.substring(0, 8) === "striped_") {
        const color = abbreviation.substring(8)
        return 'bg-striped ' + getBackgroundColorFromAbbreviation(color)
    } else {
        return getBackgroundColorFromAbbreviation(abbreviation)
    }
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
            const handleId = makeHandleId(props.position, props.gadgetId)
            const handleProps = getHandleProps(handleId)
            return <Handle {...handleProps}><Connector type={handleProps.type} /></Handle>
        } else {
            const position = (isInputPosition(props.position)) ? "target" : "source"
            return <DummyHandle position={position}></DummyHandle>
        }
    }

    if ("variable" in props.term) {
        console.error("Term cannot be rendered as node:" + props.term)
        return <></>
    } else {
        const backgroundClassName = getBackgroundClassNameFromAbbreviation(props.term.label)
        return (
            <div className="flex items-center">
                <div className={twMerge("m-1 border-black border-2 rounded-lg p-0.5", backgroundClassName, props.isGoalNode && "outline outline-offset-2 outline-2")}>
                    {props.term.args.map((arg, idx) => <Hole key={idx} term={arg}></Hole>)}
                </div>
                {renderHandle()}
            </div>
        )
    }
}