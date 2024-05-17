import { StudyScreen } from "components/navigation/StudyScreen"

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default function Page() {
    return <StudyScreen config="pilot1" />
}