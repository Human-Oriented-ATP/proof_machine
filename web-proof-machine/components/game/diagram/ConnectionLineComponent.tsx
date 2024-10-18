import { ConnectionLineComponentProps } from "@xyflow/react";
import { ConnectionDrawingData, connectionPath } from "../gadget/ConnectionSvg";


export function ConnectionLineComponent(props: ConnectionLineComponentProps): JSX.Element {
    const data: ConnectionDrawingData = {
        start: { x: props.fromX, y: props.fromY },
        end: { x: props.toX, y: props.toY },
        fromInput: true,
        toOutput: true
    };

    return <g className='stroke-black'>
        {connectionPath(data, 0, 20)}
    </g>;
}
