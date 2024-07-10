import { loadProblemList } from "lib/game/LoadProblems";
import { Game } from "components/game/Game";
import { promises as fs } from "fs"
import { parseProblem } from "lib/parsing/Semantics";
import { Suspense } from "react";

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
        return <Suspense>
            <Game initData={initData} problemId={params.slug} />
        </Suspense>
    } catch (e) {
        return <div>
            <div>Problem file not found or unable to parse.</div>
            <div>{e.message}</div>
        </div>
    }
}