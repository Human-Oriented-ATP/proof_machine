"use client"

import { useCallback, useState } from "react";
import { InitializationData } from "../../lib/game/Initialization";
import Popup, { usePopup } from "../primitive/Popup";
import MenuBar from "components/navigation/MenuBar";
import { HelpContent } from "./HelpContent";
import { Flow } from "./flow/Flow";
import { GadgetShelf } from "./flow/GadgetShelf";
import { HelpPopup } from "./HelpPopup";

export default function FlowWithMenuBar() {
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
        <div className="w-full"><MenuBar /></div>
        <div className="relative flex flex-1">
            <Flow />
            {/* {props.interactiveSteps &&
                <InteractiveOverlay
                interactiveSteps={props.interactiveSteps}
                stepIndex={tutorialStep}
                hideInteractiveContent={userIsDraggingOrNavigating}
                getGadgetElementId={getGadgetElementId} />
                } */}
            <GadgetShelf />
            <HelpPopup />
        </div>
    </div>
}