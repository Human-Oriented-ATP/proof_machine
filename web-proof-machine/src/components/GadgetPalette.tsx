import { Panel } from 'reactflow';
import { Gadget } from './Gadget'
import { axiomTermEnumeration } from '../game/GameLogic';
import { Axiom } from "../game/Primitives";
import { GadgetProps } from '../game/Primitives';
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
    const [getAxiomId, resetIdGenerator] = useIdGenerator("axiom_")
    resetIdGenerator()

    function makeAxiomGadget(axiom: Axiom): GadgetProps {
        return { inputs: axiom.hypotheses, output: axiom.conclusion, id: getAxiomId(), useDummyHandle: true }
    }

    return (
        <Panel position='top-center'>
            <AssignmentContext.Provider value={axiomTermEnumeration}>
                <div className="gadgetPalette">
                    {props.axioms.map(axiom => {
                        // const id = getAxiomId()
                        return <InsertGadgetButton makeGadget={e => props.makeGadget(axiom, e)}>
                            <Gadget {...makeAxiomGadget(axiom)}></Gadget>
                        </InsertGadgetButton>
                    })}
                </div>
            </AssignmentContext.Provider>
        </Panel >
    )
}