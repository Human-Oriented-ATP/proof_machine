import { useContext } from 'react'
import { HoleProps } from '../game/Primitives'
import { AssignmentContext } from '../game/AssignmentContext'

export function Hole(props: HoleProps) {
    const assignment = useContext(AssignmentContext)
    const value = assignment(props.term)

    const isFunctionHole = () => {
        if ("variable" in props.term) {
            return false
        } else {
            return props.term.args.length !== 0
        }
    }

    const className = `hole ${isFunctionHole() ? "hole-function" : ""}`

    return (
        <div className={className}>
            {value}
        </div>
    )
}