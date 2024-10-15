"use client"

import { InitialDiagram } from 'lib/game/Initialization'
import { getInitialState } from 'lib/state/Initialization'
import { GameContext } from 'lib/state/StateContextProvider'
import { createGameStore, GameInitialState } from 'lib/state/Store'
import { StudyConfiguration } from 'lib/study/Types'
import { useRef } from 'react'
import GameScreen from './GameScreen'
import { InteractiveStep, LevelConfiguration } from 'components/tutorial/InteractiveLevel'
import { Axiom } from 'lib/game/Primitives'

export interface GameNewProps {
  initialDiagram: InitialDiagram
  axioms: Axiom[]
  settings: LevelConfiguration
  problemId?: string
  configuration?: StudyConfiguration
  tutorialSteps?: InteractiveStep[]
}

export function GameNew(props: GameNewProps) {
  const initialState: GameInitialState = getInitialState(props)
  const store = useRef(createGameStore(initialState)).current
  const initData = {
    initialDiagram: props.initialDiagram,
    axioms: props.axioms
  }
  return <GameContext.Provider value={store}>
    <GameScreen initData={initData} configuration={props.configuration!} problemId={props.problemId!} />
  </GameContext.Provider>
}
