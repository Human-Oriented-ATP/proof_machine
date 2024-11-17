import { Questionnaire2 } from "components/navigation/Questionnaire2";
import { GameLoader } from "components/game/GameLoader";
import Questionnaire1 from "components/navigation/Questionnaire1";
import { progressSufficientForQuestionnaire2 } from "lib/study/submitQuestionnaire";
import { StudyConfiguration } from "lib/study/Types";
import { redirect } from "next/navigation";

export default async function GameOrQuestionnaireLoader({ problemId, config, redirectTo }:
    { problemId: string, config: StudyConfiguration, redirectTo: string | undefined }) {
    if (problemId === "questionnaire1") {
        return <Questionnaire1 redirectTo="./tim_easy10" />
    } else if (problemId === "questionnaire2") {
        const redirectHref = redirectTo || "../"
        return <Questionnaire2 redirectTo={redirectHref} />
    } else {
        if (await progressSufficientForQuestionnaire2(config)) {
            redirect("./questionnaire2?redirectTo=" + problemId)
        }
        const game = await GameLoader({ problemId, configId: config.name })
        return game
    }
}