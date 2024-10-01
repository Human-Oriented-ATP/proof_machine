import { Panel, XYPosition } from '@xyflow/react';
import { Gadget } from '../gadget/Gadget'
import { axiomTermEnumeration } from '../../../lib/game/GameLogic';
import { Axiom, NodePosition, OUTPUT_POSITION } from "../../../lib/game/Primitives";
import { GadgetProps } from '../../../lib/game/Primitives';
import { AssignmentContext } from '../../../lib/game/AssignmentContext';
import { useIdGenerator } from '../../../lib/hooks/IdGenerator';
import { Term } from 'lib/game/Term';
import { useRef } from 'react';

export interface GadgetPaletteProps {
    axioms: Axiom[]
    makeGadget: (a: Axiom, axiomPosition: XYPosition) => void
    abortAddingGadget: () => void
}

interface InsertGadgetButtonProps extends React.PropsWithChildren<{}> {
    makeGadget: (axiomPosition: XYPosition) => void
    abortAddingGadget: () => void
}

export function InsertGadgetButton({ makeGadget, abortAddingGadget, children }: InsertGadgetButtonProps):
    JSX.Element {
    const ref = useRef<HTMLDivElement>(null)

    function getPosition() {
        const domRect = (ref.current as HTMLElement).getBoundingClientRect()
        return { x: domRect.left + domRect.width / 2, y: domRect.top + domRect.height / 2 }
    }

    function onMouseDown(e: React.MouseEvent) {
        makeGadget(getPosition())
        console.log("mouse down")
    }

    return <div ref={ref} className="flex justify-center px-1" onMouseDown={onMouseDown} onClick={abortAddingGadget}>
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
        terms.set(OUTPUT_POSITION, axiom.conclusion)
        return { terms, id: getAxiomId(), isAxiom: true, displayHoleFocus: true }
    }

    return (
        <Panel position='top-center'>
            <AssignmentContext.Provider value={axiomTermEnumeration}>
                <div id="gadget_palette" className="absolute min-w-40 h-[calc(100vh-64px)] flex flex-col left-0 top-0 p-1 overflow-y-scroll bg-palette-gray/50">
                    {props.axioms.map(axiom => {
                        return <InsertGadgetButton key={JSON.stringify(axiom)} makeGadget={(axiomPosition) => props.makeGadget(axiom, axiomPosition)} 
                                                    abortAddingGadget={props.abortAddingGadget}>
                            <Gadget {...makeAxiomGadget(axiom)}></Gadget>
                        </InsertGadgetButton>
                    })}
                </div>
            </AssignmentContext.Provider>
        </Panel >
    )
}