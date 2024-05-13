import { retrieveHistory } from "lib/synchronizeHistory"
import { GameHistory } from "./GameHistory"
import { useEffect, useState } from "react"
import { QueryResult, QueryResultRow } from "@vercel/postgres"

export default function ProblemHistory({ problemId, playerId }) {
    const [history, setHistory] = useState<QueryResult<QueryResultRow> | undefined>(undefined)

    useEffect(() => {
        async function loadHistory() {
            const data = await retrieveHistory(playerId, problemId)
            setHistory(data)
        }
        loadHistory()
    }, [problemId])

    if (history) {
        return <div>
            {history.rows.map(row => <GameHistory row={row} />)}
        </div>
    } else {
        return <div>
            <div className="text-lg p-4">History not found.</div>
        </div>
    }
}