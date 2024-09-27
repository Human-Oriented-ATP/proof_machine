"use client"

import { useCallback, useState } from "react";
import { InitializationData } from "../../lib/game/Initialization";
import Popup, { usePopup } from "../primitive/Popup";
import MenuBar from "components/navigation/MenuBar";
import { GameHelp } from "./GameHelp";
import { Game } from "./Game";
import { interactiveTutorialLevels } from "components/tutorial/InteractiveTutorialLevels";

interface GameScreenProps {
    initData: InitializationData
    problemId: string
}

export function GameScreen(props: GameScreenProps) {
    const [isSolved, setIsSolved] = useState(false)

    const helpPopup = usePopup()

    const setProblemSolved = useCallback(() => {
        setIsSolved(true)
    }, [])

    const interactiveLevel = interactiveTutorialLevels.get(props.problemId)
    const initialDiagram = interactiveLevel?.initialDiagram
    const initData = initialDiagram ? { ...props.initData, initialDiagram } : props.initData

    return <div className='h-dvh flex flex-col'>
        <div><MenuBar isSolved={isSolved} showHelpWindow={helpPopup.open} /></div>
        <div className="grow">
            <Game 
                problemId={props.problemId}
                initData={initData}
                setProblemSolved={setProblemSolved}
                interactiveSteps={interactiveLevel?.steps}
                {...interactiveLevel?.settings}
            />
            <Popup isOpen={helpPopup.isOpen} close={helpPopup.close}><GameHelp /></Popup>
        </div>
    </div>
}