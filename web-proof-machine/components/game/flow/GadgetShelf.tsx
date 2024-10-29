import { Gadget } from '../gadget/Gadget'
import { Axiom } from "../../../lib/game/Primitives";
import { GadgetProps } from "../gadget/Gadget";
import { Term } from 'lib/game/Term';
import { useGameStateContext } from 'lib/state/StateContextProvider';
import { CellPosition, OUTPUT_POSITION } from '../../../lib/game/CellPosition';
import { InsertGadgetButton } from './InsertGadgetButton';

function makeShelfGadgetProps(axiom: Axiom, id: number): GadgetProps {
    let terms = new Map<CellPosition, Term>()
    axiom.hypotheses.forEach((hypothesis, i) => {
        terms.set(i, hypothesis)
    })
    terms.set(OUTPUT_POSITION, axiom.conclusion)
    return { terms, id: `axiom_${id}`, isOnShelf: true }
}

export function GadgetShelf(): JSX.Element {
    const axioms = useGameStateContext((state) => state.setup.axioms)

    return <>
        {axioms.length !== 0 &&
            <div id="gadget_shelf" className="absolute top-0 bottom-0 min-w-40 w-auto flex flex-col p-1 overflow-y-scroll overflow-x-hidden bg-palette-gray/50">
                {axioms.map((axiom, id) => {
                    return <InsertGadgetButton key={JSON.stringify(axiom)} axiom={axiom}>
                        <Gadget {...makeShelfGadgetProps(axiom, id)} />
                    </InsertGadgetButton>
                })}
            </div>}
    </>
}