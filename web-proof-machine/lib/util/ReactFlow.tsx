import { Edge, ReactFlowInstance } from '@xyflow/react';
import { GadgetProps } from '../game/Primitives';
import { GadgetNode } from 'components/game/diagram/GadgetFlowNode';

export function hasTargetHandle(e: Edge, handleId: string): boolean {
    if (e.targetHandle) {
        return e.targetHandle === handleId;
    } else {
        return false;
    }
}
export function getGoalNode(props: GadgetProps): GadgetNode {
    return {
        id: props.id,
        type: 'gadgetNode',
        deletable: false,
        position: { x: 0, y: 0 },
        data: props
    };
}

export type InitialViewportSetting = "ORIGIN_AT_RIGHT" | "FIT_INITIAL_DIAGRAM"

export function init(rf: ReactFlowInstance, setting: InitialViewportSetting) {
    if (setting === "ORIGIN_AT_RIGHT") {
        const rect = document.getElementById("root")?.getBoundingClientRect()!
        const positionX = rect.width * 4 / 5
        const positionY = rect.height / 2
        const rfPosition = rf.screenToFlowPosition({ x: positionX, y: positionY })
        const currentZoom = rf.getZoom()
        rf.setViewport({ x: rfPosition.x, y: rfPosition.y, zoom: currentZoom })
    } else {
        rf.fitView()
    }
}
