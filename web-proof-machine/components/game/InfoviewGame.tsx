import { InitializationData } from "lib/game/Initialization"
import { Game } from "./Game"

export default function InfoviewGame(initData: InitializationData) {
    console.log(initData)
    return (
        <div className="w-full h-screen max-w-full mx-auto">
            <Game initData={initData} setProblemSolved={() => { }} historyRecorded={false} proximityConnectEnabled={true} />
        </div>
    )
}