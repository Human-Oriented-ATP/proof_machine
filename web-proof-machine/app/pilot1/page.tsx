import { StartButton } from "components/primitive/Button"
import pilotConfig from "../../study_setup/pilot1-config.json"
import { ProblemGrid } from "../../components/navigation/ProblemGrid"

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page() {
    return <div className="w-screen text-center pt-10">
        <div>
            <h1 className="text-2xl p-8">Welcome to the Gadgets Game!</h1>
            <div className="p-4">
                <ProblemGrid {...pilotConfig} />
            </div>
            <div className="p-12 bg-white">
                <StartButton>Start</StartButton>
            </div>
        </div>
    </div>
}