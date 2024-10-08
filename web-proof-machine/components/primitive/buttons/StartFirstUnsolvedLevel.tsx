"use client" 

import Link from "next/link";
import { StudyConfiguration } from "lib/study/Types";
import { getProblemList } from "lib/study/LevelConfiguration";
import { getCompletedProblems } from "lib/study/CompletedProblems";

export function StartButton(props) {
    return <button className="border-2 border-black bg-green rounded-lg p-5 px-10 hover:bg-black hover:text-white text-2xl"
        {...props}>
        Start
    </button>;
}

export default function StartFirstUnsolvedLevelButton({ config }: { config: StudyConfiguration }) {
    const problems = getProblemList(config!);
    const completedProblems = getCompletedProblems();
    const firstUncompletedProblem = problems.find(problem => !completedProblems.includes(problem));

    return <div className="p-12">
        <Link href={`${config.name}/game/${firstUncompletedProblem}`}>
            <StartButton />
        </Link>
    </div>;

}
