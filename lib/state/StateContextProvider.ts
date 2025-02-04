import { createContext } from 'react'
import { GameSlice, GameStore } from './Store'
import { useContext } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'

export const GameContext = createContext<GameStore | null>(null)

export function useGameStateContext<T>(
    selector: (state: GameSlice) => T,
    equalityFn?: (left: T, right: T) => boolean,
): T {
    const store = useContext(GameContext)
    if (!store) throw new Error('Missing GameContext.Provider in the tree')
    return useStoreWithEqualityFn(store, selector, equalityFn)
}