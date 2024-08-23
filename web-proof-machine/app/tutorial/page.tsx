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
    position: { x: -300, y: -50 },
    statement: { axiom: parseAxiom('r(1,A).') }
}

const gadget3: InitialDiagramGadget = {
    position: { x: -300, y: 100 },
    statement: { axiom: parseAxiom('r(A,2).') }
}

const gadget4: InitialDiagramGadget = {
    position: { x: -150, y: 0 },
    statement: { axiom: parseAxiom('r(A,C) :- r(A,B), r(B,C).') }
}

const initialDiagram: InitialDiagram = {
    gadgets: new Map([["goal_gadget", goalGadget], ["gadget2", gadget2], ["gadget3", gadget3], ["gadget4", gadget4]]),
    connections: [{
        from: ["gadget2", -1],
        to: ["gadget4", 0],
    }, {
        from: ["gadget3", -1],
        to: ["gadget4", 1],
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