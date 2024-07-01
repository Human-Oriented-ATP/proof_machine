import { StartButton } from "components/primitive/Button";
import Link from "next/link";
import { getActiveConfiguration, getProblemList } from "lib/study/LevelConfiguration";
import { getCompletedProblems } from "lib/study/CompletedProblems";

export function StartFirstUnsolvedLevelButton() {
    const config = getActiveConfiguration();

    if (config === null) {
        return <></>;
    }

    const problems = getProblemList(config);
    const completedProblems = getCompletedProblems();
    const firstUncompletedProblem = problems.find(problem => !completedProblems.includes(problem));

    if (firstUncompletedProblem === undefined) {
        return <></>;
    } else {
        return <div className="p-12">
            <Link href={`game/${firstUncompletedProblem}`}>
                <StartButton />
            </Link>
        </div>;
    }
}
