import { EdgeProps } from 'reactflow';
import { ConnectionDrawingData, connectionPath } from './ConnectionSvg';

export function CustomEdge({ ...props }: EdgeProps): JSX.Element {
    const data: ConnectionDrawingData = {
        start: { x: props.sourceX - 1, y: props.sourceY },
        end: { x: props.targetX + 9, y: props.targetY },
        fromInput: true, toOutput: true
    }

    return (
        <g className='stroke-black'>
            {connectionPath(data, 0, 20)}
        </g>
    )
}
