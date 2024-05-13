import HistorySelector from 'components/HistorySelector';
import { loadProblemList } from 'lib/game/LoadProblems';
import React from 'react';

export default async function Page({ params }: { params: { slug: string } }) {
    const problems = await loadProblemList()
    return <HistorySelector problems={problems} />
}