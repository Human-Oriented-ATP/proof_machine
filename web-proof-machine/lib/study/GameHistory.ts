"use client"

import { Axiom, GadgetId, NodePosition } from "../game/Primitives";

export type GameEvent = { Completed: null }
    | { GadgetAdded: { gadgetId: GadgetId, axiom: Axiom } }
    | { EquationAdded: { from: [GadgetId, NodePosition], to: [GadgetId, NodePosition] } }
    | { GadgetRemoved: { gadgetId: GadgetId } }
    | { EquationRemoved: { from: [GadgetId, NodePosition], to: [GadgetId, NodePosition] } };

export class GameHistory {
    public problemId: string;

    public startTime: Date
    public lastSynchronized: Date
    public completed: boolean

    public log: GameEvent[]

    constructor(problemId: string) {
        this.completed = false;
        this.startTime = new Date();
        this.log = [];
        this.problemId = problemId;
    }

    logEvent(event: GameEvent) {
        this.log.push(event);
    }
}