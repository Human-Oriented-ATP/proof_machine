import { NodeProps as FlowNodeProps } from "reactflow";
import { Gadget } from "../components/Gadget";
import { GadgetId } from "../game/Primitives";
import { Assignment, Term } from "../game/Term";
import { makeGadgetFromTerms } from "../game/GameLogic";

export interface GadgetFlowNodeProps {
    inputs: Term[]
    output: Term
    id: GadgetId
    assignment: Assignment
}

export function getFlowNodeTerms(props: GadgetFlowNodeProps): Term[] {
    return props.inputs.concat(props.output)
}

export function GadgetFlowNode({
    ...props
}: FlowNodeProps<GadgetFlowNodeProps>) {
    const gadgetProps = makeGadgetFromTerms(props.data.inputs, props.data.output,
        props.data.id, props.data.assignment)

    return (
        <div className="gadgetFlowNode">
            <Gadget {...gadgetProps}></Gadget>
        </div>
    );
}
