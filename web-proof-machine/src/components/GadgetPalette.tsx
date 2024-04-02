import { Panel } from 'reactflow';
import { Gadget } from './Gadget'
import { Axiom } from '../game/GameLogic';
import { GadgetProps } from '../game/Primitives';

export interface GadgetPaletteProps {
    axioms: Axiom[]
    makeAxiomGadget: (a: Axiom) => GadgetProps
    makeGadget: (a: Axiom, e: React.MouseEvent) => void
}

interface InsertGadgetButtonProps extends React.PropsWithChildren<{}> {
    makeGadget: (e: React.MouseEvent) => void
}

export function InsertGadgetButton({ makeGadget, children }: InsertGadgetButtonProps):
    JSX.Element {
    return <div className="insertGadgetButton" onClick={makeGadget}>
        {children}
    </div>
}

export function GadgetPalette({ ...props }: GadgetPaletteProps) {
    return (
        <Panel position='top-center'>
            <div className="gadgetPalette">
                {props.axioms.map(axiom => {
                    let displayProps: GadgetProps =
                        { ...props.makeAxiomGadget(axiom) }
                    return <InsertGadgetButton makeGadget={e => props.makeGadget(axiom, e)}>
                        <Gadget {...displayProps}></Gadget>
                    </InsertGadgetButton>
                })}
            </div>
        </Panel >
    )
}