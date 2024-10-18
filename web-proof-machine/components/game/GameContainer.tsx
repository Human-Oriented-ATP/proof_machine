"use client";
import { useReactFlow } from "@xyflow/react";
import { getInitialState } from "lib/state/Initialization";
import { GameContext } from "lib/state/StateContextProvider";
import { GameState, createGameStore } from "lib/state/Store";
import { useRef } from "react";
import { GameProps } from "./GameNew";
import FlowWithMenuBar from "./FlowWithMenuBar";


export function GameContainer(props: GameProps) {
    const rf = useReactFlow();
    const initialState: GameState = getInitialState(props, rf);
    const store = useRef(createGameStore(initialState)).current;
    const initData = {
        initialDiagram: props.initialDiagram,
        axioms: props.axioms,
    };

    return <GameContext.Provider value={store}>
        <FlowWithMenuBar initData={initData} />
    </GameContext.Provider>;
}
