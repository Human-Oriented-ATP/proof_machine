import { Node } from "@xyflow/react";
import { Gadget } from "../gadget/Gadget";
import { GadgetProps } from "../gadget/Gadget";

export type GadgetNode = Node<GadgetProps, 'gadgetNode'>

export function GadgetFlowNode({ data }: { data: GadgetProps }) {
    return <div>
        <Gadget {...data}></Gadget>
    </div >
}