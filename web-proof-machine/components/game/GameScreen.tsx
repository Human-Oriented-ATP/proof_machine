"use client"

import { useCallback, useState } from "react";
import { InitializationData } from "../../lib/game/Initialization";
import Popup, { usePopup } from "../primitive/Popup";
import MenuBar from "components/navigation/MenuBar";
import { GameHelp } from "./GameHelp";
import { Game } from "./Game";
import { interactiveTutorialLevels } from "components/tutorial/InteractiveTutorialLevels";
import { StudyConfiguration } from "lib/study/Types";
import { saveLevelCompletedAsCookie } from "lib/study/CompletedProblems";

interface GameScreenProps {
    initData: InitializationData
    configuration: StudyConfiguration
    problemId: string
}

export default function GameScreen(props: GameScreenProps) {
    const [levelIsCompleted, setLevelIsCompleted] = useState(false)
    const [diagramHasBrokenConnection, setDiagramHasBrokenConnection] = useState(false)
    const helpPopup = usePopup()

    const markLevelAsCompleted = useCallback(() => {
        setLevelIsCompleted(true)
        saveLevelCompletedAsCookie(props.problemId)
    }, [])

    const interactiveLevel = interactiveTutorialLevels.get(props.problemId)
    const initialDiagram = interactiveLevel?.initialDiagram
    const initData = initialDiagram ? { ...props.initData, initialDiagram } : props.initData
    const settings = interactiveLevel?.settings
    const showBrokenConnectionStatusBarMessage = settings?.showBrokenConnectionStatusBarMessage ?? true

    return <div className='h-dvh flex flex-col'>
        <div><MenuBar levelIsCompleted={levelIsCompleted} 
                      diagramHasBrokenConnection={showBrokenConnectionStatusBarMessage ? diagramHasBrokenConnection : false} 
                      showHelpWindow={helpPopup.open}
                      configuration={props.configuration} /></div>
        <div className="grow">
            <Game 
                problemId={props.problemId}
                config={props.configuration.name}
                initData={initData}
                markLevelAsCompleted={markLevelAsCompleted}
                setDiagramHasBrokenConnection={setDiagramHasBrokenConnection}
                interactiveSteps={interactiveLevel?.steps}
                {...settings}
            />
            <Popup isOpen={helpPopup.isOpen} close={helpPopup.close}><GameHelp settings={settings}/></Popup>
        </div>
    </div>
}