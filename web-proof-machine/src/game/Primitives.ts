import { Term } from "./Term"

export interface HoleProps {
    term: Term
    setFocus: (t : Term) => void
}

export interface AbstractNodeProps {
    term: Term
}

export interface NodeDisplayProps extends AbstractNodeProps {
    isInput: boolean
    setFocus: (t : Term) => void
}

export type GadgetId = string

export interface GadgetProps {
    id: GadgetId
    inputs: Term[]
    output?: Term
}