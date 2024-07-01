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
        position: { x: 0, y: 0 },
        data: props
    };
}

export function init(rf: ReactFlowInstance) {
    const rect = document.getElementById("root")?.getBoundingClientRect()!
    const positionX = rect.width * 4 / 5
    const positionY = rect.height / 2
    const rfPosition = rf.screenToFlowPosition({ x: positionX, y: positionY })
    const currentZoom = rf.getZoom()
    rf.setViewport({ x: rfPosition.x, y: rfPosition.y, zoom: currentZoom })
}
