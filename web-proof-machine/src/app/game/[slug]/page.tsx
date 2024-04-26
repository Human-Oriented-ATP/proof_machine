import { loadProblemList } from "src/app/lib/game/LoadProblems";
import { Game } from "src/app/ui/Game";
import { promises as fs } from "fs"
import { buildAst } from "src/app/lib/parsing/Semantics";

export async function generateStaticParams() {
    let problems = await loadProblemList()
    const slugs = problems.map(problem => ({ slug: problem }))
    return slugs
}

export default async function Page({ params }: { params: { slug: string } }) {
    const problemFile = params.slug + ".pl"
    const problemData = await fs.readFile(process.cwd() + "/problems/" + problemFile, "utf-8")

    const initData = buildAst(problemData.trim())

    return <Game initData={initData} />
}