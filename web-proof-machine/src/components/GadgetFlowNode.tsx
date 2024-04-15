import { NodeProps as FlowNodeProps } from "reactflow";
import { Gadget } from "../components/Gadget";
import { GadgetProps } from "../game/Primitives";

export function GadgetFlowNode({ ...props }: FlowNodeProps<GadgetProps>) {
    return (
        <div className="gadgetFlowNode">
            <Gadget {...props.data}></Gadget>
        </div>
    );
}
