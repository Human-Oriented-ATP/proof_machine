import { useContext } from 'react'
import { HoleProps } from '../game/Primitives'
import { AssignmentContext } from '../game/AssignmentContext'

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

    const functionClassName = isFunctionHole() ? "hole-function" : ""
    const focusClassName = props.focus.isFocussed(termString) ? "hole-focussed" : ""
    const className = `hole ${functionClassName} ${focusClassName}`

    return (
        <div className={className}
            onMouseEnter={() => props.focus.focus(termString)}
            onMouseLeave={() => props.focus.resetFocus()}>
            {value}
        </div>
    )
}