import { Color, NodeDisplayProps } from '../game/Primitives';
import { Handle, HandleProps, Position } from 'reactflow';
import { Hole } from './Hole';
import { handleIdFromTerm } from '../game/GameLogic';
import TargetHandle from './TargetHandle';

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
    function getHandle(id: string): JSX.Element {
        if (props.isInput) {
            const handleProps: HandleProps = { type: "target", position: Position.Left, id }
            return <TargetHandle {...handleProps}></TargetHandle>
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