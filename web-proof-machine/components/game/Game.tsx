"use client"

import { ReactFlowProvider } from "reactflow";
import { Diagram } from "./Diagram";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Equation, unifyEquations } from "../../lib/game/Unification";
import { TermEnumerator, getMaximumNumberInGameData } from "../../lib/game/TermEnumeration";
import { InitializationData } from "../../lib/game/Initialization";
import { Axiom, GadgetId, GadgetProps, NodePosition } from "../../lib/game/Primitives";
import { AssignmentContext } from "../../lib/game/AssignmentContext";
import SingleButtonPopup, { useSingleButtonPopup } from "../primitive/SingleButtonPopup";
import { GameHistory } from "lib/study/GameHistory";
import { synchronizeHistory } from "lib/study/synchronizeHistory";
import LevelCompletedBanner from "components/primitive/LevelCompletedBanner";
import { axiomToString } from "lib/game/GameLogic";
import { GameHelp } from "./GameHelp";

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

    const helpPopup = useSingleButtonPopup()

    const history = useRef<GameHistory>(new GameHistory(props.problemId))

    const [termEnumeration, eqSatisfied] = useMemo(() => {
        const [assignment, eqSatisfied] = unifyEquations(equations)
        enumeration.current.updateEnumeration(assignment)
        const termEnumeration = enumeration.current.getHoleValueAssignment(assignment)
        return [termEnumeration, eqSatisfied]
    }, [equations])

    function addGadget(gadgetId: string, axiom: Axiom) {
        history.current.logEvent({ GadgetAdded: { gadgetId, axiom: axiomToString(axiom) } })
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

    return <div className='h-dvh flex flex-col'>
        <div><LevelCompletedBanner isSolved={isSolved} /></div>
        <div className="grow">
            <AssignmentContext.Provider value={termEnumeration}>
                <ReactFlowProvider>
                    <Diagram
                        problemId={props.problemId}
                        axioms={axioms}
                        addGadget={addGadget}
                        removeGadget={removeGadget}
                        addEquation={addEquation}
                        removeEquation={removeEquation}
                        isSatisfied={eqSatisfied}
                        goal={goalNodeProps}
                        showHelpWindow={helpPopup.open}
                        setProblemSolved={setProblemSolved}
                    ></Diagram>
                </ReactFlowProvider>
            </AssignmentContext.Provider>
            <SingleButtonPopup isOpen={helpPopup.isOpen} close={helpPopup.close}><GameHelp /></SingleButtonPopup>
        </div>
    </div>
}