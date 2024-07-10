import { StartButton } from "components/primitive/Button";
import Link from "next/link";
import { useConfiguration, getProblemList } from "lib/study/LevelConfiguration";
import { getCompletedProblems } from "lib/study/CompletedProblems";
import { usePathname } from "next/navigation";

export function StartFirstUnsolvedLevelButton() {
    try {
        const config = useConfiguration();
        const problems = getProblemList(config!);
        const completedProblems = getCompletedProblems();
        const firstUncompletedProblem = problems.find(problem => !completedProblems.includes(problem));

        const currentPath = usePathname()
        return <div className="p-12">
            <Link href={`${currentPath}/game/${firstUncompletedProblem}`}>
                <StartButton />
            </Link>
        </div>;

    } catch (e) {
        return <></>
    }
}
