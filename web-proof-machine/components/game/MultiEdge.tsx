import { EdgeProps } from 'reactflow';
import { ConnectionDrawingData, connectionPath } from './ConnectionSvg';

export function CustomEdge({ ...props }: EdgeProps): JSX.Element {
    const data: ConnectionDrawingData = {
        start: { x: props.sourceX, y: props.sourceY },
        end: { x: props.targetX, y: props.targetY },
        fromInput: true, toOutput: true
    }

    return (
        <g>
            {connectionPath(data, 0, 20)}
        </g>
    )
}
