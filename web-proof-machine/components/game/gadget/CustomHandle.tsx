import { Handle, Position } from "@xyflow/react"
import { StaticHandle } from "./StaticHandle"
import { Connector } from "./Connector"

export type CustomHandleProps = {
    type: "source" | "target"
    handleId?: string
}

export function CustomHandle(props: CustomHandleProps) {
    if (props.handleId === undefined) {
        return <StaticHandle {...props} />
    }
    else {
        const position = props.type === "source" ? Position.Right : Position.Left
        return <Handle type={props.type} position={position} id={props.handleId}>
            <Connector type={props.type} />
        </Handle>
    }
}