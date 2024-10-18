import { ReactFlowProvider } from "@xyflow/react";
import { Diagram } from "./diagram/Diagram";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Equation, EquationId, unifyEquations } from "../../lib/game/Unification";
import { InitializationData, getEquationFromInitialConnection } from "../../lib/game/Initialization";
import { Axiom, GadgetId, NodePosition } from "../../lib/game/Primitives";
import { AssignmentContext } from "../../lib/game/AssignmentContext";
import { GameEvent, GameHistory } from "lib/study/GameHistory";
import { synchronizeHistory } from "lib/study/synchronizeHistory";
import { axiomToString } from "lib/game/GameLogic";
import { InitialViewportSetting } from "lib/util/ReactFlow";
import { GadgetSelector, InteractiveStep } from "components/tutorial/InteractiveLevel";
import { InteractiveOverlay } from "components/tutorial/InteractiveOverlay";
import { getMaximumNumberInGameData } from "lib/game/TermEnumeration";

export interface GameProps {
    initData: InitializationData
    problemId?: string
    config?: string
    markLevelAsCompleted?: (levelIsCompleted: boolean) => void
    setDiagramHasBrokenConnection?: (diagramHasBrokenConnection: boolean) => void
    initialViewportSetting?: InitialViewportSetting
    zoomEnabled?: boolean
    proximityConnectEnabled?: boolean
    gadgetDeletionEnabled?: boolean
    panEnabled?: boolean
    interactiveSteps?: InteractiveStep[]
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
        if (triggerValue[key] === undefined) {
            continue;
        } else if (JSON.stringify(triggerValue[key]).replace(/\s+/g, '')
            !== JSON.stringify(eventValue[key]).replace(/\s+/g, '')) {
            return false;
        }
    }

    return true;
}

export function Game(props: GameProps) {
    const [equations, setEquations] = useState<Map<EquationId, Equation>>(getInitialEquations(props.initData))

    const history = useRef<GameHistory>(new GameHistory(props.problemId, props.config))

    const [userIsDraggingOrNavigating, setUserIsDraggingOrNavigating] = useState(false)

    const [tutorialStep, setTutorialStep] = useState(0)

    const getTriggerForNextTutorialStep = useCallback(() => {
        return props.interactiveSteps?.[tutorialStep]?.trigger
    }, [props.interactiveSteps, tutorialStep])

    const advanceTutorial = useCallback(() => {
        setTutorialStep(tutorialStep + 1)
    }, [tutorialStep])

    const advanceTutorialIfIsCorrectEvent = useCallback((event: GameEvent) => {
        const trigger = getTriggerForNextTutorialStep()
        if (trigger && checkFieldsMatch(event, trigger)) {
            advanceTutorial()
        }
    }, [advanceTutorial])

    const setDiagramHasBrokenConnection = useCallback((eqSatisfied: Map<string, boolean>) => {
        if (props.setDiagramHasBrokenConnection) {
            const existsBrokenConnection = Array.from(eqSatisfied.values()).some(value => value === false)
            props.setDiagramHasBrokenConnection(existsBrokenConnection)
        }
    }, [props.setDiagramHasBrokenConnection])

    // const [termEnumeration, eqSatisfied] = useMemo(() => {
    //     const unificationResult = unifyEquations(equations)
    //     enumeration.current.updateEnumeration(unificationResult.assignment)
    //     const termEnumeration = enumeration.current.getHoleValueAssignment(unificationResult.assignment)
    //     return [termEnumeration, unificationResult.equationIsSatisfied]
    // }, [equations])

    // useEffect(() => {
    //     setDiagramHasBrokenConnection(eqSatisfied)
    // }, [eqSatisfied])

    const setLevelIsCompleted = useCallback((levelIsCompleted: boolean) => {
        if (props.markLevelAsCompleted) {
            props.markLevelAsCompleted(levelIsCompleted)
        }
    }, [])

    const setLevelCompletedAndWriteToHistory = useCallback(() => {
        setLevelIsCompleted(true)
        if (!history.current.completed) {
            const event = { GameCompleted: null }
            advanceTutorialIfIsCorrectEvent(event)
            history.current.logEvent(event)
            history.current.completed = true
            synchronizeHistory(JSON.stringify(history.current))
        }
    }, [getTriggerForNextTutorialStep])

    useEffect(() => {
        try {
            const historyString = JSON.stringify(history.current)
            synchronizeHistory(historyString)
        } catch (e) {
            console.error(e)
        }
    }, [equations])

    const getGadgetElementId = useCallback((gadget: GadgetSelector) => {
        if ("elementId" in gadget) {
            return gadget.elementId
        } else {
            return history.current.firstGadgetForAxiom(gadget.axiom)
        }
    }, [])

    const initialViewportSetting = props.initialViewportSetting || "ORIGIN_AT_RIGHT"

    return <>
        <ReactFlowProvider>
            <Diagram
                initData={props.initData}
                initialViewportSetting={initialViewportSetting}
                zoomEnabled={props.zoomEnabled ?? true}
                panEnabled={props.panEnabled ?? true}
            ></Diagram>
        </ReactFlowProvider>
        {props.interactiveSteps &&
            <InteractiveOverlay
                interactiveSteps={props.interactiveSteps}
                stepIndex={tutorialStep}
                hideInteractiveContent={userIsDraggingOrNavigating}
                getGadgetElementId={getGadgetElementId} />
        }
    </>
}