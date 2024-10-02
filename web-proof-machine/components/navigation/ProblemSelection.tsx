import { ProblemCategoryGrid } from "./ProblemGrid"
import { StartFirstUnsolvedLevelButton } from "../primitive/buttons/StartFirstUnsolvedLevel"
import { StudyConfiguration } from "lib/study/Types"

export function ProblemSelection({ config }: { config: StudyConfiguration }) {
    return <>
        <div className="p-4">
            <ProblemCategoryGrid config={config} categories={config.categories} />
        </div>
        <StartFirstUnsolvedLevelButton />
    </>
}