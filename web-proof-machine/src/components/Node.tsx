import { Color, NodeDisplayProps } from '../game/Primitives';
import { Handle, HandleProps, Position } from 'reactflow';
import { Hole } from './Hole';

function styleFromColor(color: Color): React.CSSProperties {
    const TRANSPARENCY = "AA"
    let bgcolor = "";
    switch (color) {
        case "r": bgcolor = "#ff0000"; break;
        case "y": bgcolor = "#ffff00"; break;
        case "g": bgcolor = "#00ee00"; break;
        case "b": bgcolor = "#0000ff"; break;
        case "w": bgcolor = "#ffffff"; break;
        default: bgcolor = "#000000";
    }
    return { backgroundColor: bgcolor + TRANSPARENCY }
}

export function Node({ ...props }: NodeDisplayProps) {
    function handleProps(): HandleProps {
        if (props.isInput) {
            return { type: "target", position: Position.Left, id: props.handleId }
        } else {
            return { type: "source", position: Position.Right, id: props.handleId }
        }
    }

    return (
        <div className="nodeHandleWrapper">
            <div className="node" style={styleFromColor(props.color)}>
                {props.values.map(props => <Hole {...props}></Hole>)}
            </div>
            {!props.withoutHandles ? <Handle {...handleProps()}></Handle> : <></>}
        </div>
    )
}