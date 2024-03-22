import { NodeDisplayProps } from '../game/Primitives';
import { Handle, HandleProps, Position } from 'reactflow';
import { Hole } from './Hole';
import { handleIdFromNodeId } from '../util/IdGenerator';

function styleFromColor(color: string): React.CSSProperties {
    const TRANSPARENCY = "AA"
    let bgcolor = "";
    switch (color) {
        case "red": bgcolor = "#ff0000"; break;
        case "yellow": bgcolor = "#ffff00"; break;
        case "green": bgcolor = "#00ee00"; break;
        case "blue": bgcolor = "#0000ff"; break;
        case "white": bgcolor = "#ffffff"; break;
        default: bgcolor = "#000000";
    }
    return { backgroundColor: bgcolor + TRANSPARENCY }
}

export function Node({ ...props }: NodeDisplayProps) {
    const handleId = handleIdFromNodeId(props.id)

    function handleProps(): HandleProps {
        if (props.isInput) {
            return { type: "target", position: Position.Left, id: handleId }
        } else {
            return { type: "source", position: Position.Right, id: handleId }
        }
    }

    return (
        <div className="nodeHandleWrapper" id={props.id}>
            <div className="node" style={styleFromColor(props.color)}>
                {props.holes.map(props => <Hole {...props}></Hole>)}
            </div>
            {!props.withoutHandles ? <Handle {...handleProps()}></Handle> : <></>}
        </div>
    )
}