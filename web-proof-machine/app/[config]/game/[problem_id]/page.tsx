import { loadAllProblemsInDirectory } from "lib/game/LoadProblems";
import { Questionnaire2 } from "components/navigation/Questionnaire2";
import { GameLoader } from "components/game/GameLoader";
import Questionnaire1 from "components/navigation/Questionnaire1";

export async function generateStaticParams() {
    let problems = await loadAllProblemsInDirectory()
    const problemIds = problems.map(problem => ({ problem_id: problem }))
    return [...problemIds, "questionnaire1", "questionnaire2"]
}

export default async function Page({ params }: { params: { config: string, problem_id: string } }) {
    if (params.problem_id === "questionnaire1") {
        return <Questionnaire1 redirectTo="./tim_easy10" />
    } else if (params.problem_id === "questionnaire2") {
        return <Questionnaire2 />
    } else {
        const game = await GameLoader({ problemId: params.problem_id, configId: params.config })
        return game
    }
}