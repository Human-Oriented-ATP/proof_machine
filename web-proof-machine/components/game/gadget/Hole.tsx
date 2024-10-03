import { useContext } from 'react'
import { Focus, HoleProps } from '../../../lib/game/Primitives'
import { AssignmentContext } from '../../../lib/game/AssignmentContext'
import { twMerge } from 'tailwind-merge'

type BasicHoleProps = {
    value: string
    isFunctionHole: boolean
    termAsString?: string
    focus?: Focus<string>
}

export function BasicHole(props: BasicHoleProps) {
    const isFocussed = props.focus?.isFocussed(props.termAsString ?? "") ?? false
    const focus = props.focus?.focus ?? function (termString: string) { void 0 }
    const resetFocus = props.focus?.resetFocus ?? function () { void 0 }

    return (
        <div className={twMerge(
            "bg-white w-6 h-6 m-1 border-black border-2 rounded-full select-none relative z-50 text-base",
            props.isFunctionHole && "bg-pink",
            isFocussed && "scale-110 bg-yellow-highlight"
        )}
            onMouseEnter={() => focus(props.termAsString ?? "")}
            onMouseLeave={() => resetFocus()}>
            {props.value}
        </div>
    )
}

export function Hole(props: HoleProps) {
    const termAsString = JSON.stringify(props.term)

    const assignment = useContext(AssignmentContext)
    const value = assignment(props.term)

    const isFunctionHole = () => {
        if ("variable" in props.term) {
            return false
        } else {
            return props.term.args.length !== 0
        }
    }

    return <BasicHole value={value} isFunctionHole={isFunctionHole()} termAsString={termAsString} focus={props.focus} />
}