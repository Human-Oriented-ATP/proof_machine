import { ReactFlowInstance } from '@xyflow/react';

export type InitialViewportSetting = "ORIGIN_AT_RIGHT" | "FIT_INITIAL_DIAGRAM"

export function initViewport(rf: ReactFlowInstance, setting: InitialViewportSetting) {
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
