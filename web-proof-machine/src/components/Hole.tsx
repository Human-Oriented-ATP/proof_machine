import { useContext } from 'react'
import { HoleProps } from '../game/Primitives'
import { AssignmentContext } from '../game/AssignmentContext'

export function Hole({ term, setFocus }: HoleProps) {
    const assignment = useContext(AssignmentContext)
    const value = assignment(term)
    
    return (
        <div className="hole">
            {value}
        </div>
    )
}