import { Connector } from "components/game/gadget/Connector"

export function StaticHandle({ type }: { type: "source" | "target" }) {
    if (type === "source") {
        return <div className="react-flow__handle react-flow__handle-right"><Connector type="source" /></div>
    } else {
        return <div className="react-flow__handle react-flow__handle-left"><Connector type="target" /></div>
    }
}