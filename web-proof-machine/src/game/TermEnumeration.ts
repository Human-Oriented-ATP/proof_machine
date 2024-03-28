import { Term, Axiom, ProblemState } from './Primitives';
import { TermUnifier } from './TermUnifier';

function isNumericalConstant(t : Term): number | undefined  {
    if("variable" in t) {
        return undefined;
    } else {
        if (isNaN(Number(t.label)) || t.args.length > 0) {
            return undefined;
        } else {
            return Number(t.label);
        }
    }
}

function getNumericalConstantsInTerm(t : Term): number[] {
    const n = isNumericalConstant(t)
    if (n === undefined) {
        if ("variable" in t) {
            return [];
        } else {
            return t.args.flatMap(getNumericalConstantsInTerm);
        }
    } else {
        return [n];
    }
}

function getNumericalConstantsInAxiom(axiom: Axiom): number[] {
    return axiom.hypotheses.flatMap(getNumericalConstantsInTerm)
    .concat(axiom.conclusions.flatMap(getNumericalConstantsInTerm));
}

function getNumericalConstantsInProblemState(ps: ProblemState): number[] {
    return ps.axioms.flatMap(getNumericalConstantsInAxiom)
    .concat(getNumericalConstantsInTerm(ps.goal));
}

// TODO: Get the `TermUnifier` out of the list of arguments
function getIndexFor(termUnifier: TermUnifier, ps: ProblemState, term: Term): number {
    const constIndices = getNumericalConstantsInProblemState(ps);
    const n = isNumericalConstant(term);
    if (n === undefined) {
        return termUnifier.getTermEnumerationIndex(term, 1 + Math.max(...constIndices))!;
    } else {
        return n;
    }
}