import { Term, TermIndex } from "../../game/TermIndex";

test("Retrieve the same term", () => {
    const t: Term = { label: "foo", args: [{ variable: "v0" }] }
    const index = new TermIndex()
    const ref = index.addTerm(t)
    const retrievedTerm = index.getTerm(ref)
    expect(retrievedTerm).toEqual(t)
})


test("hasInIndex", () => {
    const t: Term = { label: "foo", args: [{ variable: "v0" }] }
    const index = new TermIndex()
    const before = index.hasInIndex(t)
    const ref = index.addTerm(t)
    const after = index.hasInIndex(t)
    expect(before).toEqual(false)
    expect(after).toEqual(true)
})

test("termHasVariable", () => {
    const t0: Term = { label: "foo", args: [{ variable: "v0" }] }
    const index = new TermIndex()
    const t0ref = index.addTerm(t0)
    expect(index.termHasVariable(t0ref, "v0")).toBe(true)
    expect(index.termHasVariable(t0ref, "v1")).toBe(false)
})