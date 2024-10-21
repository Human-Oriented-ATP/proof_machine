import { Gadget } from '../gadget/Gadget'
import { Axiom } from "../../../lib/game/Primitives";
import { GadgetProps } from "../gadget/Gadget";
import { Term } from 'lib/game/Term';
import { useGameStateContext } from 'lib/state/StateContextProvider';
import { CellPosition, OUTPUT_POSITION } from '../../../lib/game/CellPosition';
import { InsertGadgetButton } from './InsertGadgetButton';

function makeAxiomGadgetProps(axiom: Axiom, key: number): GadgetProps {
    let terms = new Map<CellPosition, Term>()
    axiom.hypotheses.forEach((hypothesis, i) => {
        terms.set(i, hypothesis)
    })
    terms.set(OUTPUT_POSITION, axiom.conclusion)
    return { terms, id: `axiom_${key}`, isOnShelf: true }
}

export function GadgetShelf() {
    const axioms = useGameStateContext((state) => state.setup.axioms)

    if (axioms.length === 0) {
        return <></>
    } else {
        return <div id="gadget_shelf" className="absolute top-0 bottom-0 min-w-40 w-auto flex flex-col p-1 overflow-y-scroll overflow-x-hidden bg-palette-gray/50">
            {axioms.map((axiom, key) => {
                return <InsertGadgetButton key={JSON.stringify(axiom)} axiom={axiom}>
                    <Gadget {...makeAxiomGadgetProps(axiom, key)}></Gadget>
                </InsertGadgetButton>
            })}
        </div>
    }
}