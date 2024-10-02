"use client"

import { ProblemCategory as ProblemCategoryType, StudyConfiguration } from "lib/study/Types";
import { ProblemCategoryDisplay } from "./ProblemCategory";
import { getProblemList } from "lib/study/LevelConfiguration";
import { loadProblemList } from "lib/game/LoadProblems";
import { useEffect, useState } from "react";

interface ProblemCategoryGridProps {
    config: StudyConfiguration
    categories: ProblemCategoryType[];
}

export function ProblemCategoryGrid(props: ProblemCategoryGridProps) {
    const [allProblemsInFolder, setAllProblems] = useState<string[]>([])

    useEffect(() => {
        loadProblemList().then((problems) => {
            setAllProblems(problems)
        })
    }, [])

    function getUnlistedProblems(): JSX.Element {
        if (props.config.displayUnlistedProblems === true) {
            const allProblemsInConfig = getProblemList(props.config)
            const unlistedProblems = allProblemsInFolder.filter((problem) => !allProblemsInConfig.includes(problem))
            return <ProblemCategoryDisplay config={props.config} category={{ name: "Unlisted Problems", problems: unlistedProblems }} />
        } else {
            return <></>
        }
    }

    return <div className="grid grid-col-1 space-y-12 text-xl justify-center">
        {props.categories.map((problemCategory) => {
            return <ProblemCategoryDisplay config={props.config} key={problemCategory.name} category={problemCategory} />
        })}
        {getUnlistedProblems()}
    </div>;
}
