import { useState } from "react"
import problemData from "./examples/problem1.json"
import { Axiom, GadgetContainerProps, GameLogic } from "./GameLogic"
import { AbstractGadgetProps } from "./Primitives"

type GameLogicHookType = [GameLogic,
    ((a: Axiom) => AbstractGadgetProps),
    ((a: Axiom) => GadgetContainerProps)]

export function useGameLogic(): GameLogicHookType {
    const [gameLogic, _] = useState(new GameLogic(problemData))

    return [gameLogic,
        gameLogic.makeAxiomGadget.bind(gameLogic),
        gameLogic.makeGadget.bind(gameLogic)]
}