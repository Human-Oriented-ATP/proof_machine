"use client"

import { useCallback, useState } from "react";
import { InitializationData } from "../../lib/game/Initialization";
import Popup, { usePopup } from "../primitive/Popup";
import MenuBar from "components/navigation/MenuBar";
import { GameHelp } from "./GameHelp";
import { Flow } from "./diagram/Diagram";

interface GameScreenProps {
    initData: InitializationData
}

export default function FlowWithMenuBar(props: GameScreenProps) {
    const [levelIsCompleted, setLevelIsCompleted] = useState(false)
    const [diagramHasBrokenConnection, setDiagramHasBrokenConnection] = useState(false)
    const helpPopup = usePopup()

    const markLevelAsCompleted = useCallback(() => {
        setLevelIsCompleted(true)
        // saveLevelCompletedAsCookie(props.problemId)
    }, [])

    // const interactiveLevel = interactiveTutorialLevels.get(props.problemId)
    // const initialDiagram = interactiveLevel?.initialDiagram
    // const initData = initialDiagram ? { ...props.initData, initialDiagram } : props.initData
    // const settings = interactiveLevel?.settings

    return <div className='h-dvh flex flex-col'>
        <div><MenuBar /></div>
        <div className="grow">
            <Flow />
            {/* {props.interactiveSteps &&
                <InteractiveOverlay
                    interactiveSteps={props.interactiveSteps}
                    stepIndex={tutorialStep}
                    hideInteractiveContent={userIsDraggingOrNavigating}
                    getGadgetElementId={getGadgetElementId} />
            } */}
            <Popup isOpen={helpPopup.isOpen} close={helpPopup.close}><GameHelp /></Popup>
        </div>
    </div>
}