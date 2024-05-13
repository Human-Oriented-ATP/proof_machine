"use client"

import { ReactFlowProvider } from "reactflow";
import { Diagram } from "./Diagram";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Equation, unifyEquations } from "../../lib/game/Unification";
import { TermEnumerator, getMaximumNumberInGameData } from "../../lib/game/TermEnumeration";
import { InitializationData } from "../../lib/game/Initialization";
import { Axiom, GadgetId, GadgetProps, NodePosition } from "../../lib/game/Primitives";
import { AssignmentContext } from "../../lib/game/AssignmentContext";
import { CustomControlProps } from "./ControlButtons";
import { GameHelp } from "./GameHelp";
import Popup, { usePopup } from "../primitive/Popup";
import { GameHistory } from "lib/GameHistory";
import { synchronizeHistory } from "lib/synchronizeHistory";

export interface GameProps {
    initData: InitializationData
    problemId: string
}

export function Game(props: GameProps) {
    const { axioms, goal } = props.initData

    const enumerationOffset = getMaximumNumberInGameData({ axioms, goal })
    const [equations, setEquations] = useState<Equation[]>([])
    const enumeration = useRef<TermEnumerator>(new TermEnumerator(enumerationOffset))
    const [isSolved, setIsSolved] = useState(false)

    const helpPopup = usePopup()
    const problemSolvedPopup = usePopup()

    const history = useRef<GameHistory>(new GameHistory(props.problemId))

    const [termEnumeration, eqSatisfied] = useMemo(() => {
        const [assignment, eqSatisfied] = unifyEquations(equations)
        enumeration.current.updateEnumeration(assignment)
        const termEnumeration = enumeration.current.getHoleValueAssignment(assignment)
        return [termEnumeration, eqSatisfied]
    }, [equations])

    function addGadget(gadgetId: string, axiom: Axiom) {
        history.current.logEvent({ GadgetAdded: { gadgetId, axiom } })
        synchronizeHistory(JSON.stringify(history.current))
    }

    function removeGadget(gadgetId: string) {
        history.current.logEvent({ GadgetRemoved: { gadgetId } })
        synchronizeHistory(JSON.stringify(history.current))
    }

    function addEquation(from: [GadgetId, NodePosition], to: [GadgetId, NodePosition], newEquation: Equation) {
        history.current.logEvent({ EquationAdded: { from, to } })
        setEquations(equations => [...equations, newEquation])
    }

    function removeEquation(from: [GadgetId, NodePosition], to: [GadgetId, NodePosition], equationToBeDeleted: Equation) {
        history.current.logEvent({ EquationRemoved: { from, to } })
        setEquations(equations => equations.filter(equation =>
            JSON.stringify(equation) !== JSON.stringify(equationToBeDeleted)))
    }

    const goalNodeProps: GadgetProps = {
        id: "goal_gadget",
        terms: new Map([[0, goal]]),
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

    const setProblemSolved = useCallback((b: boolean) => {
        setIsSolved(b)
        if (b && !history.current.completed) {
            history.current.logEvent({ Completed: null })
            history.current.completed = true
            synchronizeHistory(JSON.stringify(history.current))
        }
    }, [])

    useEffect(() => {
        try {
            const historyString = JSON.stringify(history.current)
            synchronizeHistory(historyString)
        } catch (e) {
            console.error(e)
        }
    }, [equations])

    return <div style={{ width: "100vw", height: "100vh" }}>
        <AssignmentContext.Provider value={termEnumeration}>
            <ReactFlowProvider>
                <Diagram
                    axioms={axioms}
                    addGadget={addGadget}
                    removeGadget={removeGadget}
                    addEquation={addEquation}
                    removeEquation={removeEquation}
                    isSatisfied={eqSatisfied}
                    goal={goalNodeProps}
                    controlProps={controlProps}
                    setProblemSolved={setProblemSolved}
                ></Diagram>
            </ReactFlowProvider>
        </AssignmentContext.Provider>
        <Popup isOpen={helpPopup.isOpen} close={helpPopup.close}><GameHelp /></Popup>
        <Popup isOpen={problemSolvedPopup.isOpen} close={problemSolvedPopup.close}><div>Problem solved!</div></Popup>
    </div>
}