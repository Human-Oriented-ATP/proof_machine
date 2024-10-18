import { HoleProps } from '../../../lib/game/Primitives'
import { twMerge } from 'tailwind-merge'
import { useGameStateContext } from 'lib/state/StateContextProvider'
import { Term } from 'lib/game/Term'
import { getAssignedValue } from 'lib/game/TermEnumeration'

type BasicHoleProps = {
    value: string
    isFunctionHole: boolean
    isFocussed?: boolean
}

export function BasicHole(props: BasicHoleProps) {
    const isFocussed = props.isFocussed ?? false
    return (
        <div className={twMerge(
            "bg-white w-6 h-6 m-1 border-black border-2 rounded-full select-none relative z-50 text-base",
            props.isFunctionHole && "bg-pink",
            isFocussed && "scale-110 bg-yellow-highlight"
        )}
        //onMouseEnter={() => focus(props.termAsString ?? "")}
        //onMouseLeave={() => resetFocus()}
        >
            {props.value}
        </div>
    )
}

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

    return <BasicHole value={value} isFunctionHole={isFunctionHole(props.term)} isFocussed={false} />
}