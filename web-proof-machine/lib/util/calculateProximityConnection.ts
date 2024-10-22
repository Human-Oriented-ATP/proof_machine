import { Connection, ReactFlowInstance, XYPosition } from "@xyflow/react";
import { getCenter } from "./Point";
import { getGadgetIdFromHandle, isTargetHandle } from "lib/game/Handles";

const MIN_DISTANCE = 60

function distance(a: XYPosition, b: XYPosition) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

export type HandlesWithPositions = Map<string, XYPosition>;

export function getPositionOfHandle(handleId: string, rf: ReactFlowInstance): XYPosition {
    const handle = document.querySelector(`[data-handleid="${handleId}"]`);
    if (handle) {
        const positionOnScreen = getCenter(handle.getBoundingClientRect());
        return rf.screenToFlowPosition(positionOnScreen);
    } else {
        throw Error("Trying to access handle which doesn't exist:" + handleId)
    }
}

function getSourceHandles<T>(handles: Map<string, T>): Map<string, T> {
    return new Map([...handles].filter(([handle, position]) => !isTargetHandle(handle)))
}

function getTargetHandles<T>(handles: Map<string, T>): Map<string, T> {
    return new Map([...handles].filter(([handle, position]) => isTargetHandle(handle)))
}

function findClosestHandle(position: XYPosition, otherHandles: HandlesWithPositions): { distance: number, id: string } {
    let closestHandle: { distance: number, id: string } = { distance: Infinity, id: "" }
    for (const [id, otherPosition] of otherHandles) {
        const dist = distance(position, otherPosition)
        if (dist < closestHandle.distance) {
            closestHandle = { distance: dist, id }
        }
    }
    return closestHandle
}

function findClosestTargetHandle(position: XYPosition, otherHandles: HandlesWithPositions): { distance: number, id: string } {
    const targetHandles = getTargetHandles(otherHandles)
    return findClosestHandle(position, targetHandles)
}

function findClosestSourceHandle(position: XYPosition, otherHandles: HandlesWithPositions): { distance: number, id: string } {
    const sourceHandles = getSourceHandles(otherHandles)
    return findClosestHandle(position, sourceHandles)
}

function findProximityConnectionForHandle(handle: string, position: XYPosition, otherHandles: HandlesWithPositions) {
    if (isTargetHandle(handle)) {
        const { distance, id } = findClosestSourceHandle(position, otherHandles)
        return { distance, targetHandle: handle, sourceHandle: id }
    } else {
        const { distance, id } = findClosestTargetHandle(position, otherHandles)
        return { distance, sourceHandle: handle, targetHandle: id }
    }
}

function calculateProximityConnectionHandles(handlesOfNodeBeingDragged: HandlesWithPositions, otherHandles: HandlesWithPositions)
    : { sourceHandle: string, targetHandle: string } | null {
    let shortestConnection: { distance: number, sourceHandle: string, targetHandle: string } = { distance: Infinity, sourceHandle: "", targetHandle: "" }
    for (const [handle, position] of handlesOfNodeBeingDragged) {
        const connection = findProximityConnectionForHandle(handle, position, otherHandles)
        if (connection.distance < shortestConnection.distance) {
            shortestConnection = { ...connection }
        }
    }
    if (shortestConnection.distance < MIN_DISTANCE) {
        return { sourceHandle: shortestConnection.sourceHandle, targetHandle: shortestConnection.targetHandle }
    } else {
        return null
    }
}

export type ConnectionWithHandles = {
    source: string,
    target: string,
    sourceHandle: string,
    targetHandle: string
}

export function calculateProximityConnection(handlesOfNodeBeingDragged: HandlesWithPositions, otherHandles: HandlesWithPositions)
    : ConnectionWithHandles | null {
    const proximityConnectionHandles = calculateProximityConnectionHandles(handlesOfNodeBeingDragged, otherHandles)
    if (proximityConnectionHandles) {
        const source = getGadgetIdFromHandle(proximityConnectionHandles.sourceHandle)
        const target = getGadgetIdFromHandle(proximityConnectionHandles.targetHandle)
        return { source, target, ...proximityConnectionHandles }
    } else {
        return null
    }
}

