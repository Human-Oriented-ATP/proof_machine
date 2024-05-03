import { Term, getVariableList, getVariableSet } from "lib/game/Term";
import { Axiom } from "lib/game/Primitives";
import { InitializationData } from "lib/game/Initialization";

export const leanDir: string = "GadgetGameSolver/GadgetGameSolver"

const typeclassName: string = "GadgetProof"

const prelude: string = `set_option trace.Meta.synthInstance true

inductive Term where
| var (name : String)
| app (label : String) (args : List Term)

class ${typeclassName} (t : Term) where

---

`

function termToLean(term: Term): string {
    if ('variable' in term) {
        return term.variable;
    } else {
        return `${term.label} [${term.args.map(termToLean).join(", ")}]`;
    }
}

function termToTypeclassInstance(term: Term): string {
    return `[${typeclassName} (${termToLean(term)})]`;
}

function axiomToTypeclassInstance(axiom: Axiom, instanceName: string): string {
    const freeVars = [...axiom.hypotheses, axiom.conclusion].flatMap(getVariableList);
    const freeVarsDedup = freeVars.filter((value, index, self) => self.indexOf(value) === index);
    return `@[instance] axiom ${instanceName}${freeVarsDedup.length == 0 ? "" : ` {${freeVarsDedup.join(" ")} : Term}`} ${axiom.hypotheses.map(termToTypeclassInstance).join(" ")} : ${typeclassName} (${termToLean(axiom.conclusion)})`;
}

export function initializationDataToLean(init: InitializationData): string {
    return `${prelude}${(init.axioms.map((axiom, idx) => axiomToTypeclassInstance(axiom, `rule_${idx}`)).join("\n\n"))}\n\nnoncomputable example : ${typeclassName} (${termToLean(init.goal)}) :=\n  inferInstance`
}