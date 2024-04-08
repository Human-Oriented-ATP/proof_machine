import { Color, NodeDisplayProps } from '../game/Primitives';
import { Handle, HandleProps, Position } from 'reactflow';
import { Hole } from './Hole';
import { handleIdFromTerm } from '../game/GameLogic';

function styleFromColor(color: Color): React.CSSProperties {
    const TRANSPARENCY = "FF"
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

export function Node({ ...props }: NodeDisplayProps) {
    function getHandle(id: string): JSX.Element {
        if (props.isInput) {
            const handleProps: HandleProps = { type: "target", position: Position.Left, id }
            return <Handle {...handleProps}></Handle>
        } else {
            const handleProps: HandleProps = { type: "source", position: Position.Right, id }
            return <Handle {...handleProps}></Handle>
        }
    }

    function renderHandle(): JSX.Element {
        if (props.term) {
            const handleId: string = handleIdFromTerm(props.term!)
            return getHandle(handleId)
        } else {
            return <></>
        }
    }

    return (
        <div className="nodeHandleWrapper">
            <div className="node" style={styleFromColor(props.color)}>
                {props.values.map(props => <Hole {...props}></Hole>)}
            </div>
            {renderHandle()}
        </div>
    )
}