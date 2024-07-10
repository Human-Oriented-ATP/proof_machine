import { ProblemCategoryGrid } from "./ProblemGrid"
import { getConfigFromIdentifier } from "lib/study/LevelConfiguration"
import { StartFirstUnsolvedLevelButton } from "./StartFirstUnsolvedLevelButton"

export function ProblemSelection({ configIdentifier }: { configIdentifier: string }) {
    const config = getConfigFromIdentifier(configIdentifier)

    if (config === null) {
        return <div>Something went wrong! Configuration not found.</div>
    } else {
        return <>
            <div className="p-4">
                <ProblemCategoryGrid categories={config.categories} />
            </div>
            <StartFirstUnsolvedLevelButton />
        </>
    }

}