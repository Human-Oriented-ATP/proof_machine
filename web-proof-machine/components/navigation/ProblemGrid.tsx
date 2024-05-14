'use client'

import { GameLevelButton } from "components/primitive/Button";
import { usePathname } from "next/navigation";

interface ProblemCategoryProps {
    category: string;
    problems: any;
}

function isCompleted(problem: string): boolean {
    return true
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
                    <GameLevelButton label={index + 1} href={`${pathName}/game/${problem}?next=0trivial`} isSolved={false} isBlocked={false} />
                </div>
            })}
        </div>
    </div>
}

export function ProblemGrid(props: any) {
    return <div className="grid grid-col-1 space-y-12 text-xl justify-center">
        {Object.entries(props.problems).map(([category, problems]) => {
            return <ProblemCategory category={category} problems={problems} />
        })}
    </div>;
}
