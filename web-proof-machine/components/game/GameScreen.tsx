"use client"

import { useCallback, useState } from "react";
import { InitializationData } from "../../lib/game/Initialization";
import Popup, { usePopup } from "../primitive/Popup";
import MenuBar from "components/navigation/MenuBar";
import { GameHelp } from "./GameHelp";
import { Game } from "./Game";
import TutorialOverlay from "./TutorialOverlay";

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

    return <div className='h-dvh flex flex-col'>
        <div><MenuBar isSolved={isSolved} showHelpWindow={helpPopup.open} /></div>
        <div className="grow">
            <TutorialOverlay problemId={props.problemId} />
            <Game {...props} setProblemSolved={setProblemSolved} historyRecorded={true} proximityConnectEnabled={true} />
            <Popup isOpen={helpPopup.isOpen} close={helpPopup.close}><GameHelp /></Popup>
        </div>
    </div>
}