import { Panel } from 'reactflow';
import { Gadget } from './Gadget'
import { AbstractGadgetProps, GadgetDisplayProps } from '../game/Primitives';
import { Axiom } from '../game/GameLogic';

export interface GadgetPaletteProps {
    axioms: Axiom[]
    makeAxiomGadget: (a: Axiom) => AbstractGadgetProps
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
                    let displayProps: GadgetDisplayProps =
                        { ...props.makeAxiomGadget(axiom), isInPalette: true }
                    return <InsertGadgetButton makeGadget={e => props.makeGadget(axiom, e)}>
                        <Gadget {...displayProps}></Gadget>
                    </InsertGadgetButton>
                })}
            </div>
        </Panel >
    )
}