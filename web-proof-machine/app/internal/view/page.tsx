import HistorySelector from 'components/history/HistorySelector';
import { loadAllProblemsInDirectory } from 'lib/game/LoadProblems';
import React from 'react';

export default async function Page({ params }: { params: { slug: string } }) {
    const problems = await loadAllProblemsInDirectory()
    return <HistorySelector problems={problems} />
}