import '../index.css'
import dynamic from 'next/dynamic'

export function generateStaticParams() {
    return [{ slug: [''] }]
}

const DynamicMainScreen = dynamic(() => import("components/game/StaticDiagram"), { ssr: false })

export default async function Page() {
    return <div></div>
}