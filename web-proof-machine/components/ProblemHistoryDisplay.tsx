import { retrieveHistory } from "lib/synchronizeHistory"
import { GameHistoryDisplay } from "./GameHistoryDisplay"
import { useEffect, useState } from "react"
import { QueryResult, QueryResultRow } from "@vercel/postgres"

export default function ProblemHistoryDisplay({ problemId, playerId }) {
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
            {history.rows.map(row => <GameHistoryDisplay row={row} />)}
        </div>
    } else {
        return <div>
            <div className="text-lg p-4">History not found.</div>
        </div>
    }
}