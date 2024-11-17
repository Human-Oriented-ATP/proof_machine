import { getCompletedProblems } from "./CompletedProblems";
import { StudyConfiguration } from "./Types";

function getProblemListWithQuestionnaires(config: StudyConfiguration): string[] {
    const categories = config.categories
    const problemList = categories.flatMap(category => category.problems)
    return problemList
}

export function getProblemList(config: StudyConfiguration): string[] {
    const problems = getProblemListWithQuestionnaires(config)
        .filter(problem => problem !== "questionnaire1" && problem !== "questionnaire2")
    return problems
}

export function getNextProblem(config: StudyConfiguration, currentProblem: string): string | undefined {
    const problemList = getProblemListWithQuestionnaires(config)
    const currentIndex = problemList.indexOf(currentProblem)
    if (currentIndex === -1) {
        return undefined
    } else {
        const nextProblem = problemList[currentIndex + 1]
        return nextProblem
    }
}

export function findFirstUncompletedProblem(config: StudyConfiguration): string | undefined {
    const problems = getProblemList(config!);
    const completedProblems = getCompletedProblems();
    const firstUncompletedProblem = problems.find(problem => !completedProblems.includes(problem));
    return firstUncompletedProblem;
}

