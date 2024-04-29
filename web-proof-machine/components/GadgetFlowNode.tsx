import { NodeProps as FlowNodeProps } from "reactflow";
import { Gadget } from "./Gadget";
import { GadgetProps } from "../lib/game/Primitives";

export function GadgetFlowNode({ ...props }: FlowNodeProps<GadgetProps>) {
    return (
        <div className="gadgetFlowNode">
            <Gadget {...props.data}></Gadget>
        </div>
    );
}
