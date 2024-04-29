import { useContext } from 'react'
import { HoleProps } from '../lib/game/Primitives'
import { AssignmentContext } from '../lib/game/AssignmentContext'
import { twMerge } from 'tailwind-merge'

export function Hole(props: HoleProps) {
    const termString = JSON.stringify(props.term)

    const assignment = useContext(AssignmentContext)
    const value = assignment(props.term)

    const isFunctionHole = () => {
        if ("variable" in props.term) {
            return false
        } else {
            return props.term.args.length !== 0
        }
    }

    const isFocussed = props.focus.isFocussed(termString)

    return (
        <div className={twMerge(
            "bg-white w-6 h-6 m-1 border-black border-2 rounded-full select-none relative z-50",
            isFunctionHole() && "bg-pink",
            isFocussed && "shadow-[0px_0px_10px_black]"
        )}
            onMouseEnter={() => props.focus.focus(termString)}
            onMouseLeave={() => props.focus.resetFocus()}>
            {value}
        </div>
    )
}