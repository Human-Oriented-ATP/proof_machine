"use client"

import { InitialDiagram } from 'lib/game/Initialization'
import { InteractiveStep, LevelConfiguration } from 'components/tutorial/InteractiveLevel'
import { ReactFlowProvider } from '@xyflow/react'
import { FlowContainer } from './FlowContainer'

export interface GameProps {
  initialDiagram: InitialDiagram
  axioms: string[]
  problemId?: string
  nextProblem?: string
  configurationIdentifier?: string
  settings?: LevelConfiguration
  tutorialSteps?: InteractiveStep[]
}

export function Game(props: GameProps) {
  return <ReactFlowProvider>
    <FlowContainer {...props} />
  </ReactFlowProvider>
}
