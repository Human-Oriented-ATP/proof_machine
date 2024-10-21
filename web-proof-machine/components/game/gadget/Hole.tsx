import { HoleProps } from '../../../lib/game/Primitives'
import { useGameStateContext } from 'lib/state/StateContextProvider'
import { Term } from 'lib/game/Term'
import { getAssignedValue } from 'lib/game/TermEnumeration'
import { StaticHole } from './StaticHole'

function isFunctionHole(term: Term) {
    if ("variable" in term) {
        return false
    } else {
        return term.args.length !== 0
    }
}

export function Hole(props: HoleProps) {
    const termEnumeration = useGameStateContext((state) => state.termEnumeration)

    const value = getAssignedValue(props.term, termEnumeration)

    return <StaticHole value={value} isFunctionHole={isFunctionHole(props.term)} isFocussed={false} />
}