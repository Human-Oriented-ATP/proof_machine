import { ReactFlowProvider } from "reactflow";
import { Diagram } from "./Diagram";
import { useMemo, useRef, useState } from "react";
import { Equation, unifyEquations } from "../game/Unification";
import { TermEnumerator, getMaximumNumberInGameData } from "../game/TermEnumeration";
import { initializeGame } from "../game/Initialization";
import { GadgetProps } from "../game/Primitives";
import { AssignmentContext } from "../game/AssignmentContext";

export interface GameProps {
    problemData: any
}

export function Game(props: GameProps) {
    const { axioms, goal } = initializeGame(props.problemData)

    const enumerationOffset = getMaximumNumberInGameData({ axioms, goal })
    const [equations, setEquations] = useState<Equation[]>([])
    const enumeration = useRef<TermEnumerator>(new TermEnumerator(enumerationOffset))


    const [termEnumeration, eqSatisfied] = useMemo(() => {
        const [assignment, eqSatisfied] = unifyEquations(equations)
        enumeration.current.updateEnumeration(assignment)
        const termEnumeration = enumeration.current.getHoleValueAssignment(assignment)
        return [termEnumeration, eqSatisfied]
    }, [equations])

    function addEquation(newEquation: Equation) {
        setEquations(equations => [...equations, newEquation])
    }

    function deleteEquation(equationToBeDeleted: Equation) {
        setEquations(equations => equations.filter(equation =>
            JSON.stringify(equation) !== JSON.stringify(equationToBeDeleted)))
    }

    const goalNodeProps: GadgetProps = {
        id: "goal_gadget",
        inputs: [goal]
    }

    return <div style={{ width: "100vw", height: "100vh" }}>
        <AssignmentContext.Provider value={termEnumeration}>
            <ReactFlowProvider>
                <Diagram
                    axioms={axioms}
                    addEquation={addEquation}
                    deleteEquation={deleteEquation}
                    isSatisfied={eqSatisfied}
                    goal={goalNodeProps}
                ></Diagram>
            </ReactFlowProvider>
        </AssignmentContext.Provider>
    </div>
}