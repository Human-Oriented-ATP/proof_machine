import { loadAllProblemsInDirectory } from 'lib/game/LoadProblems'
import '../../index.css'
import MainScreen from 'components/navigation/MainScreen'

export default async function Page() {
    const allProblems = await loadAllProblemsInDirectory()
    return <MainScreen allProblems={allProblems} />
}