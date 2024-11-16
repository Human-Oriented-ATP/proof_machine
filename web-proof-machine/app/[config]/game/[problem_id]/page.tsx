import { loadAllProblemsInDirectory, loadStudyConfiguration } from "lib/game/LoadProblems";
import { Questionnaire2 } from "components/navigation/Questionnaire2";
import { GameLoader } from "components/game/GameLoader";
import { Questionnaire1 } from "components/navigation/Questionnaire1";
import { hasSubmittedQuestionnaire1, hasSubmittedQuestionnaire2, progressSufficientForQuestionnaire2 } from "lib/study/submitQuestionnaire";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
    let problems = await loadAllProblemsInDirectory()
    const problemIds = problems.map(problem => ({ problem_id: problem }))
    return [...problemIds, "questionnaire1", "questionnaire2"]
}

export default async function Page({ params }: { params: { config: string, problem_id: string } }) {
    const configuration = await loadStudyConfiguration(params.config)
    if (params.problem_id === "questionnaire1") {
        if (await hasSubmittedQuestionnaire1()) {
            redirect("./tim_easy10")
        } else {
            return <Questionnaire1 />
        }
    } else if (params.problem_id === "questionnaire2") {
        if (await hasSubmittedQuestionnaire2()) {
            redirect("../")
        } else {
            return <Questionnaire2 />
        }
    } else {
        //     if (await progressSufficientForQuestionnaire2(configuration)) {
        //         redirect("./questionnaire2")
        //     } else {
        const game = await GameLoader({ problemId: params.problem_id, configId: params.config })
        return game
    }
    // }
}