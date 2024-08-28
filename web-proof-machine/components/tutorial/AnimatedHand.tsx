"use client"

import Image from 'next/image'
import { useEffect, useState } from "react"

interface AnimatedCursorProps {
    toX: number
    toY: number
    drawLine: boolean
}

const WAIT_BEFORE_ANIMATION = 500
const WAIT_AFTER_ANIMATION = 500
const STEP_RATE = 10
const IMAGE_SIZE = 35
const MARGIN = 50 // Makes sure svg & hand are not cut off

const OFFSET_ALIGNING_HAND_AND_LINE_X = -12
const OFFSET_ALIGNING_HAND_AND_LINE_Y = 0

function ease(x: number) {
    return x * x * (3 - 2 * x)
}

export function AnimatedHand(props: AnimatedCursorProps) {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        if (offset < 1) {
            const timeOffset = offset === 0 ? WAIT_BEFORE_ANIMATION : STEP_RATE

            const interval = setInterval(() => {
                setOffset(offset + 0.01)
            }, timeOffset)

            return () => clearInterval(interval);
        } else {
            const interval = setInterval(() => {
                setOffset(0)
            }, WAIT_AFTER_ANIMATION)
            return () => clearInterval(interval);
        }

    }, [offset])

    const x = ease(offset) * props.toX
    const y = ease(offset) * props.toY

    const height = Math.abs(props.toY) + MARGIN
    const width = Math.abs(props.toX) + MARGIN

    const style = { 'left': `${width + x + OFFSET_ALIGNING_HAND_AND_LINE_X}px`, 'top': `${height + y + OFFSET_ALIGNING_HAND_AND_LINE_Y}px` }

    return <div className="translate-x-1/2" style={{ "width": `${width * 2}px`, "height": `${height * 2}px`, 'transform': 'translate(-50%,-50%)' }}>
        {true ?
            <svg className="absolute w-full h-full">
                <line x1={width} y1={height} x2={width + x} y2={height + y} stroke="black" strokeWidth="2" strokeDasharray="5 5" strokeDashoffset={0} />
            </svg>
            : <></>}
        <div className="absolute" style={style}>
            <Image src="/pointing-hand.svg" width={IMAGE_SIZE} height={IMAGE_SIZE} alt="" className="stroke-black fill-green" />
        </div>
    </div>
}