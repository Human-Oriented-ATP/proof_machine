import { loadProblemList } from "lib/game/LoadProblems";
import { Game } from "components/Game";
import { promises as fs } from "fs"
import { parseProblem } from "lib/parsing/Semantics";

export async function generateStaticParams() {
    let problems = await loadProblemList()
    const slugs = problems.map(problem => ({ slug: problem }))
    return slugs
}

export default async function Page({ params }: { params: { slug: string } }) {
    const problemFile = params.slug + ".pl"
    const problemData = await fs.readFile(process.cwd() + "/problems/" + problemFile, "utf-8")

    try {
        const initData = parseProblem(problemData.trim())
        return <Game initData={initData} problemId={params.slug} />
    } catch (e) {
        return <div>
            <div>The problem file couldn't be parsed.</div>
            <div>{e.message}</div>
        </div>
    }
}