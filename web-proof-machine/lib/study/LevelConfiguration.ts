import { StudyConfiguration } from "./Types";

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
