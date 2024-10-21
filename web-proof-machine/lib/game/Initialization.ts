import { GadgetConnection } from "lib/state/slices/History";
import { Axiom, GadgetId } from "./Primitives";
import { Term, makeTermWithFreshVariables } from "./Term";
import { Equation } from "./Unification";

export type Statement = { axiom: Axiom } | { goal: Term }

export interface ProblemFileData {
    goal: Term
    axioms: Axiom[]
}

export function isGoal(statement: Statement): statement is { goal: Term } {
    return "goal" in statement
}

export function isAxiom(statement: Statement): statement is { axiom: Axiom } {
    return "axiom" in statement
}

export function makeProblemFileDataFromStatements(statements: Statement[]): ProblemFileData {
    const goals = statements.filter(isGoal)
    if (goals.length !== 1) {
        throw new Error(`Expected exactly one goal, found ${goals.length}.`)
    }
    return {
        goal: goals[0].goal,
        axioms: statements.filter(isAxiom).map(statement => statement.axiom)
    }
}

export type InitialDiagramGadget = {
    statement: Statement
    position: { x: number; y: number }
}

export interface InitialDiagram {
    gadgets: Map<GadgetId, InitialDiagramGadget>
    connections: GadgetConnection[]
}

export interface InitializationData {
    initialDiagram: InitialDiagram
    axioms: Axiom[]
}

export function makeInitializationDataFromProblemFileData(problemFileData: ProblemFileData): InitializationData {
    const goalGadget: InitialDiagramGadget = {
        statement: { goal: problemFileData.goal },
        position: { x: 0, y: 0 }
    }
    const initialDiagram = {
        gadgets: new Map([["goal_gadget", goalGadget]]),
        connections: []
    }
    return {
        initialDiagram,
        axioms: problemFileData.axioms
    }
}

export function getEquationFromInitialConnection(connection: GadgetConnection, initialDiagram: InitialDiagram): Equation {
    try {
        const sourceGadget = initialDiagram.gadgets.get(connection.from)!
        const targetGadget = initialDiagram.gadgets.get(connection.to[0])!
        if (isGoal(sourceGadget.statement)) {
            throw new Error("Invalid connection in initial diagram: goal gadget cannot be a source.")
        }
        const sourceTerm = sourceGadget.statement.axiom.conclusion
        const targetTerm = isGoal(targetGadget.statement) ? targetGadget.statement.goal : targetGadget.statement.axiom.hypotheses[connection.to[1]]
        return [makeTermWithFreshVariables(sourceTerm, connection.from!), makeTermWithFreshVariables(targetTerm, connection.to[0]!)]
    } catch (error) {
        throw new Error(`Invalid connection in initial diagram: possibly gadget ${connection.from} or ${connection.to} is missing in the diagram.`)
    }
}