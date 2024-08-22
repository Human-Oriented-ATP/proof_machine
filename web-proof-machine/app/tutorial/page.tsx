import { loadProblemList } from "lib/game/LoadProblems";
import { Suspense } from "react";
import { GameScreen } from "components/game/GameScreen";
import { InitialDiagram, InitializationData } from "lib/game/Initialization";

export async function generateStaticParams() {
    let problems = await loadProblemList()
    const slugs = problems.map(problem => ({ slug: problem }))
    return slugs
}

// want to be able to write parseTerm('r(1)')
const initialDiagram: InitialDiagram = {
    nodes: [{
        id: "goal_gadget",
        position: { x: 0, y: 0 },
        terms: { label: "r", args: [{ label: '1', args: [] }] },
    }],
    edges: []
}

const initData: InitializationData = {
    initialDiagram: initialDiagram,
    axioms: []
}

export default async function Page({ params }: { params: { slug: string } }) {
    try {
        return <Suspense>
            <GameScreen initData={initData} problemId={params.slug} />
        </Suspense>
    } catch (e) {
        return <div>
            <div>Problem file not found or unable to parse.</div>
            <div>{e.message}</div>
        </div>
    }
}