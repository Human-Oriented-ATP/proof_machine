import { Term } from "./Term"

export interface HoleProps {
    term: Term
}

export interface AbstractNodeProps {
    term: Term
}

export interface NodeDisplayProps extends AbstractNodeProps {
    isInput: boolean
}

export type GadgetId = string

export interface GadgetProps {
    id: GadgetId
    inputs: Term[]
    output?: Term
}

export interface Axiom {
    hypotheses: Term[]
    conclusion: Term
}
