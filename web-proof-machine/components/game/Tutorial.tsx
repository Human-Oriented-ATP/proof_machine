import { InitializationData } from "lib/game/Initialization";
import { Game } from "./Game";

interface TutorialProps {
    initData: InitializationData
}

export function Tutorial(props: TutorialProps) {
    return <Game {...props} setProblemSolved={() => console.log('solved')} />;
}