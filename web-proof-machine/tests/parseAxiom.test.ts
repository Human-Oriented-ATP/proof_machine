import { expect, test } from 'vitest'
import { parseAxiom } from "../lib/parsing/Semantics"

test("Axiom parsing", () => {
    const axiomAsString = "r(A):-r(B)."
    const parsed = parseAxiom(axiomAsString)
    expect(parsed.conclusion).toEqual({ label: "r", args: [{ variable: "A" }] })
    expect(parsed.hypotheses).toEqual([{ label: "r", args: [{ variable: "B" }] }])
})

test("Axiom parsing with whitespaces", () => {
    const axiomAsString = " r(A) :- r(B)."
    const parsed = parseAxiom(axiomAsString)
    expect(parsed.conclusion).toEqual({ label: "r", args: [{ variable: "A" }] })
    expect(parsed.hypotheses).toEqual([{ label: "r", args: [{ variable: "B" }] }])
})

test("Axiom parsing without hypotheses", () => {
    const axiomAsString = " r(A) :-."
    const parsed = parseAxiom(axiomAsString)
    expect(parsed.conclusion).toEqual({ label: "r", args: [{ variable: "A" }] })
})

test("Axiom parsing with multiple hypotheses", () => {
    const axiomAsString = " r(A) :- b(C), g(F)."
    const parsed = parseAxiom(axiomAsString)
    expect(parsed.conclusion).toEqual({ label: "r", args: [{ variable: "A" }] })
    expect(parsed.hypotheses).toEqual([
        { label: "b", args: [{ variable: "C" }] },
        { label: "g", args: [{ variable: "F" }] },
    ])
})

test("Axiom parsing without full stop", () => {
    const axiomAsString = "r( A) :- b(C ),g(F)"
    const parsed = parseAxiom(axiomAsString)
    expect(parsed.conclusion).toEqual({ label: "r", args: [{ variable: "A" }] })
    expect(parsed.hypotheses).toEqual([
        { label: "b", args: [{ variable: "C" }] },
        { label: "g", args: [{ variable: "F" }] },
    ])
})

test("Axiom parsing should error on goal input", () => {
    const axiomAsString = ":- r(A)."
    expect(() => parseAxiom(axiomAsString)).toThrowError()
})
