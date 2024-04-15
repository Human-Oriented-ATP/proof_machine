import { NodeDisplayProps } from '../game/Primitives';
import { Handle, HandleProps, Position } from 'reactflow';
import { Hole } from './Hole';
import { handleIdFromTerm } from '../game/GameLogic';

function styleFromColor(color: string): React.CSSProperties {
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
    function getHandleProps(id: string): HandleProps {
        if (props.isInput) {
            return { type: "target", position: Position.Left, id }
        } else {
            return { type: "source", position: Position.Right, id }
        }
    }

    function getDummyHandleProps(): HandleProps {
        if (props.isInput) {
            return { type: "target", position: Position.Left, isConnectable: false }
        } else {
            return { type: "source", position: Position.Right, isConnectable: false }
        }
    }

    function renderHandle(): JSX.Element {
        if (props.term) {
            const handleId: string = handleIdFromTerm(props.term!)
            return <Handle {...getHandleProps(handleId)}></Handle>
        } else {
            return <Handle {...getDummyHandleProps()}></Handle>
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
                    {props.term.args.map(arg => <Hole term={arg} setFocus={props.setFocus}></Hole>)}
                </div>
                {renderHandle()}
            </div>
        )
    }
}