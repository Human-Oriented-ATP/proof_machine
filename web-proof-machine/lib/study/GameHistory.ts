"use client"

import { GadgetId, NodePosition } from "../game/Primitives";

export type GameEvent = { GameCompleted: null }
    | { GadgetAdded: { gadgetId?: GadgetId, axiom?: string } }
    | { ConnectionAdded: { from?: GadgetId, to?: [GadgetId, NodePosition] } }
    | { GadgetRemoved: { gadgetId?: GadgetId } }
    | { ConnectionRemoved: { from?: GadgetId, to?: [GadgetId, NodePosition] } };

export class GameHistory {
    public problemId: string | undefined
    public config: string | undefined

    public startTime: Date
    public lastSynchronized: Date
    public completed: boolean

    public log: [GameEvent, Date][]

    constructor(problemId?: string, config?: string) {
        this.completed = false;
        this.startTime = new Date();
        this.log = [];
        this.problemId = problemId;
        this.config = config
        if (this.config === undefined || this.problemId === undefined) {
            console.log("Game data is not being recorded.");
        }
    }

    logEvent(event: GameEvent) {
        this.log.push([event, new Date()]);
    }

    firstGadgetForAxiom(axiom: string): GadgetId | undefined {
        for (let i = 0; i < this.log.length; i++) {
            const [event, _] = this.log[i];
            if ("GadgetAdded" in event && event.GadgetAdded.axiom === axiom) {
                return event.GadgetAdded.gadgetId;
            }
        }
        return undefined;
    }

}