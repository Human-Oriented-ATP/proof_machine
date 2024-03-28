import { NodeProps as FlowNodeProps } from 'reactflow';
import { Gadget } from '../components/Gadget'
import { GadgetDisplayProps } from '../game/Primitives';

export function GadgetFlowNode({ ...props }: FlowNodeProps<GadgetDisplayProps>) {
    const gadgetProps : GadgetDisplayProps = props.data
    
    return (
        <div className="gadgetFlowNode">
            <Gadget {...gadgetProps}></Gadget>
        </div>
    );
}
