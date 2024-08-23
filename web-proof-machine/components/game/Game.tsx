import { ReactFlowProvider } from "@xyflow/react";
import { Diagram, getEquationFromEdge } from "./diagram/Diagram";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Equation, unifyEquations } from "../../lib/game/Unification";
import { TermEnumerator, getMaximumNumberInGameData } from "../../lib/game/TermEnumeration";
import { InitialDiagramGadget, InitializationData } from "../../lib/game/Initialization";
import { Axiom, GadgetId, NodePosition } from "../../lib/game/Primitives";
import { AssignmentContext } from "../../lib/game/AssignmentContext";
import { GameHistory } from "lib/study/GameHistory";
import { synchronizeHistory } from "lib/study/synchronizeHistory";
import { axiomToString } from "lib/game/GameLogic";
import { parseTerm } from "lib/parsing/Semantics";

export interface GameProps {
    initData: InitializationData
    problemId?: string
    setProblemSolved: () => void
}

function getInitialEquations(initData: InitializationData): Equation[] {
    return initData.initialDiagram.edges
    .map(edge => getEquationFromEdge(initData.initialDiagram, edge))
    .filter(equation => equation !== null) as Equation[]
}

export function Game(props: GameProps) {
    const enumerationOffset = getMaximumNumberInGameData(props.initData)

    const [equations, setEquations] = useState<Equation[]>(getInitialEquations(props.initData))

    const enumeration = useRef<TermEnumerator>(new TermEnumerator(enumerationOffset))

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

    const setProblemSolvedAndWriteToHistory = useCallback(() => {
        props.setProblemSolved()
        if (!history.current.completed) {
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

    return <AssignmentContext.Provider value={termEnumeration}>
        <ReactFlowProvider>
            <Diagram
                initData={props.initData}
                addGadget={addGadget}
                removeGadget={removeGadget}
                addEquation={addEquation}
                removeEquation={removeEquation}
                isSatisfied={eqSatisfied}
                setProblemSolved={setProblemSolvedAndWriteToHistory}
            ></Diagram>
        </ReactFlowProvider>
    </AssignmentContext.Provider>
}