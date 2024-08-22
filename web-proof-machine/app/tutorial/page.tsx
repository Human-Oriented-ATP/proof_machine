import { loadProblemList } from "lib/game/LoadProblems";
import { Suspense } from "react";
import { GameScreen } from "components/game/GameScreen";
import { InitialDiagram, InitializationData } from "lib/game/Initialization";
import { parseAxiom, parseTerm } from "lib/parsing/Semantics";

export async function generateStaticParams() {
    let problems = await loadProblemList()
    const slugs = problems.map(problem => ({ slug: problem }))
    return slugs
}

const initialDiagram: InitialDiagram = {
    nodes: [{
        id: "goal_gadget",
        position: { x: 0, y: 0 },
        terms: parseTerm('r(1,2)'),
    }, {
        id: "gadget2",
        position: { x: -100, y: -10 },
        terms: parseAxiom('r(1,2).')
    }],
    edges: [{
        from: ["gadget2", -1],
        to: ["goal_gadget", 0],
    }]
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