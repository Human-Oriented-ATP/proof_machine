"use client"

import Link from "next/link"
import Button from "./Button"
import { createTable } from "lib/synchronizeHistory"

interface ProblemSelectionPaneProps {
    problems: string[]
}

function ProblemSelectionPane(props: ProblemSelectionPaneProps) {
    function makeProblemSelectionButton(name: string): JSX.Element {
        return <Link href={"game/" + name}>
            <Button>{name}</Button>
        </Link>
    }

    return <div className="w-screen text-center pt-24">
        <h2 className="text-xl">Choose the game you want to play:</h2>
        <div>
            {props.problems.map(makeProblemSelectionButton)}
        </div>
    </div>
}

interface ProblemSelectorProps {
    problems: string[]
}

export default function ProblemSelector(props: ProblemSelectorProps) {
    return <>
        <ProblemSelectionPane problems={props.problems}></ProblemSelectionPane>
        <Button onClick={() => createTable({})}>Create Table</Button>
    </>
}