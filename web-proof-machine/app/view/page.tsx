import HistorySelector from 'components/HistorySelector';
import { loadProblemList } from 'lib/game/LoadProblems';
import { getPlayerId } from 'lib/synchronizeHistory';
import React from 'react';

export const dynamic = "force-dynamic"

export default async function Page({ params }: { params: { slug: string } }) {
    const playerId = await getPlayerId()
    const problems = await loadProblemList()

    return <HistorySelector playerId={playerId} problems={problems} />
}