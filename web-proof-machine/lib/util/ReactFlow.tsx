import { Node as ReactFlowNode, Edge } from 'reactflow';
import { GadgetProps } from '../game/Primitives';

export function hasTargetHandle(e: Edge, handleId: string): boolean {
    if (e.targetHandle) {
        return e.targetHandle === handleId;
    } else {
        return false;
    }
}
export function getGoal(props: GadgetProps): ReactFlowNode {
    return {
        id: props.id,
        type: 'gadgetFlowNode',
        position: { x: 300, y: 300 },
        data: props
    };
}
