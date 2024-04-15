import { Panel } from 'reactflow';
import { Gadget } from './Gadget'
import { Axiom, axiomAssignment } from '../game/GameLogic';
import { GadgetId, GadgetProps } from '../game/Primitives';
import { AssignmentContext } from '../game/AssignmentContext';
import { useIdGenerator } from '../util/IdGeneratorHook';

export interface GadgetPaletteProps {
    axioms: Axiom[]
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
    const getAxiomId = useIdGenerator("axiom_")

    function makeAxiomGadget(axiom : Axiom, id : GadgetId): GadgetProps {
        return { inputs: axiom.hypotheses, output: axiom.conclusion, id}
    }

    return (
        <Panel position='top-center'>
            <AssignmentContext.Provider value={axiomAssignment}>
            <div className="gadgetPalette">
                {props.axioms.map(axiom => {
                    // const id = getAxiomId()
                    return <InsertGadgetButton makeGadget={e => props.makeGadget(axiom, e)}>
                        <Gadget {...makeAxiomGadget(axiom, "123")}></Gadget>
                    </InsertGadgetButton>
                })}
            </div>
            </AssignmentContext.Provider>
        </Panel >
    )
}