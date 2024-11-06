import { useGameStateContext } from 'lib/state/StateContextProvider'
import { Term } from 'lib/game/Term'
import { getAssignedValue } from 'lib/game/TermEnumeration'
import { StaticHole } from './StaticHole'
import { GameSlice } from 'lib/state/Store'

function isFunctionHole(term: Term) {
    if ("variable" in term) {
        return false
    } else {
        return term.args.length !== 0
    }
}

interface HoleProps {
    term: Term
}

const selector = (state: GameSlice) => ({
    termEnumeration: state.termEnumeration,
    focussedHole: state.focussedHole,
    focus: state.focus,
    removeFocus: state.removeFocus
})

export function Hole(props: HoleProps) {
    const { termEnumeration, focussedHole, focus, removeFocus } = useGameStateContext(selector)

    const value = getAssignedValue(props.term, termEnumeration)

    const makeFocusProps = (term: Term) => {
        if ("variable" in term) {
            return {
                isFocussed: focussedHole === term.variable,
                onMouseEnter: () => focus(term.variable),
            }
        } else {
            return undefined
        }
    }

    return <StaticHole value={value} isFunctionHole={isFunctionHole(props.term)} {...makeFocusProps(props.term)} onMouseLeave={removeFocus} />
}