'use client'

import { GameLevelButton } from "components/primitive/Button";
import { getCompletedProblems } from "lib/study/levelCompleted";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ProblemCategoryProps {
    category: string;
    problems: string[];
    completedProblems: string[];
    allProblems: string[];
}

function getNextProblem(allProblems: string[], problem: string) {
    const thisProblemIndex = allProblems.indexOf(problem)
    if (thisProblemIndex === -1) {
        return undefined
    }
    return allProblems[thisProblemIndex + 1]
}

function getNextProblemPath(allProblems: string[], problem: string) {
    const nextPoblem = getNextProblem(allProblems, problem)
    if (nextPoblem === undefined) {
        return ""
    } else {
        return `?next=${nextPoblem}`
    }
}

function ProblemCategory(props: ProblemCategoryProps) {
    const pathName = usePathname()

    return <div className="max-w-xl">
        <div>
            {props.category}
        </div>
        <div className="grid grid-cols-5">
            {props.problems.map((problem, index) => {
                const nextProblem = getNextProblem(props.allProblems, problem)

                return <div className="p-2">
                    <GameLevelButton
                        label={index + 1}
                        href={`${pathName}/game/${problem}${getNextProblemPath(props.allProblems, problem)}`}
                        isSolved={props.completedProblems.includes(problem)}
                        isBlocked={false} />
                </div>
            })}
        </div>
    </div>
}

export function ProblemGrid(props: any) {
    const [completedProblemsString, setCompletedProblems] = useState<string>("")

    useEffect(() => {
        async function loadProblems() {
            const completedProblems = await getCompletedProblems()
            setCompletedProblems(completedProblems)
        }
        loadProblems()
    }, [])

    const completedProblems = completedProblemsString.split(",")
    const allProblems = Object.values(props.problems).flat()

    return <div className="grid grid-col-1 space-y-12 text-xl justify-center">
        {Object.entries(props.problems).map(([category, problems]) => {
            return <ProblemCategory category={category} problems={problems} allProblems={allProblems} completedProblems={completedProblems} />
        })}
    </div>;
}
