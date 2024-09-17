import { ReactFlowProvider } from "@xyflow/react";
import { Diagram } from "./diagram/Diagram";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Equation, EquationId, unifyEquations } from "../../lib/game/Unification";
import { TermEnumerator, getMaximumNumberInGameData } from "../../lib/game/TermEnumeration";
import { InitializationData, getEquationFromInitialConnection } from "../../lib/game/Initialization";
import { Axiom, GadgetId, NodePosition } from "../../lib/game/Primitives";
import { AssignmentContext } from "../../lib/game/AssignmentContext";
import { GameEvent, GameHistory } from "lib/study/GameHistory";
import { synchronizeHistory } from "lib/study/synchronizeHistory";
import { axiomToString } from "lib/game/GameLogic";
import { InitialViewportSetting } from "lib/util/ReactFlow";

export interface GameProps {
    initData: InitializationData
    problemId?: string
    setProblemSolved: () => void
    setUserIsDraggingOrNavigating: (isInteracting: boolean) => void
    proximityConnectEnabled: boolean
    zoomEnabled: boolean
    initialViewportSetting?: InitialViewportSetting
    advanceTutorial: () => void
    triggerForNextTutorialStep?: GameEvent
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

function checkFieldsMatch(event: GameEvent, trigger: GameEvent): boolean {
    const eventKey = Object.keys(event)[0];
    const triggerKey = Object.keys(trigger)[0];

    if (eventKey !== triggerKey) {
        return false;
    }

    const eventValue = (event as any)[eventKey];
    const triggerValue = (trigger as any)[triggerKey];

    if (triggerValue === null) {
        return true;
    }

    for (const key in triggerValue) {
        if (triggerValue[key] !== undefined && triggerValue[key] !== eventValue[key]) {
            return false;
        }
    }

    return true;
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

    const advanceTutorialIfTriggers = useCallback((event: GameEvent, trigger: GameEvent | undefined) => {
        if (trigger &&
            checkFieldsMatch(event, trigger)) {
            props.advanceTutorial()
        }
    }, [props.advanceTutorial])

    const addGadget = useCallback((gadgetId: string, axiom: Axiom) => {
        const event: GameEvent = { GadgetAdded: { gadgetId, axiom: axiomToString(axiom) } }
        advanceTutorialIfTriggers(event, props.triggerForNextTutorialStep)
        history.current.logEvent(event)
        synchronizeHistory(JSON.stringify(history.current))
    }, [props.triggerForNextTutorialStep])

    const removeGadget = useCallback((gadgetId: string) => {
        const event: GameEvent = { GadgetRemoved: { gadgetId } }
        advanceTutorialIfTriggers(event, props.triggerForNextTutorialStep)
        history.current.logEvent(event)
        synchronizeHistory(JSON.stringify(history.current))
    }, [props.triggerForNextTutorialStep])

    const addEquation = useCallback((from: GadgetId, to: [GadgetId, NodePosition], newEquation: Equation) => {
        const event: GameEvent = { EquationAdded: { from, to } }
        advanceTutorialIfTriggers(event, props.triggerForNextTutorialStep)
        history.current.logEvent(event)
        const newEquations = new Map(equations)
        newEquations.set(getEquationId(from, to), newEquation)
        setEquations(equations => (new Map(equations)).set(getEquationId(from, to), newEquation))
    }, [equations, props.triggerForNextTutorialStep])

    const removeEquation = useCallback((from: GadgetId, to: [GadgetId, NodePosition]) => {
        const event: GameEvent = { EquationRemoved: { from, to } }
        advanceTutorialIfTriggers(event, props.triggerForNextTutorialStep)
        history.current.logEvent(event)
        setEquations(equations => {
            const newEquations = new Map(equations)
            newEquations.delete(getEquationId(from, to))
            return newEquations
        })
    }, [equations, props.triggerForNextTutorialStep])

    const setProblemSolvedAndWriteToHistory = useCallback(() => {
        props.setProblemSolved()
        if (!history.current.completed) {
            const event = { GameCompleted: null }
            advanceTutorialIfTriggers(event, props.triggerForNextTutorialStep)
            history.current.logEvent(event)
            history.current.completed = true
            synchronizeHistory(JSON.stringify(history.current))
        }
    }, [props.triggerForNextTutorialStep])

    useEffect(() => {
        try {
            const historyString = JSON.stringify(history.current)
            synchronizeHistory(historyString)
        } catch (e) {
            console.error(e)
        }
    }, [equations])

    const initialViewportSetting = props.initialViewportSetting || "ORIGIN_AT_RIGHT"

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
                setUserIsDraggingOrNavigating={props.setUserIsDraggingOrNavigating}
                proximityConnectEnabled={props.proximityConnectEnabled}
                zoomEnabled={props.zoomEnabled}
                initialViewportSetting={initialViewportSetting}
            ></Diagram>
        </ReactFlowProvider>
    </AssignmentContext.Provider>
}