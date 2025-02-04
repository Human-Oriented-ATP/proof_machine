"use client"

import { CellPosition } from 'lib/game/CellPosition';
import { GadgetId } from "../game/Primitives";

export type GameEvent = { GameCompleted: null }
    | { GadgetAdded: { gadgetId?: GadgetId, axiom?: string } }
    | { ConnectionAdded: { from?: GadgetId, to?: [GadgetId, CellPosition] } }
    | { GadgetRemoved: { gadgetId?: GadgetId } }
    | { ConnectionRemoved: { from?: GadgetId, to?: [GadgetId, CellPosition] } };

export type GameHistory = {
    problemId: string
    configId: string
    startTime: Date
    completed: boolean
    log: [GameEvent, Date][]
}
