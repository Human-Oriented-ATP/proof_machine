import { loadAllProblemsInDirectory, loadStudyConfiguration } from "lib/game/LoadProblems";
import { promises as fs } from "fs"
import { parseProblemFile } from "lib/parsing/Semantics";
import { Suspense } from "react";
import { makeInitializationDataFromProblemFileData } from "lib/game/Initialization";
import { Game } from "components/game/Game";
import { getNextProblem } from "lib/study/LevelConfiguration";
import { interactiveTutorialLevels } from "components/tutorial/InteractiveTutorialLevels";
import { DEFAULT_SETTINGS } from "components/tutorial/InteractiveLevel";

export async function generateStaticParams() {
    let problems = await loadAllProblemsInDirectory()
    const problemIds = problems.map(problem => ({ problem_id: problem }))
    return problemIds
}

export default async function Page({ params }: { params: { config: string, problem_id: string } }) {
    const configuration = await loadStudyConfiguration(params.config)

    const problemFile = params.problem_id + ".pl"
    const problemData = await fs.readFile(process.cwd() + "/problems/" + problemFile, "utf-8")

    try {
        const problemFileData = parseProblemFile(problemData.trim())
        const { initialDiagram: initialDiagramFromProblemFile, axioms } = makeInitializationDataFromProblemFileData(problemFileData)
        const nextProblem = getNextProblem(configuration, params.problem_id)

        const interactiveLevel = interactiveTutorialLevels.get(params.problem_id)
        const initialDiagramFromTutorialSpecification = interactiveLevel?.initialDiagram
        const settings = interactiveLevel?.settings
        const tutorialSteps = interactiveLevel?.steps
        return <Suspense>
            <Game
                initialDiagram={initialDiagramFromTutorialSpecification ?? initialDiagramFromProblemFile}
                axioms={axioms}
                problemId={params.problem_id}
                nextProblem={nextProblem}
                configurationIdentifier={configuration.name}
                settings={settings ?? DEFAULT_SETTINGS}
                tutorialSteps={tutorialSteps}
            />
        </Suspense>
    } catch (e) {
        return <div>
            <div>Problem file not found or unable to parse.</div>
            <div>{e.message}</div>
        </div>
    }
}