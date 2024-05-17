"use client"

import Link from "next/link"
import Button from "../primitive/Button"
import { resetProgress } from "lib/study/CompletedProblems"

function ProblemSelectionButton({ problem }: { problem: string }): JSX.Element {
    return <div className="m-1.5 inline-block">
        <Link href={"game/" + problem}>
            <Button>{problem}</Button>
        </Link>
    </div>
}

export default function MainScreen({ problems }: { problems: string[] }) {
    return <div className="w-screen text-center pt-10">
        <h1 className="text-2xl p-4">Welcome to the Gadgets Game!</h1>

        <h2 className="text-xl p-4">You might find the following interesting:</h2>
        <div>
            {/* <Button onClick={() => createTable({})}>Create Table</Button> */}
            <div className="m-1.5 inline-block">
                <Link href="pilot1">
                    <Button>Preview Pilot 1</Button>
                </Link>
            </div>
            <div className="m-1.5 inline-block">
                <Button onClick={() => { resetProgress(); alert("Progress in the pilot has been reset.") }}>
                    Reset progress <span className="text-sm">(pilot only)</span></Button>
            </div>
            <div className="m-1.5 inline-block">
                <Link href="view">
                    <Button>View Game History</Button>
                </Link>
            </div>
        </div>

        <h2 className="text-xl p-4">Choose the game you want to play:</h2>
        <div>
            {problems.map(problem => <ProblemSelectionButton problem={problem}></ProblemSelectionButton>)}
        </div>
    </div>
}