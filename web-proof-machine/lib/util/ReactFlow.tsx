import { Node, Edge, ReactFlowInstance } from 'reactflow';
import { GadgetProps } from '../game/Primitives';

export function hasTargetHandle(e: Edge, handleId: string): boolean {
    if (e.targetHandle) {
        return e.targetHandle === handleId;
    } else {
        return false;
    }
}
export function getGoalNode(props: GadgetProps): Node {
    return {
        id: props.id,
        type: 'gadgetFlowNode',
        position: { x: 300, y: 300 },
        data: props
    };
}

export function init(rf: ReactFlowInstance) {
    const goalNode: (Partial<Node> & { id: string }) = {
        id: "goal_gadget"
    }
    rf.fitView({ nodes: [goalNode] })
}
