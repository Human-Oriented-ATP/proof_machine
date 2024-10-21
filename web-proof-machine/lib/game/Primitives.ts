import { Term } from "./Term"

export interface HoleProps {
    term: Term
}

export type NodePosition = number

export function isOutputPosition(position: NodePosition): boolean {
    return position === -1
}

export function isInputPosition(position: NodePosition): boolean {
    return !isOutputPosition(position)
}

export const OUTPUT_POSITION: NodePosition = -1


export type GadgetId = string

export type GadgetProps = {
    id: GadgetId
    terms: Map<NodePosition, Term>
    isAxiom: boolean
}

export interface Axiom {
    hypotheses: Term[]
    conclusion: Term
}
