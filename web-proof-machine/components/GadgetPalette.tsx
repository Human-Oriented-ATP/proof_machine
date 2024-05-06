import { Panel } from 'reactflow';
import { Gadget } from './Gadget'
import { axiomTermEnumeration } from '../lib/game/GameLogic';
import { Axiom, NodePosition, outputPosition } from "../lib/game/Primitives";
import { GadgetProps } from '../lib/game/Primitives';
import { AssignmentContext } from '../lib/game/AssignmentContext';
import { useIdGenerator } from '../lib/util/IdGeneratorHook';
import { Term } from 'lib/game/Term';

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
        let terms = new Map<NodePosition, Term>()
        axiom.hypotheses.forEach((hypothesis, i) => {
            terms.set(i, hypothesis)
        })
        terms.set(outputPosition, axiom.conclusion)
        return { terms, id: getAxiomId(), isAxiom: true }
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