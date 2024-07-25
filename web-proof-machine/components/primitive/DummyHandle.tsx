import { CustomHandle } from "components/game/CustomHandle"

export type DummyHandlePosition = "target" | "source"

export interface DummyHandleProps {
    position: DummyHandlePosition
}

export function DummyHandle({ position }: DummyHandleProps) {
    if (position === "source") {
        return <div className="react-flow__handle react-flow__handle-right"><CustomHandle type="source" isConnected={false} /></div>
    } else {
        return <div className="react-flow__handle react-flow__handle-left"><CustomHandle type="target" isConnected={false} /></div>
    }
}