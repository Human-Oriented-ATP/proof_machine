import { ReactFlowProvider } from "reactflow";
import { Diagram } from "./Diagram";
import { Axiom, axiomAssignment } from "../game/GameLogic";
import problemData from "../game/examples/problem1.json"
import { makeTermWithFreshVariables } from "../game/Term";
import { useEffect, useMemo, useRef, useState } from "react";
import { Equation, unifyEquations } from "../game/Unification";
import { useIdGenerator } from "../util/IdGeneratorHook";
import { GadgetFlowNodeProps } from "./GadgetFlowNode";
import { TermEnumeration } from "../game/TermEnumeration";
import { initializeGame } from "../game/Initialization";

export function Game() {
    const { axioms, goal } = initializeGame(problemData)

    const enumerationOffset = 5 // later: get this from axioms
    const generateGadgetId = useIdGenerator("gadget_")
    const [equations, setEquations] = useState<Equation[]>([])
    const enumeration = useRef<TermEnumeration>(new TermEnumeration(enumerationOffset))


    const [holeValueAssignment, eqSatisfied] = useMemo(() => {
        const [assignment, eqSatisfied] = unifyEquations(equations)
        enumeration.current.updateEnumeration(assignment)
        const holeValueAssignment = enumeration.current.getHoleValueAssignment(assignment)
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

    const goalNodeProps: GadgetFlowNodeProps = {
        id: "goal_gadget",
        inputs: [goal],
        assignment: axiomAssignment
    }

    return <ReactFlowProvider>
        <Diagram
            axioms={axioms}
            makeNewGadget={makeNewGadget}
            addEquation={addEquation}
            deleteEquation={deleteEquation}
            isSatisfied={eqSatisfied}
            holeValueAssignment={holeValueAssignment}
            goalNodeProps={goalNodeProps}
        ></Diagram>
    </ReactFlowProvider>
}