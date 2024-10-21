import { CellPosition } from 'lib/game/CellPosition'
import { Term } from "./Term"

export interface HoleProps {
    term: Term
}

export type GadgetId = string

export type GadgetProps = {
    id: GadgetId
    terms: Map<CellPosition, Term>
    isAxiom: boolean
}

export interface Axiom {
    hypotheses: Term[]
    conclusion: Term
}
