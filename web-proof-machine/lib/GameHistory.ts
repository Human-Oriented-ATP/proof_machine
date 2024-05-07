"use client"

export type GameEvent = { newGadget: string }
    | { newEquation: string }
    | { removedGadgets: string[] }
    | { removedEquations: string[] };

export class GameHistory {
    public playerId: string;
    public problemId: string;

    public startTime: Date
    public lastSynchronized: Date
    public completed: boolean

    public log: GameEvent[]

    constructor(playerId: string, problemId: string) {
        this.completed = false;
        this.startTime = new Date();
        this.log = [];
        this.playerId = playerId;
        this.problemId = problemId;
    }

    logEvent(event: GameEvent) {
        this.log.push(event);
    }
}