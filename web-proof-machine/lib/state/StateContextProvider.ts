import { createContext } from 'react'
import { GameStore } from './Store'

export const GameContext = createContext<GameStore | null>(null)
