import dynamic from "next/dynamic"

export function generateStaticParams() {
    return [{ slug: [''] }]
}

const DynamicStudyScreen = dynamic(() => import("components/navigation/StudyScreen"), { ssr: false })

export default function Page() {
    return <DynamicStudyScreen config="pilot1" />
}