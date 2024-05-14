import pilotConfig from "../../study_setup/pilot1-config.json"
import { ProblemSelection } from "components/navigation/ProblemSelection"

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page() {
    return <div className="w-screen text-center pt-10">
        <div>
            <h1 className="text-2xl p-8">Welcome to the Gadgets Game!</h1>
            <ProblemSelection config={pilotConfig}></ProblemSelection>
        </div>
    </div>
}