"use server"

import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { GameHistory } from "./GameHistory";

function generateNewPlayerId(): string {
    const newPlayerId = Math.random().toString(36).substring(2)
    return newPlayerId
}

async function setPlayerId(playerId: string) {
    const MILLISECONDS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365
    cookies().set('id', playerId, { expires: new Date(Date.now() + MILLISECONDS_IN_A_YEAR) })
}

export async function getPlayerId(): Promise<string> {
    const playerId = cookies().get('id')
    if (playerId === undefined) {
        const newPlayerId = generateNewPlayerId()
        setPlayerId(newPlayerId)
        return newPlayerId
    } else {
        return playerId.value
    }
}

function passesSanityCheck(history: GameHistory): boolean {
    const logIsNotEmpty = history.log.length !== 0
    const problemIdIsDefined = history.problemId !== undefined
    const configIsDefined = history.config !== undefined
    return logIsNotEmpty && problemIdIsDefined && configIsDefined
}

export async function synchronizeHistory(historyString: string) {
    "use server"
    try {
        const playerId = await getPlayerId()
        const history = JSON.parse(historyString)
        if (passesSanityCheck(history)) {
            const log: string = JSON.stringify(history.log);
            const lastSynchronized = new Date().toISOString();
            await sql`INSERT INTO study_data (player_id, problem_id, config, start, latest, history, completed) VALUES 
                (${playerId}, ${history.problemId}, ${history.config}, ${history.startTime}, ${lastSynchronized}, ${log}, ${history.completed})
                ON CONFLICT (player_id, problem_id, start) DO UPDATE
                SET latest=${lastSynchronized}, 
                    history=${log},
                    completed=${history.completed}
                WHERE study_data.completed=false;`
        }
    } catch (error) {
        console.error("Error synchronizing history.")
        console.error(error);
    }
}