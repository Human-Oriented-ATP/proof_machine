import { Term, TermIndex, TermReference, VariableName } from "./TermIndex";

export type Equation = [TermReference, TermReference]

export class TermUnifier extends TermIndex {
    equations: Equation[]
    assignments: Map<VariableName, TermReference>

    constructor() {
        super();
        this.equations = []
        this.assignments = new Map()
    }

    addEquation(e : Equation) {
        this.equations.push(e)
        this.runUnification()
    }

    removeEquation(e : Equation) {
        this.equations.filter(eq => eq != e)
        this.runUnification()
    }

    getValue(termReference : TermReference) {
        const term = this.getTerm(termReference)
        if ('variable' in term) {
            return this.assignments.get(term.variable)
        }
    }

    runUnification() {

    }

}