import { HANDLE_BROKEN_CLASSES } from "lib/Constants"
import { twJoin } from "tailwind-merge"

export type DummyHandlePosition = "left" | "right" | "inline"

export interface DummyHandleProps {
    position: DummyHandlePosition
    isBrokenConnection?: boolean
}

export function DummyHandle({ position, isBrokenConnection }: DummyHandleProps) {
    if (position === "left") {
        return <div className="react-flow__handle react-flow__handle-left"></div>
    } else if (position === "right") {
        return <div className="react-flow__handle react-flow__handle-right"></div>
    } else {
        if (isBrokenConnection) {
            return <div className={twJoin("react-flow__handle handle-inline", HANDLE_BROKEN_CLASSES)}></div>
        } else {
            return <div className="react-flow__handle handle-inline"></div>
        }
    }
}