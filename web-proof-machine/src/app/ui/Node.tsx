import { NodeDisplayProps } from '../lib/game/Primitives';
import { Handle, HandleProps, Position } from 'reactflow';
import { Hole } from './Hole';
import { handleIdFromTerm } from '../lib/game/GameLogic';
import { DummyHandle } from './DummyHandle';

function styleFromColor(color: string): React.CSSProperties {
    const TRANSPARENCY = "F0"
    let bgcolor = "";
    switch (color) {
        case "r": bgcolor = "#ff3838"; break;
        case "y": bgcolor = "#fff200"; break;
        case "g": bgcolor = "#32ff7e"; break;
        case "b": bgcolor = "#7d5fff"; break;
        case "w": bgcolor = "#eeeeee"; break;
        case "bl": bgcolor = "#3d3d3d"; break; // black
        case "o": bgcolor = "#ff9f1a"; break; // orange
        case "p": bgcolor = "#c56cf0"; break; // purple
        case "c": bgcolor = "#7efff5"; break; // cyan 
        default: bgcolor = "#000000";
    }
    return { backgroundColor: bgcolor + TRANSPARENCY }
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
        const style = styleFromColor(props.term.label)

        return (
            <div className="nodeHandleWrapper">
                <div className="node" style={style}>
                    {props.term.args.map(arg => <Hole term={arg} focus={props.holeFocus}></Hole>)}
                </div>
                {renderHandle()}
            </div>
        )
    }
}