import { loadAllProblemsInDirectory } from 'lib/game/LoadProblems'
import '../../index.css'
import dynamic from 'next/dynamic'

export function generateStaticParams() {
    return [{ slug: [''] }]
}

const DynamicMainScreen = dynamic(() => import("components/navigation/MainScreen"), { ssr: false })

export default async function Page() {
    const allProblems = await loadAllProblemsInDirectory()
    return <DynamicMainScreen allProblems={allProblems} />
}