import { DisjointSetWithAssignment } from "../util/DisjointSetWithAssignment";
import { TermIndex, TermReference, VariableName } from "./TermIndex";

export type Equation = [TermReference, TermReference]

export class TermUnifier extends TermIndex {
    equations: Equation[]
    variables: DisjointSetWithAssignment<VariableName, TermReference>
    equationIsSatisfied: Map<Equation, boolean>

    constructor() {
        super();
        this.equations = []
        this.variables = new DisjointSetWithAssignment()
        this.equationIsSatisfied = new Map()
    }

    addEquation(e: Equation) {
        this.equations.push(e)
        this.runUnification()
    }

    removeEquation(e: Equation) {
        this.equations.filter(eq => eq !== e)
        this.runUnification()
    }

    getAssignedValue(v: VariableName) {
        return this.variables.getAssignedValue(v)
    }

    private unifyVariable(v: VariableName, ref: TermReference): boolean {
        if (this.variables.isAssigned(v)) {
            const value = this.variables.getAssignedValue(v)!
            return this.unifyEquation([value, ref])
        } else {
            if (this.termHasVariable(ref, v)) {
                if ("variable" in this.getHead(ref)) {
                    return true
                } else {
                    return false
                }
            }
            this.variables.assign(v, ref)
            return true
        }
    }

    private unifyEquation(equation: Equation): boolean {
        const [lhsRef, rhsRef] = equation
        const lhs = this.getHead(lhsRef)
        const rhs = this.getHead(rhsRef)
        if ("variable" in lhs) {
            if ("variable" in rhs) {
                this.variables.unite(lhs.variable, rhs.variable)
                return true
            } else {
                return this.unifyVariable(lhs.variable, rhsRef)
            }
        } else {
            if ("variable" in rhs) {
                return this.unifyVariable(rhs.variable, lhsRef)
            } else {
                if (lhs.label !== rhs.label) {
                    return false
                }
                if (lhs.args.length !== rhs.args.length) {
                    return false
                }
                let unifiedSuccessfully = []
                for (let i = 0; i < lhs.args.length; i++) {
                    const lhsArg = lhs.args[i]
                    const rhsArg = rhs.args[i]
                    unifiedSuccessfully.push(this.unifyEquation([lhsArg, rhsArg]))
                }
                if (unifiedSuccessfully.includes(false)) {
                    return false
                } else {
                    return true
                }
            }
        }
    }

    runUnification() {
        this.equationIsSatisfied = new Map()
        this.equations.forEach(equation => {
            const unifiedSuccessfully = this.unifyEquation(equation)
            this.equationIsSatisfied.set(equation, unifiedSuccessfully)
        });
    }

}