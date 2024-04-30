import { Term } from "./Term"

export interface Focus<T> {
    isFocussed: (t: T) => boolean
    focus: (t: T) => void
    resetFocus: () => void
}

export interface HoleProps {
    term: Term
    focus: Focus<string>
}

export interface AbstractNodeProps {
    term: Term
}

export interface NodeDisplayProps extends AbstractNodeProps {
    isInput: boolean
    useDummyHandle: boolean
    holeFocus: Focus<string>
}

export type GadgetId = string

export interface GadgetProps {
    id: GadgetId
    inputs: Term[]
    output?: Term
    isAxiom: boolean
}

export interface Axiom {
    hypotheses: Term[]
    conclusion: Term
}
