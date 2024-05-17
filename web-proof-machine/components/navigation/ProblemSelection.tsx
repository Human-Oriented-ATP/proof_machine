import { ProblemCategoryGrid } from "./ProblemGrid"
import { getActiveConfiguration } from "lib/study/LevelConfiguration"
import { StudyConfiguration } from "lib/study/Types"
import { useEffect, useState } from "react"
import { StartFirstUnsolvedLevelButton } from "./StartFirstUnsolvedLevelButton"

export function ProblemSelection() {
    const [config, setConfig] = useState<StudyConfiguration | null>(null)

    useEffect(() => {
        const activeConfiguration = getActiveConfiguration()
        setConfig(activeConfiguration)
    }, [])

    if (config === null) {
        return <div>...loading game...</div>
    } else {

        return <>
            <div className="p-4">
                <ProblemCategoryGrid categories={config.categories} />
            </div>
            <StartFirstUnsolvedLevelButton />
        </>
    }
}