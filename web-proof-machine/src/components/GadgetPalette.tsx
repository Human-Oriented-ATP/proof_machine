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
}

export function InsertGadgetButton({ gadget, createNewGadget, children }: InsertGadgetButtonProps): 
    JSX.Element {
    return <div className="insertGadgetButton" onMouseDown={(e) => createNewGadget(e, gadget)}>
        {children}
    </div>
}

export function GadgetPalette({ ...props }: GadgetPaletteProps) {
    let id = 0;

    function makeAxiomGadget(axiom: AbstractGadgetProps): JSX.Element {
        const gadgetProps: GadgetDisplayProps = {
            ...axiom,
            isAxiom: true,
            id: "axiom" + id
        }
        id++
        return <Gadget {...gadgetProps}></Gadget>
    }

    return (
        <Panel position='top-center'>
            <div className="gadgetPalette">
                {props.axioms.map(axiom =>
                    <InsertGadgetButton gadget={axiom} createNewGadget={props.createNewGadget}>
                        {makeAxiomGadget(axiom)}
                    </InsertGadgetButton>)}
            </div>
        </Panel>
    )
}