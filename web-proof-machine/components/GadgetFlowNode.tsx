import { NodeProps as FlowNodeProps } from "reactflow";
import { Gadget } from "./Gadget";
import { GadgetProps } from "../lib/game/Primitives";

export function GadgetFlowNode({ ...props }: FlowNodeProps<GadgetProps>) {
    return (
        <div>
            <Gadget {...props.data}></Gadget>
        </div>
    );
}
