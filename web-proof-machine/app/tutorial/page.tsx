import { loadProblemList } from "lib/game/LoadProblems";
import { Suspense } from "react";
import { GameScreen } from "components/game/GameScreen";
import { InitialDiagram, InitialDiagramGadget, InitializationData } from "lib/game/Initialization";
import { parseAxiom, parseTerm } from "lib/parsing/Semantics";

export async function generateStaticParams() {
    let problems = await loadProblemList()
    const slugs = problems.map(problem => ({ slug: problem }))
    return slugs
}

const goalGadget: InitialDiagramGadget = {
    position: { x: 0, y: 0 },
    statement: { goal: parseTerm('r(1,2)') },
}

const gadget2: InitialDiagramGadget = {
    position: { x: -100, y: -10 },
    statement: { axiom: parseAxiom('r(1,2).') }
}

const initialDiagram: InitialDiagram = {
    gadgets: new Map([["goal_gadget", goalGadget], ["gadget2", gadget2]]),
    connections: [{
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