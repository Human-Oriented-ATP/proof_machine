import { StudyConfiguration } from "./Types";
import { promises as fs } from "fs"

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

const path = require('node:path')

export async function loadStudyConfiguration(configurationIdentifier: string): Promise<StudyConfiguration> { 
    const configurationFilePath = path.resolve('study_setup', configurationIdentifier + ".json")
    const configurationFile = await fs.readFile(configurationFilePath, "utf-8")
    const configuration : StudyConfiguration = JSON.parse(configurationFile)
    return configuration
}