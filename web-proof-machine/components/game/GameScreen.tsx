"use client"

import { useCallback, useState } from "react";
import { InitializationData } from "../../lib/game/Initialization";
import Popup, { usePopup } from "../primitive/Popup";
import MenuBar from "components/navigation/MenuBar";
import { GameHelp } from "./GameHelp";
import { Game } from "./Game";
import { InteractiveOverlay } from "components/tutorial/InteractiveOverlay";
import { interactiveTutorialLevels } from "components/tutorial/InteractiveTutorialLevels";
import { InteractiveLevel } from "components/tutorial/InteractiveLevel";

interface GameScreenProps {
    initData: InitializationData
    problemId: string
}

function getLevelSettings(level: InteractiveLevel | undefined) {
    if (level && level.settings) {
        return level.settings
    } else {
        return {
            proximityConnectEnabled: true,
            zoomEnabled: true
        }
    }
}

export function GameScreen(props: GameScreenProps) {
    const [userIsDraggingOrNavigating, setUserIsDraggingOrNavigating] = useState(false)

    const [tutorialStep, setTutorialStep] = useState(0)

    const advanceTutorial = useCallback(() => {
        setTutorialStep(tutorialStep + 1)
    }, [tutorialStep])

    const [isSolved, setIsSolved] = useState(false)

    const helpPopup = usePopup()

    const setProblemSolved = useCallback(() => {
        setIsSolved(true)
    }, [])

    const interactiveLevel = interactiveTutorialLevels.get(props.problemId)
    const triggerForNextTutorialStep = interactiveLevel?.steps[tutorialStep]?.trigger

    return <div className='h-dvh flex flex-col'>
        <div><MenuBar isSolved={isSolved} showHelpWindow={helpPopup.open} /></div>
        <div className="grow">
            <Game {...props}
                setProblemSolved={setProblemSolved}
                setUserIsDraggingOrNavigating={setUserIsDraggingOrNavigating}
                advanceTutorial={advanceTutorial}
                triggerForNextTutorialStep={triggerForNextTutorialStep}
                {...getLevelSettings(interactiveLevel)}
            />
            <Popup isOpen={helpPopup.isOpen} close={helpPopup.close}><GameHelp /></Popup>
        </div>
        {interactiveLevel &&
            <InteractiveOverlay interactiveLevel={interactiveLevel} step={tutorialStep} hideInteractiveContent={userIsDraggingOrNavigating} />
        }
    </div>
}