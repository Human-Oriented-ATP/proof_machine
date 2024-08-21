"use client"

import { CursorArrowIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

interface AnimatedCursorProps {
    toX: number
    toY: number
    duration: number
}

export function AnimatedCursor(props: AnimatedCursorProps) {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        if (offset < 1) {
            const interval = setInterval(() => {
                setOffset(offset + 0.01)
            }, 10)

            return () => clearInterval(interval);
        } else {
            const interval = setInterval(() => {
                setOffset(0)
            }, 500)
            return () => clearInterval(interval);
        }

    }, [offset])

    const x = offset * props.toX
    const y = offset * props.toY

    const width = Math.abs(props.toX)
    const height = Math.abs(props.toY)

    const style = { 'top': `${y + 3}px`, 'left': `${x}px` }

    return <div style={{ "width": `${width}px`, "height": `${height}px` }}>
        <svg className="absolute w-full h-full">
            <line x1="0" y1="0" x2={x} y2={y} stroke="black" strokeWidth="2" strokeDasharray="5 5" />
        </svg>
        <div className="absolute" style={style}>
            <CursorArrowIcon className="absolute" />
        </div>
    </div>
}