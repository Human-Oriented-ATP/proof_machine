"use client"

import { InitialDiagram } from 'lib/game/Initialization'
import { StudyConfiguration } from 'lib/study/Types'
import { InteractiveStep, LevelConfiguration } from 'components/tutorial/InteractiveLevel'
import { Axiom } from 'lib/game/Primitives'
import { ReactFlowProvider } from '@xyflow/react'
import { GameContainer } from './GameContainer'

export interface GameProps {
  initialDiagram: InitialDiagram
  axioms: Axiom[]
  problemId?: string
  nextProblem?: string
  configurationIdentifier?: string
  settings?: LevelConfiguration
  tutorialSteps?: InteractiveStep[]
}

export function Game(props: GameProps) {
  return <ReactFlowProvider>
    <GameContainer {...props} />
  </ReactFlowProvider>
}
