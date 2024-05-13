import { HistoryDisplay } from 'components/HistoryDisplay';
import { getPlayerId, retrieveHistory } from 'lib/synchronizeHistory';
import React from 'react';

export const dynamic = "force-dynamic"

export default async function Page({ params }: { params: { slug: string } }) {
    const playerId = await getPlayerId()
    const problemId = "jacob_problem10"
    const history = await retrieveHistory(playerId, problemId)

    if (history) {
        return <div>
            <div className="text-lg p-4">History for problem {problemId} and player {playerId}</div>
            {history.rows.map(row => <HistoryDisplay row={row} />)}
        </div>
    } else {
        return <div>
            <div>History not found.</div>
        </div>
    }
}