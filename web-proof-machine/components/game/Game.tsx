import { ReactFlowProvider } from "@xyflow/react";
import { Diagram } from "./diagram/Diagram";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Equation, EquationId, unifyEquations } from "../../lib/game/Unification";
import { TermEnumerator, getMaximumNumberInGameData } from "../../lib/game/TermEnumeration";
import { InitializationData, getEquationFromInitialConnection } from "../../lib/game/Initialization";
import { Axiom, GadgetId, NodePosition } from "../../lib/game/Primitives";
import { AssignmentContext } from "../../lib/game/AssignmentContext";
import { GameHistory } from "lib/study/GameHistory";
import { synchronizeHistory } from "lib/study/synchronizeHistory";
import { axiomToString } from "lib/game/GameLogic";

export interface GameProps {
    initData: InitializationData
    problemId?: string
    setProblemSolved: () => void
}

function getInitialEquations(initData: InitializationData): Map<EquationId, Equation> {
    const equations = new Map()
    initData.initialDiagram.connections.forEach(connection => {
        const equationId = getEquationId(connection.from, connection.to)
        const equation = getEquationFromInitialConnection(connection, initData.initialDiagram)
        equations.set(equationId, equation)
    })
    return equations
}

export function getEquationId(from: GadgetId, to: [GadgetId, NodePosition]): EquationId {
    return `equation-${from}-to-${to[0]}_${to[1]}`
}

export function Game(props: GameProps) {
    const enumerationOffset = getMaximumNumberInGameData(props.initData)

    const [equations, setEquations] = useState<Map<EquationId, Equation>>(getInitialEquations(props.initData))

    const enumeration = useRef<TermEnumerator>(new TermEnumerator(enumerationOffset))

    const history = useRef<GameHistory>(new GameHistory(props.problemId))

    const [termEnumeration, eqSatisfied] = useMemo(() => {
        const unificationResult = unifyEquations(equations)
        enumeration.current.updateEnumeration(unificationResult.assignment)
        const termEnumeration = enumeration.current.getHoleValueAssignment(unificationResult.assignment)
        return [termEnumeration, unificationResult.equationIsSatisfied]
    }, [equations])

    function addGadget(gadgetId: string, axiom: Axiom) {
        history.current.logEvent({ GadgetAdded: { gadgetId, axiom: axiomToString(axiom) } })
        synchronizeHistory(JSON.stringify(history.current))
    }

    function removeGadget(gadgetId: string) {
        history.current.logEvent({ GadgetRemoved: { gadgetId } })
        synchronizeHistory(JSON.stringify(history.current))
    }

    const addEquation = useCallback((from: GadgetId, to: [GadgetId, NodePosition], newEquation: Equation) => {
        history.current.logEvent({ EquationAdded: { from, to } })
        const newEquations = new Map(equations)
        newEquations.set(getEquationId(from, to), newEquation)
        setEquations(equations => (new Map(equations)).set(getEquationId(from, to), newEquation))
    }, [equations])

    const removeEquation = useCallback((from: GadgetId, to: [GadgetId, NodePosition]) => {
        history.current.logEvent({ EquationRemoved: { from, to } })
        setEquations(equations => {
            const newEquations = new Map(equations)
            newEquations.delete(getEquationId(from, to))
            return newEquations
        })
    }, [equations])

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