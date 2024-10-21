import { NodePosition } from "components/game/gadget/Node"
import { Term } from "./Term"

export interface HoleProps {
    term: Term
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
