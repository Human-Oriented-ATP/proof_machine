import '../../index.css'
import { loadProblemList } from '../lib/game/LoadProblems'
import { ClientOnly } from './client'

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page() {
    const problems = await loadProblemList()
    return <ClientOnly problems={problems} />
}