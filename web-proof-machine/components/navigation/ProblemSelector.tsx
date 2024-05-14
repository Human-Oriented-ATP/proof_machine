"use client"

import Link from "next/link"
import Button from "../primitive/Button"

interface ProblemSelectionPaneProps {
    problems: string[]
}

function ProblemSelectionPane(props: ProblemSelectionPaneProps) {
    function makeProblemSelectionButton(name: string): JSX.Element {
        return <Link href={"game/" + name}>
            <Button>{name}</Button>
        </Link>
    }

    return <div className="w-screen text-center pt-10">
        <h1 className="text-2xl p-4">Welcome to the Gadgets Game!</h1>
        <h2 className="text-xl p-4">You might find the following interesting:</h2>
        <Link href="pilot1">
            <Button>Preview Pilot 1</Button>
        </Link>
        <Link href="view">
            <Button>View Game History</Button>
        </Link>
        <h2 className="text-xl p-4">Choose the game you want to play:</h2>
        <div>
            {props.problems.map(makeProblemSelectionButton)}
        </div>
    </div>
}

interface ProblemSelectorProps {
    problems: string[]
}

export default function ProblemSelector(props: ProblemSelectorProps) {
    return <ProblemSelectionPane problems={props.problems}></ProblemSelectionPane>
}