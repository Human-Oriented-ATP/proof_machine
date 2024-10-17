import { useCallback, useEffect, useState } from "react"
import { XYPosition, Node, Connection, ReactFlowInstance } from "@xyflow/react"
import { getCenter } from "../util/Point"
import { GadgetProps, isOutputPosition } from "lib/game/Primitives"
import { makeHandleId } from "components/game/gadget/Node"
import { GadgetNode } from "components/game/diagram/GadgetFlowNode"

const MIN_DISTANCE = 60

function distance(a: XYPosition, b: XYPosition) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

type HandleInfo = { nodeId: string, handleId: string, isSource: boolean }
type HandleWithPosition = { handle: HandleInfo, position: XYPosition }

type ConnectionInfo = { source: HandleInfo, target: HandleInfo }
type ConnectionWithDistance = { connection: ConnectionInfo, distance: number }

const dummyConnection = { source: { nodeId: "", handleId: "", isSource: false }, target: { nodeId: "", handleId: "", isSource: false } }

export function useProximityConnect(rf: ReactFlowInstance,
    isValidConnection: (connection: Connection) => boolean,
    savelyAddEdge: (connection: Connection) => void) {

    const getHandles = useCallback((node: Node<GadgetProps>): HandleInfo[] => {
        const gadgetProps = node.data
        let handleInfos: HandleInfo[] = []
        for (const [position, term] of gadgetProps.terms) {
            const handleId = makeHandleId(position, gadgetProps.id)
            handleInfos.push({ nodeId: node.id, handleId, isSource: isOutputPosition(position) })
        }
        return handleInfos
    }, [])

    const getHandlePosition = useCallback((handleId: string): XYPosition => {
        const handle = document.querySelector(`[data-handleid="${handleId}"]`);
        if (handle) {
            const positionOnScreen = getCenter(handle.getBoundingClientRect());
            return rf.screenToFlowPosition(positionOnScreen);
        } else {
            throw Error("Trying to access handle which doesn't exist:" + handleId)
        }
    }, []);

    const getHandlesWithPositions = useCallback((node: GadgetNode): HandleWithPosition[] => {
        const handles = getHandles(node)
        const handlesWithPositions = handles.flatMap(handle => {
            const position = getHandlePosition(handle.handleId)
            if (position !== null) {
                return { handle, position }
            } else {
                return []
            }
        })
        return handlesWithPositions
    }, [])

    const getHandlesWithPositionExcludingNode = useCallback((ignoreNode: string): HandleWithPosition[] => {
        const allNodes = rf.getNodes()
        const nodesWithoutSelf = allNodes.filter(node => node.id !== ignoreNode)
        const allHandlesWithPositions = nodesWithoutSelf.map(getHandlesWithPositions).flat()
        return allHandlesWithPositions
    }, [])

    const [connectingSourceHandle, setConnectingSourceHandle] = useState("")
    const [connectingTargetHandle, setConnectingTargetHandle] = useState("")

    function makeConnectionInfo(handle1: HandleInfo, handle2: HandleInfo): ConnectionInfo | null {
        if (handle1.isSource) {
            if (!handle2.isSource) {
                return {
                    source: handle1,
                    target: handle2
                }
            }
        }
        if (handle2.isSource) {
            if (!handle1.isSource) {
                return {
                    source: handle2,
                    target: handle1
                }
            }
        }
        return null
    }

    function connectionFromConnectionInfo(connectionInfo: ConnectionInfo): Connection {
        return {
            source: connectionInfo.source.nodeId,
            target: connectionInfo.target.nodeId,
            sourceHandle: connectionInfo.source.handleId,
            targetHandle: connectionInfo.target.handleId
        }
    }

    const getCandidateProximityConnections = useCallback((handle: HandleInfo): ConnectionWithDistance[] => {
        const otherHandles = getHandlesWithPositionExcludingNode(handle.nodeId)

        const candidateConnections = otherHandles.flatMap(otherHandle => {
            const connection = makeConnectionInfo(handle, otherHandle.handle)
            if (connection) {
                return [connection]
            } else {
                return []
            }
        })

        const validConnections = candidateConnections.filter(connection => isValidConnection(connectionFromConnectionInfo(connection)))

        const connectionsWithDistances = validConnections.map(connection => {
            const sourcePosition = getHandlePosition(connection.source.handleId)
            const targetPosition = getHandlePosition(connection.target.handleId)
            const d = distance(sourcePosition, targetPosition)
            return { connection, distance: d }
        })

        return connectionsWithDistances
    }, [])

    const getProximityConnection = useCallback((node: GadgetNode) => {
        const handles = getHandles(node)
        const allCandidateConnections = handles.flatMap(handle => getCandidateProximityConnections(handle))
        const minimalDistanceConnection = allCandidateConnections.reduce(
            (acc: ConnectionWithDistance, connectionWithDistance) => {
                if (connectionWithDistance.distance < acc.distance) {
                    return connectionWithDistance
                } else {
                    return acc
                }
            }, { connection: dummyConnection, distance: Infinity });

        if (minimalDistanceConnection.distance < MIN_DISTANCE) {
            return minimalDistanceConnection.connection
        } else {
            return null
        }
    }, [])

    const onNodeDrag = useCallback((event: React.MouseEvent, node: GadgetNode) => {
        const proximityConnection = getProximityConnection(node)
        if (proximityConnection) {
            setConnectingSourceHandle(proximityConnection.source.handleId)
            setConnectingTargetHandle(proximityConnection.target.handleId)
        } else {
            setConnectingSourceHandle("")
            setConnectingTargetHandle("")
        }
    }, [])

    const highlightHandle = useCallback((handleId: string) => {
        const handle = document.querySelector(`[data-handleid="${handleId}"]`);
        if (handle) {
            (handle as HTMLElement).children[0].classList.remove("fill-white");
            (handle as HTMLElement).children[0].classList.add("fill-green")
        }
    }, [])

    useEffect(() => {
        document.querySelectorAll("[data-handleid]").forEach(handle => {
            (handle as HTMLElement).children[0].classList.remove("fill-green");
            (handle as HTMLElement).children[0].classList.add("fill-white")
        })
        highlightHandle(connectingSourceHandle)
        highlightHandle(connectingTargetHandle)
    }, [connectingSourceHandle, connectingTargetHandle])

    const onNodeDragStop = useCallback((event: React.MouseEvent, node: GadgetNode) => {
        const proximityConnection = getProximityConnection(node)
        if (proximityConnection) {
            savelyAddEdge(connectionFromConnectionInfo(proximityConnection))
        }
        setConnectingSourceHandle("")
        setConnectingTargetHandle("")
    }, [])

    return [onNodeDrag, onNodeDragStop]
}
