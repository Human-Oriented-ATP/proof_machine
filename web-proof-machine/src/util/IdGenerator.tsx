import { GadgetId, NodePosition } from "../game/Primitives"

export function gadgetIdFromFlowNodeId(flowNodeId: string): string {
    return flowNodeId + "_gadget"
}

export function nodeIdFromGadgetIdAndPosition(gadgetId: string, nodePosition: NodePosition) {
    if (nodePosition == "output") {
        return gadgetId + "_node_out"
    } else {
        return gadgetId + "_node_in_" + nodePosition
    }
}

export function handleIdFromNodeId(nodeId: string): string {
    return nodeId + "_handle"
}

export function nodeIdFromHandleId(handleId: string): string {
    if (handleId.slice(-7) == "_handle") {
        return handleId.slice(0, -7);
    } else {
        throw Error("Not a handle id: " + handleId)
    }
}

export function nodePositionFromNodeId(nodeId: string): NodePosition {
    if (nodeId.slice(-9) == "_node_out") {
        return "output"
    } else {
        try {
            let result = nodeId.split("_node_in_")
            if (result.length == 2 && result[1] != "") {
                return Number(result[1])
            } else {
                throw Error("Not a node id: " + nodeId)
            }
        } catch (e) {
            throw Error("Not a node id: " + nodeId)
        }
    }
}

export function gadgetIdFromNodeId(nodeId: string): GadgetId {
    let result = nodeId.split("_node_")
    if (result.length == 2) {
        return result[0]
    } else {
        throw Error("Not a node id: " + nodeId)
    }
}