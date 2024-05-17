import { GameLevelButton } from "components/primitive/Button";
import { getCompletedProblems } from "lib/study/CompletedProblems";
import { getActiveConfiguration } from "lib/study/LevelConfiguration";
import { ProblemCategory } from "lib/study/Types";

interface ProblemCategoryProps {
    category: ProblemCategory;
}

export function ProblemCategory(props: ProblemCategoryProps) {
    const completedProblems = getCompletedProblems()

    function getButtonLabel(index: number, problem: string): string {
        const config = getActiveConfiguration()
        if (config === null) {
            return `${index + 1}`
        } else {
            if (config.displayNamesAs === "number") {
                return `${index + 1}`
            } else {
                return problem
            }
        }
    }

    return <div className="max-w-3xl">
        <div>
            {props.category.name}
        </div>
        <div className="grid grid-cols-5">
            {props.category.problems.map((problem, index) => {
                return <div className="p-2">
                    <GameLevelButton
                        label={getButtonLabel(index, problem)}
                        href={`game/${problem}`}
                        isSolved={completedProblems.includes(problem)}
                        isBlocked={false} />
                </div>
            })}
        </div>
    </div>
}