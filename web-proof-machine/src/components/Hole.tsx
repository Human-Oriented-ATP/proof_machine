import { HoleProps } from '../game/Primitives'

export function Hole ({ value, isFunctionValue } : HoleProps) {
    return (
        <div className="hole" style={isFunctionValue ? {backgroundColor: "pink"} : {}}>{value}</div>
    )
}