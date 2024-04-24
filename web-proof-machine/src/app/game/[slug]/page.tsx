import { loadProblemList } from "src/app/lib/game/LoadProblems";
import { Game } from "src/app/ui/Game";
import { promises as fs } from "fs"

export async function generateStaticParams() {
    let problems = await loadProblemList()
    const slugs = problems.map(problem => ({ slug: problem }))
    return slugs
}

export default async function Page({ params }: { params: { slug: string } }) {
    const problemFile = params.slug + ".json"
    const problemData = await fs.readFile(process.cwd() + "/problems/" + problemFile, "utf-8")
    const problemJSON = JSON.parse(problemData)

    return <Game problemData={problemJSON} />
}