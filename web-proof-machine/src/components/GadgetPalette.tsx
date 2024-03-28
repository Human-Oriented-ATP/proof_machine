import ReactFlow, { Panel } from 'reactflow';
import { Gadget } from './Gadget'
import { AbstractGadgetProps, GadgetDisplayProps } from '../game/Primitives';
import { axiom } from '../util/AxiomsForTesting';

export interface GadgetPaletteProps {
    axioms: AbstractGadgetProps[]
    createNewGadget: any
}

interface InsertGadgetButtonProps extends React.PropsWithChildren<{}> {
    gadget: AbstractGadgetProps
    axiomIdx : number
}

function onGadgetDragStart(event: React.DragEvent<HTMLDivElement>, axiomIdx: number) {
    event.dataTransfer.setData('application/reactflow', String(axiomIdx));
    event.dataTransfer.effectAllowed = 'move';
};

export function InsertGadgetButton({ gadget, axiomIdx }: InsertGadgetButtonProps): 
    JSX.Element {
    const gadgetProps : GadgetDisplayProps = {
        ...gadget,
        isAxiom: true,
        id: "axiom" + axiomIdx
    }
    return <div className="insertGadgetButton" onDragStart={(e) => onGadgetDragStart(e, axiomIdx)} draggable>
        <Gadget {...gadgetProps}></Gadget>
    </div>
}

export function GadgetPalette({ ...props }: GadgetPaletteProps) {

    return (
        <aside className='aside'>
            <div className="gadgetPalette">
                {props.axioms.map((axiom, idx) => <InsertGadgetButton gadget={axiom} axiomIdx={idx} />)}
            </div>
        </aside>
    )
}