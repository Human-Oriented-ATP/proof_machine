import { loadAllProblemsInDirectory, loadStudyConfiguration } from "lib/game/LoadProblems";
import GameOrQuestionnaireLoader from "components/navigation/GameOrQuestionnaireLoader";

export async function generateStaticParams() {
    let problems = await loadAllProblemsInDirectory()
    const problemIds = problems.map(problem => ({ problem_id: problem }))
    return [...problemIds, "questionnaire1", "questionnaire2"]
}

export const dynamic = 'force-dynamic'

export default async function Page({ params, searchParams }: {
    params: { config: string, problem_id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const redirectTo = Array.isArray(searchParams.redirectTo) ? searchParams.redirectTo[0] : searchParams.redirectTo
    const config = await loadStudyConfiguration(params.config)
    const Loader = await GameOrQuestionnaireLoader({ problemId: params.problem_id, config, redirectTo })
    return Loader
}
