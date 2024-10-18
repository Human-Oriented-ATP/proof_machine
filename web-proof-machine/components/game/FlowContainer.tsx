"use client";
import { useReactFlow } from "@xyflow/react";
import { getInitialState } from "lib/state/Initialization";
import { GameContext } from "lib/state/StateContextProvider";
import { GameState, createGameStore } from "lib/state/Store";
import { useRef } from "react";
import { GameProps } from "./Game";
import FlowWithMenuBar from "./FlowWithMenuBar";


export function FlowContainer(props: GameProps) {
    const rf = useReactFlow();
    const initialState: GameState = getInitialState(props, rf);
    const store = useRef(createGameStore(initialState)).current;

    return <GameContext.Provider value={store}>
        <FlowWithMenuBar />
    </GameContext.Provider>;
}
