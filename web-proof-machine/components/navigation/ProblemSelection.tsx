import { ProblemCategoryGrid } from "./ProblemGrid"
import { StartFirstUnsolvedLevelButton } from "../primitive/buttons/StartFirstUnsolvedLevel"
import { StudyConfiguration } from "lib/study/Types"

export function ProblemSelection(props: { config: StudyConfiguration, allProblems: string[] }) {
    return <>
        <div className="p-4">
            <ProblemCategoryGrid {...props} />
        </div>
        <StartFirstUnsolvedLevelButton config={props.config} />
    </>
}