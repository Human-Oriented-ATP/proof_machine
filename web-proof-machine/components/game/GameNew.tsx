"use client"

import { InitialDiagram } from 'lib/game/Initialization'
import { getInitialState } from 'lib/state/Initialization'
import { GameContext } from 'lib/state/StateContextProvider'
import { createGameStore, GameState } from 'lib/state/Store'
import { StudyConfiguration } from 'lib/study/Types'
import { useRef } from 'react'
import GameScreen from './GameScreen'
import { InteractiveStep, LevelConfiguration } from 'components/tutorial/InteractiveLevel'
import { Axiom } from 'lib/game/Primitives'
import { ReactFlowProvider, useReactFlow } from '@xyflow/react'

export interface GameNewProps {
  initialDiagram: InitialDiagram
  axioms: Axiom[]
  settings: LevelConfiguration
  problemId?: string
  configuration?: StudyConfiguration
  tutorialSteps?: InteractiveStep[]
}

export function InnerGame(props: GameNewProps) {
  const rf = useReactFlow()
  const initialState: GameState = getInitialState(props, rf)
  const store = useRef(createGameStore(initialState)).current
  const initData = {
    initialDiagram: props.initialDiagram,
    axioms: props.axioms,
  }
  return <GameContext.Provider value={store}>
    <GameScreen initData={initData} configuration={props.configuration!} problemId={props.problemId!} />
  </GameContext.Provider>

}

export function GameNew(props: GameNewProps) {
  return <ReactFlowProvider>
    <InnerGame {...props} />
  </ReactFlowProvider>
}
