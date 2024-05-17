import { GameLevelButton } from "components/primitive/Button";
import { getCompletedProblems } from "lib/study/CompletedProblems";
import { ProblemCategory } from "lib/study/Types";

interface ProblemCategoryProps {
    category: ProblemCategory;
}

export function ProblemCategory(props: ProblemCategoryProps) {
    const completedProblems = getCompletedProblems()

    return <div className="max-w-xl">
        <div>
            {props.category.name}
        </div>
        <div className="grid grid-cols-5">
            {props.category.problems.map((problem, index) => {
                return <div className="p-2">
                    <GameLevelButton
                        label={`${index + 1}`}
                        href={`game/${problem}`}
                        isSolved={completedProblems.includes(problem)}
                        isBlocked={false} />
                </div>
            })}
        </div>
    </div>
}