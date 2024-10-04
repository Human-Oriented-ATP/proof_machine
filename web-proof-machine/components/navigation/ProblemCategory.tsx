import { GameLevelButton } from "components/primitive/buttons/GameLevel";
import { ProblemCategory, StudyConfiguration } from "lib/study/Types";
import { cookies } from "next/headers";
import { twJoin } from "tailwind-merge";

interface ProblemCategoryProps {
    config: StudyConfiguration
    category: ProblemCategory;
}

function categoryIsUnlocked(category: ProblemCategory, config: StudyConfiguration, completedProblems: string[]): boolean {
    return true
}

function problemIsUnlocked(problem: string, problemLookAhead: number, completedProblems: string[]): boolean {
    return true
}

export function ProblemCategoryDisplay(props: ProblemCategoryProps) {
    const completedProblems: string[] = cookies().get("completedProblems")?.toString().split(",") || []

    function getButtonLabel(index: number, problem: string): string {
        if (props.config.displayNamesAs === "number") {
            return `${index + 1}`
        } else {
            return problem
        }
    }

    const useFlexibleNumberOfColumns = props.config.displayNamesAs !== "number"
    
    const isUnlocked = categoryIsUnlocked(props.category, props.config, completedProblems)

    return <div className="max-w-3xl">
        <div>
            {props.category.name}
        </div>
        <div className={twJoin("grid", useFlexibleNumberOfColumns && "grid-cols-3 md:grid-cols-5", !useFlexibleNumberOfColumns && "grid-cols-5")}>
            {props.category.problems.map((problem, index) => {
                return <div className="p-2" key={problem}>
                    <GameLevelButton
                        label={getButtonLabel(index, problem)}
                        href={`${props.config.name}/game/${problem}`}
                        isSolved={completedProblems.includes(problem)}
                        isUnlocked={isUnlocked && problemIsUnlocked(problem, props.category.problemLookAhead, completedProblems)}
                        config={props.config} />
                </div>
            })}
        </div>
    </div>
}