import { StudyConfiguration } from "./Types";

import pilot1 from "study_setup/pilot1.json"
import allProblems from "study_setup/all-problems.json"
import { usePathname } from "next/navigation";

export function useConfigurationIdentifier(): string {
    const pathname = usePathname()
    const segments = pathname.split("/")
    return segments[1]
}

export function getConfigFromIdentifier(configIdentifier: string): StudyConfiguration | null {
    switch (configIdentifier) {
        case "pilot1":
            return pilot1
        case "internal":
            return allProblems
    }
    return null
}

export function useConfiguration(): StudyConfiguration | null {
    const configIdentifier = useConfigurationIdentifier()
    if (configIdentifier) {
        return getConfigFromIdentifier(configIdentifier)
    } else {
        return null
    }
}

export function getProblemList(config: StudyConfiguration): string[] {
    const categories = config.categories
    const problemList = categories.flatMap(category => category.problems)
    return problemList
}

export function getNextProblem(config: StudyConfiguration, currentProblem: string): string | undefined {
    const problemList = getProblemList(config)
    const currentIndex = problemList.indexOf(currentProblem)
    if (currentIndex === -1) {
        return undefined
    } else {
        const nextProblem = problemList[currentIndex + 1]
        return nextProblem
    }
}
