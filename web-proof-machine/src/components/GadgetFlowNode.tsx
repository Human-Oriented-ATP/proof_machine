import { NodeProps as FlowNodeProps } from "reactflow";
import { Gadget } from "../components/Gadget";
import { GadgetId } from "../game/Primitives";
import { Term } from "../game/Term";
import { HoleValueAssignment, makeGadgetFromTerms, makeGoalGadgetFromTerm } from "../game/GameLogic";

export interface GadgetFlowNodeProps {
    inputs: Term[]
    output?: Term
    id: GadgetId
    assignment: HoleValueAssignment
}

export function getFlowNodeTerms(props: GadgetFlowNodeProps): Term[] {
    if (props.output) {
        return props.inputs.concat(props.output)
    } else {
        return props.inputs
    }
}

export function GadgetFlowNode({ ...props }: FlowNodeProps<GadgetFlowNodeProps>) {
    const getGadgetProps = () => {
        if (props.data.output) {
            return makeGadgetFromTerms(props.data.inputs, props.data.output, props.data.id, props.data.assignment)
        } else {
            return makeGoalGadgetFromTerm(props.data.inputs[0])
        }
    }

    return (
        <div className="gadgetFlowNode">
            <Gadget {...getGadgetProps()}></Gadget>
        </div>
    );
}
