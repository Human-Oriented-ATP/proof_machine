import { Axiom, GadgetId, NodePosition } from "./Primitives";
import { Term } from "./Term";

export type Goal = Term

export interface InitialDiagramNode {
    id: GadgetId
    terms: Axiom | Goal
    position: { x: number, y: number }
}

export interface InitialDiagramEdge {
    from: [GadgetId, NodePosition]
    to: [GadgetId, NodePosition]
}

export interface InitialDiagram {
    nodes: InitialDiagramNode[]
    edges: InitialDiagramEdge[]
}

export interface InitializationData {
    initialDiagram: InitialDiagram
    axioms: Axiom[]
}

export interface ProblemFileData {
    goal: Term
    axioms: Axiom[]
}

export type Statement = Axiom | { goal: Term }

export function makeProblemFileDataFromStatements(statements: Statement[]): ProblemFileData {
    const goals = statements.filter(stmt => ("goal" in stmt))
    if (goals.length !== 1) {
        throw new Error(`Expected exactly one goal, found ${goals.length}.`)
    }
    return {
        goal: (goals!![0] as { goal: Term }).goal,
        axioms: statements.filter((stmt) => ("conclusion" in stmt)) as Axiom[]
    }
}

export function makeInitializationDataFromProblemFileData(problemFileData: ProblemFileData): InitializationData {
    const goalNode: InitialDiagramNode = {
        id: "goal_gadget",
        terms: problemFileData.goal,
        position: { x: 0, y: 0 }
    }
    const initialDiagram = {
        nodes: [goalNode],
        edges: []
    }
    return {
        initialDiagram,
        axioms: problemFileData.axioms
    }
}
