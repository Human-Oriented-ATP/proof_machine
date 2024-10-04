import StudyScreen from "components/navigation/StudyScreen";
import { loadAllProblemsInDirectory, loadStudyConfiguration } from "lib/game/LoadProblems";

export async function generateStaticParams() {
    let configurations = ["pilot1", "pilot2", "new-tutorial"]
    const slugs = configurations.map(problem => ({ config: problem }))
    return slugs
}

export default async function Page({ params }: { params: { config: string } }) {
    const configuration = await loadStudyConfiguration(params.config)
    const allProblems = await loadAllProblemsInDirectory()
    
    return <StudyScreen config={configuration} allProblems={allProblems} />
}