import { Connector } from "components/game/gadget/Connector"

export type DummyHandlePosition = "target" | "source"

export interface DummyHandleProps {
    position: DummyHandlePosition
}

export function DummyHandle({ position }: DummyHandleProps) {
    if (position === "source") {
        return <div className="react-flow__handle react-flow__handle-right"><Connector type="source" isOpen={false} /></div>
    } else {
        return <div className="react-flow__handle react-flow__handle-left"><Connector type="target" isOpen={false} /></div>
    }
}