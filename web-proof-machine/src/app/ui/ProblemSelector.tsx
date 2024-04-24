"use client"

import Link from "next/link"

interface ProblemSelectionPaneProps {
    problems: string[]
}

function ProblemSelectionPane(props: ProblemSelectionPaneProps) {
    function makeProblemSelectionButton(name: string): JSX.Element {
        return <Link href={"game/" + name}>
            <button>{name}</button>
        </Link>
    }

    return <div className="problemSelectionPane">
        <h2>Choose the game you want to play:</h2>
        <div className="problemSelectionButtons">
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