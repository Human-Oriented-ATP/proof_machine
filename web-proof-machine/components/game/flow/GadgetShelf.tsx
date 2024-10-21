import { Panel } from '@xyflow/react';
import { Gadget } from '../gadget/Gadget'
import { Axiom } from "../../../lib/game/Primitives";
import { GadgetProps } from "../gadget/Gadget";
import { Term } from 'lib/game/Term';
import { useRef } from 'react';
import { useGameStateContext } from 'lib/state/StateContextProvider';
import { CellPosition, OUTPUT_POSITION } from '../../../lib/game/CellPosition';

export interface GadgetShelfProps {
    abortAddingGadget: () => void
}

interface InsertGadgetButtonProps extends React.PropsWithChildren<{}> {
    axiom: Axiom
    abortAddingGadget: () => void
}

export function InsertGadgetButton({ axiom, abortAddingGadget, children }: InsertGadgetButtonProps):
    JSX.Element {
    const addGadgetNode = useGameStateContext((state) => state.addGadgetNode)
    const ref = useRef<HTMLDivElement>(null)

    function getPosition() {
        const domRect = (ref.current as HTMLElement).getBoundingClientRect()
        return { x: domRect.left + domRect.width / 2, y: domRect.top + domRect.height / 2 }
    }

    function onMouseDown(e: React.MouseEvent) {
        addGadgetNode(axiom, getPosition())
    }

    return <div ref={ref} className="flex justify-center px-1" onMouseDown={onMouseDown} onClick={abortAddingGadget}>
        {children}
    </div>
}

export function GadgetShelf({ ...props }: GadgetShelfProps) {
    const axioms = useGameStateContext((state) => state.setup.axioms)

    function makeAxiomGadget(axiom: Axiom, key: number): GadgetProps {
        let terms = new Map<CellPosition, Term>()
        axiom.hypotheses.forEach((hypothesis, i) => {
            terms.set(i, hypothesis)
        })
        terms.set(OUTPUT_POSITION, axiom.conclusion)
        return { terms, id: `axiom_${key}`, isOnShelf: true }
    }


    if (axioms.length === 0) {
        return <></>
    } else {
        return <div id="gadget_shelf" className="absolute top-0 bottom-0 min-w-40 w-auto flex flex-col p-1 overflow-y-scroll overflow-x-hidden bg-palette-gray/50">
            {axioms.map((axiom, key) => {
                return <InsertGadgetButton key={JSON.stringify(axiom)} axiom={axiom}
                    abortAddingGadget={props.abortAddingGadget}>
                    <Gadget {...makeAxiomGadget(axiom, key)}></Gadget>
                </InsertGadgetButton>
            })}
        </div>
    }
}