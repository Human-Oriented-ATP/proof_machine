import { NodeDisplayProps } from '../lib/game/Primitives';
import { Handle, HandleProps, Position } from 'reactflow';
import { Hole } from './Hole';
import { handleIdFromTerm } from '../lib/game/GameLogic';
import { DummyHandle } from './DummyHandle';
import { twJoin } from 'tailwind-merge';

function colorFromColorAbbreviation(abbreviation: string) {
    let bgcolor = "";
    switch (abbreviation) {
        case "r": bgcolor = "red"; break;
        case "y": bgcolor = "yellow"; break;
        case "g": bgcolor = "green"; break;
        case "b": bgcolor = "blue"; break;
        case "w": bgcolor = "white"; break;
        case "bl": bgcolor = "black"; break;
        case "o": bgcolor = "orange"; break;
        case "p": bgcolor = "purple"; break;
        case "c": bgcolor = "cyan"; break;
    }
    return bgcolor
}

export function Node(props: NodeDisplayProps) {
    function getHandleProps(id: string): HandleProps {
        if (props.isInput) {
            return { type: "target", position: Position.Left, id }
        } else {
            return { type: "source", position: Position.Right, id }
        }
    }

    function renderHandle(): JSX.Element {
        if (!props.useDummyHandle) {
            const handleId: string = handleIdFromTerm(props.term!)
            return <Handle {...getHandleProps(handleId)}></Handle>
        } else {
            const position = props.isInput ? "left" : "right"
            return <DummyHandle position={position}></DummyHandle>
        }
    }

    if ("variable" in props.term) {
        console.error("Term cannot be rendered as node:" + props.term)
        return <></>
    } else {
        const color = colorFromColorAbbreviation(props.term.label)

        return (
            <div className="flex items-center">
                <div className={twJoin("m-1 border-black border-2 rounded-lg p-0.5",
                    `bg-${color}`)}>
                    {props.term.args.map(arg => <Hole term={arg} focus={props.holeFocus}></Hole>)}
                </div>
                {renderHandle()}
            </div>
        )
    }
}