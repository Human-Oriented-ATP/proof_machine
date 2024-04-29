export type DummyHandlePosition = "left" | "right" | "inline"

export interface DummyHandleProps {
    position: DummyHandlePosition
}

export function DummyHandle({ position }: DummyHandleProps) {
    if (position === "left") {
        return <div className="react-flow__handle react-flow__handle-left"></div>
    } else if (position === "right") {
        return <div className="react-flow__handle react-flow__handle-right"></div>
    } else {
        return <div className="react-flow__handle handle-inline"></div>
    }
}