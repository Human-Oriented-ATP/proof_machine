import '../index.css'
import { loadProblemList } from '../lib/game/LoadProblems'
import MainScreen from '../components/navigation/MainScreen'

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page() {
    const problems = await loadProblemList()
    return <MainScreen problems={problems} />
}