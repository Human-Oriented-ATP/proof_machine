"use client"

import { ChangeEvent, useState } from "react"
import ProblemHistoryDisplay from "./ProblemHistoryDisplay"

export default function HistorySelector({ playerId, problems }: { playerId: string, problems: string[] }) {
    const [problemId, setProblemId] = useState("")

    function selectProblem(event: ChangeEvent<HTMLSelectElement>): void {
        setProblemId(event.target.value)
    }

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