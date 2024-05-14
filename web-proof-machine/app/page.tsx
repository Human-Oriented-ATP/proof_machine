import '../index.css'
import { loadProblemList } from '../lib/game/LoadProblems'
import ProblemSelector from '../components/navigation/ProblemSelector'

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page() {
    const problems = await loadProblemList()
    return <ProblemSelector problems={problems} />
}