"use client"

import { useEffect, useState } from "react";
import { AnimatedHand } from "./AnimatedHand";
import { XYPosition } from "@xyflow/react";

type ObjectPosition = "BOTTOM_RIGHT" | "CENTER_RIGHT" | "CENTER_LEFT"

export interface OverlayPosition {
    object: string
    objectPosition: ObjectPosition
    offset: XYPosition
}

export interface DragIndicatorProps {
    origin: OverlayPosition
    moveTo: { position: OverlayPosition } | { extent: XYPosition }
    duration: number
    drawLine: boolean
}

function getXYPosition(rect: DOMRect, position: ObjectPosition): XYPosition {
    switch (position) {
        case "BOTTOM_RIGHT": return { x: rect.right, y: rect.bottom }
        case "CENTER_RIGHT": return { x: rect.right, y: rect.top + rect.height / 2 }
        case "CENTER_LEFT": return { x: rect.left, y: rect.top + rect.height / 2 }
        default: throw Error(`Invalid position ${position}`)
    }
}

export function DragIndicator(props) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [extent, setExtent] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setInterval(() => {
            const fromGadgetPosition = document.getElementById(props.origin.object)!.getBoundingClientRect()
            const originPosition = getXYPosition(fromGadgetPosition, props.origin.objectPosition)
            setPosition(originPosition)

            if ("position" in props.moveTo) {
                const moveToPositionRect = document.getElementById(props.moveTo.position.object)!.getBoundingClientRect()
                const moveToPosition = getXYPosition(moveToPositionRect, props.moveTo.position.objectPosition)
                setExtent({
                    x: moveToPosition.x - originPosition.x + props.moveTo.position.offset.x,
                    y: moveToPosition.y - originPosition.y + props.moveTo.position.offset.y
                })
            } else {
                setExtent(props.moveTo.extent)
            }
        }, 200)
    }, [])

    const style = { left: position.x + props.origin.offset.x, top: position.y + props.origin.offset.y }

    return <div style={style} className="absolute">
        <AnimatedHand toX={extent.x} toY={extent.y} drawLine={props.drawLine} />
    </div>
}