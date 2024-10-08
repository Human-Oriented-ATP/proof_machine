import { StudyConfiguration } from "lib/study/Types"
import dynamic from "next/dynamic"

const DynamicProblemCategoryGrid = dynamic(() => import("./ProblemGrid"), { ssr: false })
const DynamicStartButton = dynamic(() => import("../primitive/buttons/StartFirstUnsolvedLevel"), { ssr: false })

export function ProblemSelection(props: { config: StudyConfiguration, allProblems: string[] }) {
    return <>
        <div className="p-4">
            <DynamicProblemCategoryGrid {...props} />
        </div>
        <DynamicStartButton config={props.config} />
    </>
}