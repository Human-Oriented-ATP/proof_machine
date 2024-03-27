import ReactFlow, { Panel } from 'reactflow';
import { Gadget } from './Gadget'
import { AbstractGadgetProps, GadgetDisplayProps } from '../game/Primitives';

export interface GadgetPaletteProps {
    axioms: AbstractGadgetProps[]
    createNewGadget: any
}

interface InsertGadgetButtonProps extends React.PropsWithChildren<{}> {
    gadget: AbstractGadgetProps
    createNewGadget: any
    axiomIdx : number
}

export function InsertGadgetButton({ gadget, createNewGadget, axiomIdx }: InsertGadgetButtonProps): JSX.Element {
    const onDragStart = (e:React.DragEvent<HTMLDivElement>, idx:number) => {
        e.dataTransfer.setData('application/reactflow', String(idx));
        e.dataTransfer.effectAllowed = 'move';
    }
    const gadgetProps: GadgetDisplayProps = {
        ...gadget,
        isAxiom: true,
        id: "axiom" + axiomIdx
    }
    return ( 
    <div 
        className="insertGadgetButton" 
        // onMouseDown={(e) => createNewGadget(e, gadget)}
        onDragStart={(e) => onDragStart(e, axiomIdx)} 
        draggable>
        {<Gadget {...gadgetProps} />}
    </div> )
}

export function GadgetPalette({ ...props }: GadgetPaletteProps) {
    return (
        <Panel position='top-center'>
            <div className="gadgetPalette">
                {props.axioms.map((axiom, idx) =>
                    <InsertGadgetButton 
                        gadget={axiom}
                        createNewGadget={props.createNewGadget}
                        axiomIdx={idx} />)}
            </div>
        </Panel>
    )
}