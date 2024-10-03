import Link from "next/link";
import { StudyConfiguration } from "lib/study/Types";
import { cookies } from "next/headers";

export function getProblemList(config: StudyConfiguration): string[] {
    const categories = config.categories
    const problemList = categories.flatMap(category => category.problems)
    return problemList
}

export function StartButton(props) {
    return <button className="border-2 border-black bg-green rounded-lg p-5 px-10 hover:bg-black hover:text-white text-2xl"
        {...props}>
        Start
    </button>;
}

function getCompletedProblems() {
    const completedCookies = cookies().get("completed")
    if (!completedCookies) {
        return []
    } else {
        return completedCookies.toString().split(",")
    }
}

export function StartFirstUnsolvedLevelButton({ config }: { config: StudyConfiguration }) {
    const problems = getProblemList(config!);
    const completedProblems = getCompletedProblems();
    const firstUncompletedProblem = problems.find(problem => !completedProblems.includes(problem));

    return <div className="p-12">
        <Link href={`${config.name}/game/${firstUncompletedProblem}`}>
            <StartButton />
        </Link>
    </div>;

}
