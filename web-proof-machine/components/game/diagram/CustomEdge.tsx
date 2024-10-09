import { ConnectionLineComponentProps, Edge, EdgeProps, useConnection, useReactFlow } from '@xyflow/react';
import { ConnectionDrawingData, connectionPath } from '../gadget/ConnectionSvg';
import { EquationId } from 'lib/game/Unification';

export type EdgeWithEquation = Edge<{ eq: EquationId }, 'edgeWithEquation'>

export function CustomEdge({ ...props }: EdgeProps<EdgeWithEquation>): JSX.Element {
    const data: ConnectionDrawingData = {
        start: { x: props.sourceX - 21, y: props.sourceY },
        end: { x: props.targetX + 9, y: props.targetY },
        fromInput: true, toOutput: true
    }

    return <g className='stroke-black'>
        {connectionPath(data, 0, 20)}
    </g>

}

export function ConnectionLineComponent(props: ConnectionLineComponentProps): JSX.Element {
    const data: ConnectionDrawingData = {
        start: { x: props.fromX, y: props.fromY },
        end: {x : props.toX, y: props.toY},
        fromInput: true,
        toOutput: true
    }
    
    return <g className='stroke-black'>
        {connectionPath(data, 0, 20)}
    </g>
}