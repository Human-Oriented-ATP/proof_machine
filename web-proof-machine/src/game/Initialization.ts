import { Axiom } from "./Primitives";
import { Term } from "./Term";

export interface InitializationData {
    goal: Term
    axioms: Axiom[]
}

export type Statement = Axiom | { goal : Term }

export function makeIntializationDataFromStatements(statements: Statement[]): InitializationData {
    const goals = statements.filter(stmt => ("goal" in stmt))
    if (goals.length !== 1) {
        throw new Error("Expected exactly one goal.")
    }
    return {
        goal: (goals!![0] as { goal : Term }).goal,
        axioms: statements.filter((stmt) => ("conclusion" in stmt)) as Axiom[]
    }
}

function makeTermFromJSONObject(jsonObject: any): Term {
    if ("var" in jsonObject) {
        const name = jsonObject.var
        return { variable: name }
    } else if ("label" in jsonObject && "args" in jsonObject) {
        const args = jsonObject.args.map(makeTermFromJSONObject)
        return { label: jsonObject.label, args }
    } else {
        throw Error("Error parsing JSON")
    }
}

function makeAxiomFromJSONObject(jsonObject: any): Axiom {
    const inputs = jsonObject.hypotheses.map(makeTermFromJSONObject)
    const output = makeTermFromJSONObject(jsonObject.targets[0])
    return { hypotheses: inputs, conclusion: output }
}

function makeAxiomsFromJSONObject(json: any): Axiom[] {
    const axiomsJSON = json.axioms
    const axioms = axiomsJSON.map(makeAxiomFromJSONObject)
    return axioms
}

function makeGoalFromJSONObject(json: any): Term {
    const goalJSON = json.goal
    const term = makeTermFromJSONObject(goalJSON)
    return term
}

export function initializeGame(json: any): InitializationData {
    const goal = makeGoalFromJSONObject(json)
    const axioms = makeAxiomsFromJSONObject(json)
    return { goal, axioms }
}