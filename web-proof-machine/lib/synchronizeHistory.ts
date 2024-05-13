"use server"

import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export async function getPlayerId(): Promise<string> {
    const playerId = cookies().get('id')
    if (playerId === undefined) {
        const newPlayerId = Math.random().toString(36).substring(2)
        const MILLISECONDS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365
        cookies().set('id', newPlayerId, { expires: new Date(Date.now() + MILLISECONDS_IN_A_YEAR) })
        return newPlayerId
    } else {
        return playerId.value
    }
}

export async function synchronizeHistory(historyString: string) {
    "use server"
    try {
        console.log("Synchronizing history.")
        const playerId = await getPlayerId()
        const history = JSON.parse(historyString)
        const log: string = JSON.stringify(history.log);
        history.lastSynchronized = new Date().toISOString();
        console.log(`Inserting: ${playerId}, ${history.problemId}, ${history.startTime}, ${history.lastSynchronized}, ${log}, ${history.completed})`)
        const x = await sql`INSERT INTO test1 (player_id, problem_id, start, latest, history, completed) VALUES 
            (${playerId}, ${history.problemId}, ${history.startTime}, ${history.lastSynchronized}, ${log}, ${history.completed})
            ON CONFLICT (player_id, problem_id, start) DO UPDATE
            SET latest= ${history.lastSynchronized}, 
                history= ${log},
                completed=${history.completed}
            WHERE test1.completed=false;`
        console.log(x)
    } catch (error) {
        console.log("Error synchronizing history.")
        console.log(error);
    }
}

export async function retrieveHistory(playerId: string, problemId: string) {
    try {
        const x = await sql`SELECT * FROM test1 WHERE player_id=${playerId} AND problem_id=${problemId}`
        return x
    } catch (error) {
        console.log("Error retrieving history.")
        console.log(error)
    }

}

export async function createTable(x) {
    try {
        await sql`CREATE TABLE test1 (
            player_id VARCHAR(255) NOT NULL,
            problem_id VARCHAR(255) NOT NULL,
            start TIMESTAMP NOT NULL,
            latest TIMESTAMP NOT NULL,
            history JSONB NOT NULL,
            completed BOOLEAN NOT NULL, 
            unique(player_id, problem_id, start)
        )`
        console.log("Table created.")
    } catch (error) {
        console.log("Error creating table.")
        console.log(error)
    }
}