import { Term } from "../../game/TermIndex";
import { Equation, TermUnifier } from "../../game/TermUnifier";

const v0: Term = { variable: "v0" }
const v1: Term = { variable: "v1" }

const c0: Term = { label: "c0", args: [] }
const c1: Term = { label: "c1", args: [] }
const c2: Term = { label: "c2", args: [] }

const t0 = { label: "x", args: [c0, c1] }
const t1 = { label: "t", args: [c2, t0] }
const t2 = { label: "t", args: [v0, v1] }

const t3 = { label: "x", args: [v0, c1] }
const t4 = { label: "t", args: [c2, t3] }

test("Unification 0", () => {
    const unifier = new TermUnifier()

    const t1Ref = unifier.addTerm(t1)
    const t2Ref = unifier.addTerm(t2)

    const eq0: Equation = [t1Ref, t2Ref]
    unifier.addEquation(eq0)

    const v0val = unifier.getAssignedValue("v0")!
    const v1val = unifier.getAssignedValue("v1")!

    expect(v0val).toBe(unifier.getTermReference(c2))
    expect(v1val).toBe(unifier.getTermReference(t0))
    expect(unifier.isSatisfied(eq0)).toBe(true)
})

test("Unification 1", () => {
    const unifier = new TermUnifier()

    const t1Ref = unifier.addTerm(t1)
    const t4Ref = unifier.addTerm(t4)

    const eq0: Equation = [t1Ref, t4Ref]
    unifier.addEquation(eq0)

    const v0val = unifier.getAssignedValue("v0")!

    expect(v0val).toBe(unifier.getTermReference(c0))
    expect(unifier.isSatisfied(eq0)).toBe(true)
})

test("Unify variable with itself", () => {
    const unifier = new TermUnifier()

    const v0Ref = unifier.addTerm(v0)

    const eq0: Equation = [v0Ref, v0Ref]
    unifier.addEquation(eq0)

    expect(unifier.isSatisfied(eq0)).toBe(true)
})

test("Impossible unification", () => {
    const unifier = new TermUnifier()

    const t0Ref = unifier.addTerm(t0)
    const t1Ref = unifier.addTerm(t1)

    const eq0: Equation = [t0Ref, t1Ref]
    unifier.addEquation(eq0)

    expect(unifier.isSatisfied(eq0)).toBe(false)
})