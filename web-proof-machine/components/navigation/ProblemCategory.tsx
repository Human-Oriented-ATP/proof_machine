import { GameLevelButton } from "components/primitive/Button";
import { getCompletedProblems } from "lib/study/CompletedProblems";
import { useConfiguration } from "lib/study/LevelConfiguration";
import { ProblemCategory } from "lib/study/Types";
import { usePathname } from "next/navigation";

interface ProblemCategoryProps {
    category: ProblemCategory;
}

export function ProblemCategory(props: ProblemCategoryProps) {
    const completedProblems = getCompletedProblems()

    function getButtonLabel(index: number, problem: string): string {
        const config = useConfiguration()
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

    const currentPath = usePathname()

    return <div className="max-w-3xl">
        <div>
            {props.category.name}
        </div>
        <div className="grid grid-cols-5">
            {props.category.problems.map((problem, index) => {
                return <div className="p-2">
                    <GameLevelButton
                        label={getButtonLabel(index, problem)}
                        href={`${currentPath}/game/${problem}`}
                        isSolved={completedProblems.includes(problem)}
                        isBlocked={false} />
                </div>
            })}
        </div>
    </div>
}