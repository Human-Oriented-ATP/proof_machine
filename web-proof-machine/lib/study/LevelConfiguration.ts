import { StudyConfiguration } from "./Types";

import pilot1 from "study_setup/pilot1.json"
import allProblems from "study_setup/all-problems.json"
import { clientSideCookies } from "lib/util/ClientSideCookies";

export function setConfiguration(configString: string): void {
    clientSideCookies.set("config", configString, 365)
}

export function getActiveConfigurationIdentifier(): string | null {
    const config = clientSideCookies.get("config")
    return config
}

export function getConfigFromIdentifier(configIdentifier: string): StudyConfiguration | null {
    switch (configIdentifier) {
        case "pilot1":
            return pilot1
        case "all-problems":
            return allProblems
    }
    return null
}

export function getActiveConfiguration(): StudyConfiguration | null {
    const configIdentifier = getActiveConfigurationIdentifier()
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
