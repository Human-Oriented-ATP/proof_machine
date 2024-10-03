import { StudyConfiguration } from "lib/study/Types";
import { ProblemCategoryDisplay } from "./ProblemCategory";

export function getProblemList(config: StudyConfiguration): string[] {
    const categories = config.categories
    const problemList = categories.flatMap(category => category.problems)
    return problemList
}

function getUnlistedProblems(config: StudyConfiguration, allProblems: string[]): JSX.Element {
    if (config.displayUnlistedProblems === true) {
        const allProblemsInConfig = getProblemList(config)
        const unlistedProblems = allProblems.filter((problem) => !allProblemsInConfig.includes(problem))
        return <ProblemCategoryDisplay config={config} category={{ name: "Unlisted Problems", problems: unlistedProblems }} />
    } else {
        return <></>
    }
}

export function ProblemCategoryGrid(props: { config: StudyConfiguration, allProblems: string[] }) {
    return <div className="grid grid-col-1 space-y-12 text-xl justify-center">
        {props.config.categories.map((problemCategory) => {
            return <ProblemCategoryDisplay config={props.config} key={problemCategory.name} category={problemCategory} />
        })}
        {getUnlistedProblems(props.config, props.allProblems)}
    </div>;
}
