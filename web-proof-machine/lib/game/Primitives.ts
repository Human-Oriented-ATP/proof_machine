import { Term } from "./Term"

export type GadgetId = string

export interface Axiom {
    hypotheses: Term[]
    conclusion: Term
}
