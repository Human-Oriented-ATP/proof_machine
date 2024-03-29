import { AbstractGadgetProps, AbstractGameProps, AbstractNodeProps, Axiom, Color, HolePosition, HoleProps, InternalConnection, NodePosition, ProblemState, Term } from "./Primitives";
import { getIndexFor } from './TermEnumeration';
import { TermUnifier } from "./TermUnifier";

//TODO: Move to `Primitives`
type LocatedNode = { nodePosition: NodePosition, nodeProps: AbstractNodeProps }
type LocatedHole = { holeLocation: HolePosition, holeProps: HoleProps }

function createConnections(locatedTerms: LocatedNode[]): InternalConnection[] {
    const locatedHoles: LocatedHole[] = locatedTerms.flatMap((t, idx) => 
        t.nodeProps.holes.map((hole) => ({
        holeLocation: [t.nodePosition, idx],
        holeProps: hole
    })))
    //TODO: this is a `sorry`
    return [];
}

function translateProblemState(termUnifier: TermUnifier, ps: ProblemState): AbstractGameProps {
    function termToNodeProps(term: Term): AbstractNodeProps {
        if ('variable' in term) {
            throw new Error("The axioms in the problem state cannot be variables.")
        } else {
            return {
                color: term.label as Color,
                holes: term.args.map((arg) => getIndexFor(termUnifier, ps, arg))
            }
        }
    }

    function axiomToGadgetProps(axiom: Axiom): AbstractGadgetProps {
        const inputNodes = axiom.hypotheses.map(termToNodeProps);
        const outputNodes = axiom.conclusions.map(termToNodeProps);
        if (outputNodes.length > 1) {
            throw new Error("An axiom can have at most one conclusion.");
        }

        return {
            inputNodes: inputNodes,
            outputNode: (outputNodes.length === 0) ? undefined : outputNodes[0], 
            connections: createConnections(
                (inputNodes.map((node, idx) => ({
                    nodePosition: idx as NodePosition, 
                    nodeProps: node
                }))).concat(outputNodes.map((node) => ({
                    nodePosition: "output",
                    nodeProps: node
                }))))
        }
    }

    return {
        goal: termToNodeProps(ps.goal),
        axioms: ps.axioms.map(axiomToGadgetProps)
    };
}