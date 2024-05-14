'use client'

import { GameLevelButton } from "components/primitive/Button";
import { Problems } from "lib/study/Types";
import { usePathname } from "next/navigation";

function getNextProblem(allProblems: string[], problem: string) {
    const thisProblemIndex = allProblems.indexOf(problem)
    if (thisProblemIndex === -1) {
        return undefined
    }
    return allProblems[thisProblemIndex + 1]
}

export function getNextProblemPath(allProblems: string[], problem: string) {
    const nextPoblem = getNextProblem(allProblems, problem)
    if (nextPoblem === undefined) {
        return ""
    } else {
        return `?next=${nextPoblem}`
    }
}

interface ProblemCategoryProps {
    category: string;
    problems: string[];
    completedProblems: string[];
    allProblems: string[];
}

function ProblemCategory(props: ProblemCategoryProps) {
    const pathName = usePathname()

    return <div className="max-w-xl">
        <div>
            {props.category}
        </div>
        <div className="grid grid-cols-5">
            {props.problems.map((problem, index) => {
                return <div className="p-2">
                    <GameLevelButton
                        label={`${index + 1}`}
                        href={`${pathName}/game/${problem}${getNextProblemPath(props.allProblems, problem)}`}
                        isSolved={props.completedProblems.includes(problem)}
                        isBlocked={false} />
                </div>
            })}
        </div>
    </div>
}

interface ProblemCategoryGridProps {
    problems: Problems;
    completedProblems: string[];
    allProblems: string[];
}

export function ProblemCategoryGrid(props: ProblemCategoryGridProps) {
    return <div className="grid grid-col-1 space-y-12 text-xl justify-center">
        {Object.entries(props.problems).map(([category, problems]) => {
            return <ProblemCategory category={category}
                problems={problems}
                allProblems={props.allProblems}
                completedProblems={props.completedProblems} />
        })}
    </div>;
}
