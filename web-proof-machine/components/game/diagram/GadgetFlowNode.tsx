import { Node, NodeProps } from "@xyflow/react";
import { Gadget } from "../gadget/Gadget";
import { GadgetProps } from "../../../lib/game/Primitives";

export type GadgetNode = Node<GadgetProps, 'gadgetNode'>

export function GadgetFlowNode({ data }: { data: GadgetProps }) {
    return (
        <div>
            <Gadget {...data}></Gadget>
        </div >
    );
}
