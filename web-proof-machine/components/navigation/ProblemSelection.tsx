import Button from "components/primitive/buttons/Default"
import { StudyConfiguration } from "lib/study/Types"
import dynamic from "next/dynamic"
import Link from "next/link"

const DynamicProblemCategoryGrid = dynamic(() => import("./ProblemGrid"), { ssr: false })
const DynamicStartButton = dynamic(() => import("../primitive/buttons/StartFirstUnsolvedLevel"), { ssr: false })

export function ProblemSelection(props: { config: StudyConfiguration, allProblems: string[] }) {
    return <>
        <div className="p-4 pb-48">
            <DynamicProblemCategoryGrid {...props} />
        </div>
        <div className='fixed bottom-0 flex flex-col items-center w-screen bg-middle-gray p-6'>
            <DynamicStartButton config={props.config} />
        </div>
        {props.config.displayEndParticipationButton && <div className="relative md:fixed bottom-0 left-0 p-2">
            <Link href={`${props.config.name}/game/questionnaire2`}>
                <Button moreClassnames="text-sm">End participation in study</Button>
            </Link >
        </div>
        }
    </>
}