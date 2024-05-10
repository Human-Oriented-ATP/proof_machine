import { HistoryDisplay } from 'components/HistoryDisplay';
import { retrieveHistory } from 'lib/synchronizeHistory';
import React from 'react';

export default async function Page({ params }: { params: { slug: string } }) {
    const playerId = "0v51202bkcrl"
    const problemId = "jacob_problem10"
    const history = await retrieveHistory(playerId, problemId)

    if (history) {
        return <div>
            <div className="text-lg p-4">History</div>
            {history.rows.map(row => <HistoryDisplay row={row} />)}
        </div>
    } else {
        return <div>
            <div>History not found.</div>
        </div>
    }
}