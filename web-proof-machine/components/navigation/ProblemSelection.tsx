"use client"

import { getCompletedProblems } from "lib/study/levelCompleted"
import { useEffect, useState } from "react"
import { ProblemCategoryGrid, getNextProblemPath } from "./ProblemGrid"
import { StartButton } from "components/primitive/Button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { StudyConfiguration } from "lib/study/Types"

interface StartFirstUnvoledLevelButtonProps {
    allProblems: string[],
    completedProblems: string[]
}

function StartFirstUnsolvedLevelButton(props: StartFirstUnvoledLevelButtonProps) {
    const pathName = usePathname()

    const firstUncompletedProblem = props.allProblems.find(problem => !props.completedProblems.includes(problem))
    if (firstUncompletedProblem === undefined) {
        return <></>
    } else {
        const nextProblemPath = getNextProblemPath(props.allProblems, firstUncompletedProblem)
        return <div className="p-12">
            <Link href={`${pathName}/game/${firstUncompletedProblem}${nextProblemPath}`}>
                <StartButton />
            </Link>
        </div>
    }
}

export function ProblemSelection({ config }: { config: StudyConfiguration }) {
    const [completedProblemsString, setCompletedProblems] = useState<string>("")

    useEffect(() => {
        async function loadProblems() {
            const completedProblems = await getCompletedProblems()
            setCompletedProblems(completedProblems)
        }
        loadProblems()
    }, [])

    const completedProblems = completedProblemsString.split(",")
    const allProblems = Object.values(config.problems).flat()

    return <>
        <div className="p-4">
            <ProblemCategoryGrid problems={config.problems} allProblems={allProblems} completedProblems={completedProblems} />
        </div>
        <StartFirstUnsolvedLevelButton allProblems={allProblems} completedProblems={completedProblems} />
    </>
}
