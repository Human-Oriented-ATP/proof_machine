import { EdgeProps } from 'reactflow';
import { ConnectionDrawingData, connectionPath } from './ConnectionSvg';

export interface MultiEdgeProps {
    // to be implemented
}

export function MultiEdge({ ...props }: EdgeProps<MultiEdgeProps>): JSX.Element {
    const data: ConnectionDrawingData = {
        start: { x: props.sourceX, y: props.sourceY },
        end: { x: props.targetX, y: props.targetY },
        from_input: true, to_output: true
    }

    return (
        <g>
            {connectionPath(data)}
        </g>
    )
}
