"use server"

import { sql } from "@vercel/postgres";

export async function synchronizeHistory(historyString: string) {
    "use server"
    try {
        const history = JSON.parse(historyString)
        const log: string = JSON.stringify(history.log);
        console.log("Synchronizing history.")
        await sql`INSERT INTO testing (player_id, problem_id, start, latest, history, completed) VALUES 
            (${history.playerId}, ${history.problemId}, ${history.startTime}, ${history.lastSynchronized}, ${log}, ${history.completed});`
        history.lastSynchronized = new Date();
    } catch (error) {
        console.log("Error synchronizing history.")
        console.log(error);
    }
}
