import { InitializationData } from "lib/game/Initialization"
import { Game } from "./Game"

export default function InfoviewGame(initData: InitializationData) {
    <Game initData={initData} setProblemSolved={() => { }} proximityConnectEnabled={true} />
}