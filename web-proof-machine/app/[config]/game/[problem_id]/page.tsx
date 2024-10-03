import { loadAllProblemsInDirectory } from "lib/game/LoadProblems";
import { promises as fs } from "fs"
import { parseProblem } from "lib/parsing/Semantics";
import { Suspense } from "react";
import { GameScreen } from "components/game/GameScreen";
import { makeInitializationDataFromProblemFileData } from "lib/game/Initialization";
import { StudyConfiguration } from "lib/study/Types";

export async function generateStaticParams() {
    let problems = await loadAllProblemsInDirectory()
    const problemIds = problems.map(problem => ({ problem_id: problem }))
    return problemIds
}

export default async function Page({ params }: { params: { config: string, problem_id: string } }) {
    const configuration : StudyConfiguration = JSON.parse(await fs.readFile(process.cwd() + "/study_setup/" + params.config + ".json", "utf-8"))

    const problemFile = params.problem_id + ".pl"
    const problemData = await fs.readFile(process.cwd() + "/problems/" + problemFile, "utf-8")

    try {
        const problemFileData = parseProblem(problemData.trim())
        const initData = makeInitializationDataFromProblemFileData(problemFileData)
        return <Suspense>
            <GameScreen configuration={configuration} initData={initData} problemId={params.problem_id} />
        </Suspense>
    } catch (e) {
        return <div>
            <div>Problem file not found or unable to parse.</div>
            <div>{e.message}</div>
        </div>
    }
}