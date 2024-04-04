import { ReactFlowProvider } from "reactflow";
import { Diagram } from "./Diagram";
import { Axiom, HoleValueAssignment, makeAxiomsFromJSONObject } from "../game/GameLogic";
import problemData from "../game/examples/problem1.json"
import { Term, TermAssignment, hashTerm, makeTermWithFreshVariables } from "../game/Term";
import { useMemo, useRef, useState } from "react";
import { Equation, unifyEquations } from "../game/Unification";
import { HoleValue } from "../game/Primitives";
import { useIdGenerator } from "../util/IdGeneratorHook";
import { GadgetFlowNodeProps } from "./GadgetFlowNode";

type EnumerationMap = Map<Term, number>

function getNextFreeHoleValue(offset: number, enumerationMap: EnumerationMap): number {
    const values = Array.from(enumerationMap.values())
    for (let i = offset; true; i++) {
        if (!values.includes(i)) {
            return i
        }
    }
}

function updateEnumeration(offset: number, immutablePreviousEnumeration: EnumerationMap,
    termAssignment: TermAssignment): EnumerationMap {
    let previousEnumeration = new Map(immutablePreviousEnumeration)
    const allAssignedTerms = termAssignment.getAssignedValues()
    for (const term of allAssignedTerms) {
        const hash = hashTerm(term)
        if (!(hash in previousEnumeration.keys())) {
            const value = getNextFreeHoleValue(offset, previousEnumeration)
            previousEnumeration.set(term, value)
        }
    }
    return previousEnumeration
}

function toHoleValue(t: Term, enumerationMap: EnumerationMap): HoleValue {
    if ("variable" in t) {
        throw Error("Cannot get hole value for a variable" + t)
    } else {
        if (t.args.length === 0) {
            const value = Number(t.label)
            return value
        } else {
            const lookup = enumerationMap.get(t)
            if (lookup) {
                return lookup
            } else {
                return "?"
            }
        }
    }
}

function getHoleValueAssignment(enumerationMap: EnumerationMap, termAssignment: TermAssignment):
    HoleValueAssignment {
    return (t => {
        if ("variable" in t) {
            const term = termAssignment.getAssignedValue(t.variable)
            if (term) {
                return toHoleValue(term, enumerationMap)
            } else {
                return ""
            }
        } else {
            return toHoleValue(t, enumerationMap)
        }
    })
}

export function Game() {
    const axioms = makeAxiomsFromJSONObject(problemData)
    const enumerationOffset = 10 // later: get this from axioms
    const generateGadgetId = useIdGenerator("gadget_")

    const [equations, setEquations] = useState<Equation[]>([])
    const enumeration = useRef<EnumerationMap>(new Map())

    const [holeValueAssignment, eqSatisfied] = useMemo(() => {
        const [assignment, eqSatisfied] = unifyEquations(equations)
        enumeration.current = updateEnumeration(enumerationOffset, enumeration.current, assignment)
        const holeValueAssignment = getHoleValueAssignment(enumeration.current, assignment)
        return [holeValueAssignment, eqSatisfied]
    }, [equations])

    function addEquation(newEquation: Equation) {
        setEquations(equations => [...equations, newEquation])
    }

    function deleteEquation(equationToBeDeleted: Equation) {
        setEquations(equations => equations.filter(equation =>
            JSON.stringify(equation) !== JSON.stringify(equationToBeDeleted)))
    }

    function makeNewGadget(axiom: Axiom): GadgetFlowNodeProps {
        const id = generateGadgetId()
        const inputTerms = axiom.hypotheses.map(hyp => makeTermWithFreshVariables(hyp, id))
        const outputTerm = makeTermWithFreshVariables(axiom.conclusion, id)
        const gadget: GadgetFlowNodeProps = {
            inputs: inputTerms,
            output: outputTerm,
            id,
            assignment: holeValueAssignment
        }
        return gadget
    }

    return <ReactFlowProvider>
        <Diagram
            axioms={axioms}
            makeNewGadget={makeNewGadget}
            addEquation={addEquation}
            deleteEquation={deleteEquation}
            isSatisfied={eqSatisfied}
            holeValueAssignment={holeValueAssignment}
        ></Diagram>
    </ReactFlowProvider>
}