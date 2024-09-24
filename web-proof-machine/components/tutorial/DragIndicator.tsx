"use client"

import { useEffect, useState } from "react";
import { AnimatedHand } from "./AnimatedHand";
import { XYPosition } from "@xyflow/react";

type AnchorPoint = "BOTTOM_RIGHT" | "CENTER_RIGHT" | "CENTER_LEFT"

export interface OverlayPosition {
    elementId: string
    anchorPoint: AnchorPoint
    offset: XYPosition
}

export interface DragIndicatorProps {
    origin: OverlayPosition
    destination: { absolutePosition: OverlayPosition } | { relativePosition: XYPosition }
    drawLine: boolean
}

function getXYPosition(rect: DOMRect, position: AnchorPoint): XYPosition {
    switch (position) {
        case "BOTTOM_RIGHT": return { x: rect.right, y: rect.bottom }
        case "CENTER_RIGHT": return { x: rect.right, y: rect.top + rect.height / 2 }
        case "CENTER_LEFT": return { x: rect.left, y: rect.top + rect.height / 2 }
        default: throw Error(`Invalid position ${position}`)
    }
}

const WAIT_BEFORE_ANIMATION = 500

function calculateExtent(destination: { absolutePosition: OverlayPosition } | { relativePosition: XYPosition }, originPosition: XYPosition): XYPosition {
    if ("relativePosition" in destination) {
        return destination.relativePosition
    } else {
        const destinationRect = document.getElementById(destination.absolutePosition.elementId)!.getBoundingClientRect()
        const destinationPosition = getXYPosition(destinationRect, destination.absolutePosition.anchorPoint)
        return {
            x: destinationPosition.x - originPosition.x + destination.absolutePosition.offset.x,
            y: destinationPosition.y - originPosition.y + destination.absolutePosition.offset.y
        }
    }
}

function DragIndicator(props: DragIndicatorProps) {
    try {

        const originRect = document.getElementById(props.origin.elementId)!.getBoundingClientRect()
        const originPosition = getXYPosition(originRect, props.origin.anchorPoint)

        const extent = calculateExtent(props.destination, originPosition)

        const style = { left: originPosition.x + props.origin.offset.x, top: originPosition.y + props.origin.offset.y }

        return <div style={style} className="absolute">
            <AnimatedHand toX={extent.x} toY={extent.y} drawLine={props.drawLine} />
        </div>
    } catch (error) {
        console.error(error)
        return <></>
    }
}

export function DelayedDragIndicator(props: DragIndicatorProps) {
    const [animationHasStarted, setAnimationHasStarted] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationHasStarted(true)
        }, WAIT_BEFORE_ANIMATION)

        return () => clearInterval(interval)
    }, [])

    if (animationHasStarted)
        return <DragIndicator {...props} />
    else
        return <></>
}