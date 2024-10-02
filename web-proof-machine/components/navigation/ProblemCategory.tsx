import { GameLevelButton } from "components/primitive/buttons/GameLevel";
import { getCompletedProblems } from "lib/study/CompletedProblems";
import { ProblemCategory, StudyConfiguration } from "lib/study/Types";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

interface ProblemCategoryProps {
    config: StudyConfiguration
    category: ProblemCategory;
}

export function ProblemCategoryDisplay(props: ProblemCategoryProps) {
    const completedProblems = getCompletedProblems()

    function getButtonLabel(index: number, problem: string): string {
        if (props.config.displayNamesAs === "number") {
            return `${index + 1}`
        } else {
            return problem
        }
    }

    const currentPath = usePathname()

    const useFlexibleNumberOfColumns = props.config.displayNamesAs !== "number"

    console.log(props.config)

    return <div className="max-w-3xl">
        <div>
            {props.category.name}
        </div>
        <div className={twJoin("grid", useFlexibleNumberOfColumns && "grid-cols-3 md:grid-cols-5", !useFlexibleNumberOfColumns && "grid-cols-5")}>
            {props.category.problems.map((problem, index) => {
                return <div className="p-2" key={problem}>
                    <GameLevelButton
                        label={getButtonLabel(index, problem)}
                        href={`${currentPath}/game/${problem}`}
                        isSolved={completedProblems.includes(problem)}
                        isBlocked={false}
                        config={props.config} />
                </div>
            })}
        </div>
    </div>
}