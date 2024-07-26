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

export type NodePosition = number

export function isOutputPosition(position: NodePosition): boolean {
    return position === -1
}

export function isInputPosition(position: NodePosition): boolean {
    return !isOutputPosition(position)
}

export const outputPosition: NodePosition = -1

export interface NodeDisplayProps extends AbstractNodeProps {
    position: NodePosition
    gadgetId: GadgetId
    useDummyHandle: boolean
    holeFocus: Focus<string>
}

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
