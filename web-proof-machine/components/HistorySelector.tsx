"use client"

import { ChangeEvent, useEffect, useState } from "react"
import ProblemHistoryDisplay from "./ProblemHistoryDisplay"
import { getPlayerId } from "lib/synchronizeHistory"

export default function HistorySelector({ problems }: { problems: string[] }) {
    const [playerId, setPlayerId] = useState("")
    const [problemId, setProblemId] = useState("")

    function selectProblem(event: ChangeEvent<HTMLSelectElement>): void {
        setProblemId(event.target.value)
    }

    useEffect(() => {
        async function loadPlayerId() {
            const id = await getPlayerId()
            setPlayerId(id)
        }
        loadPlayerId()
    }, [])

    return <div>
        <div className="p-4 text-lg">Displaying history for player with id {playerId}</div>
        <div className="p-4 text-lg">Choose a problem:
            <select className="p-2 bg-white" onChange={selectProblem}>
                {problems.map((problem, index) => <option key={index} value={problem}>{problem}</option>)}
            </select>
        </div>
        <ProblemHistoryDisplay playerId={playerId} problemId={problemId} />
    </div>
}