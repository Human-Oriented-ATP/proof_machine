"use client"

import { ProblemCategory as ProblemCategoryType } from "lib/study/Types";
import { ProblemCategory } from "./ProblemCategory";
import { getActiveConfiguration, getProblemList } from "lib/study/LevelConfiguration";
import { loadProblemList } from "lib/game/LoadProblems";
import { useEffect, useState } from "react";

interface ProblemCategoryGridProps {
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
        const config = getActiveConfiguration()
        if (config === null) {
            return <></>
        } else {
            if (config.displayUnlistedProblems === true) {
                const allProblemsInConfig = getProblemList(config)
                const unlistedProblems = allProblemsInFolder.filter((problem) => !allProblemsInConfig.includes(problem))
                return <ProblemCategory category={{ name: "Unlisted Problems", problems: unlistedProblems }} />
            } else {
                return <></>
            }
        }
    }

    return <div className="grid grid-col-1 space-y-12 text-xl justify-center">
        {props.categories.map((problemCategory) => {
            return <ProblemCategory category={problemCategory} />
        })}
        {getUnlistedProblems()}
    </div>;
}
