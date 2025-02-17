import { Questionnaire2 } from "components/navigation/Questionnaire2";
import { GameLoader } from "components/game/GameLoader";
import Questionnaire1 from "components/navigation/Questionnaire1";
import { progressSufficientForQuestionnaire2 } from "lib/study/submitQuestionnaire";
import { StudyConfiguration } from "lib/study/Types";
import { redirect } from "next/navigation";

export default async function GameOrQuestionnaireLoader({ problemId, config }:
  { problemId: string, config: StudyConfiguration }) {
  if (problemId === "questionnaire1") {
    return <Questionnaire1 redirectTo="./tutorial01" />
  } else if (problemId === "questionnaire2") {
    return <Questionnaire2 redirectTo={"../thanks"} />
  } else {
    // if (await progressSufficientForQuestionnaire2(config)) {
    //     redirect("./questionnaire2")
    // }
    const game = await GameLoader({ problemId, configId: config.name })
    return game
  }
}