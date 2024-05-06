"use client"

import { ReactFlowProvider } from "reactflow";
import { Diagram } from "./Diagram";
import { useEffect, useMemo, useRef, useState } from "react";
import { Equation, unifyEquations } from "../lib/game/Unification";
import { TermEnumerator, getMaximumNumberInGameData } from "../lib/game/TermEnumeration";
import { InitializationData } from "../lib/game/Initialization";
import { GadgetProps } from "../lib/game/Primitives";
import { AssignmentContext } from "../lib/game/AssignmentContext";
import { CustomControlProps } from "./ControlButtons";
import { Help } from "./Help";
import Popup, { usePopup } from "./Popup";

export interface GameProps {
    initData: InitializationData
}

export function Game(props: GameProps) {
    const { axioms, goal } = props.initData

    const enumerationOffset = getMaximumNumberInGameData({ axioms, goal })
    const [equations, setEquations] = useState<Equation[]>([])
    const enumeration = useRef<TermEnumerator>(new TermEnumerator(enumerationOffset))
    const [isSolved, setIsSolved] = useState(false)

    const helpPopup = usePopup()
    const problemSolvedPopup = usePopup()

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
        inputs: [goal],
        isAxiom: false
    }

    useEffect(() => {
        if (isSolved) {
            problemSolvedPopup.open()
        }
    }, [isSolved])

    const controlProps: CustomControlProps = {
        showHelpWindow: helpPopup.open
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
                    controlProps={controlProps}
                    setProblemSolved={setIsSolved}
                ></Diagram>
            </ReactFlowProvider>
        </AssignmentContext.Provider>
        <Popup isOpen={helpPopup.isOpen} close={helpPopup.close}><Help /></Popup>
        <Popup isOpen={problemSolvedPopup.isOpen} close={problemSolvedPopup.close}><div>Problem solved!</div></Popup>
    </div>
}