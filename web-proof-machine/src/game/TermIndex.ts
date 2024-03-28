import { hash } from '../util/Hash';
import { VariableName, FunctionName, Term } from './Primitives';

export function hashTerm(t: Term): number {
    return hash(JSON.stringify(t))
}

export function substitute(term : Term, v: VariableName, replacement: Term): Term {
    if ("variable" in term) {
        if (v === term.variable) {
            return replacement
        } else {
            return term
        }
    } else {
        return {
            label : term.label,
            args : term.args.map((arg) => substitute(arg, v, replacement))
        }
    }
}

export type TermReference = number

type IndexData =
    | { variable: VariableName }
    | { label: string, args: TermReference[] }

export class TermIndex {
    private index: Map<TermReference, IndexData>

    constructor() {
        this.index = new Map()
    }

    forEachInIndex(callbackfn: (value: IndexData, key: TermReference, map: Map<TermReference, IndexData>) => void, thisArg?: any): void {
        this.index.forEach(callbackfn, thisArg);
    }

    private InvalidReferenceError(ref: TermReference): Error {
        return new Error("Invalid term reference: " + ref)
    }

    private getTermFromIndexData(indexData: IndexData): Term {
        if ("variable" in indexData) {
            return { variable: indexData.variable }
        } else {
            const label = indexData.label
            const args = indexData.args.map(arg => this.getTerm(arg))
            return { label, args }
        }
    }

    private makeNewEntryAt(t: Term, ref: TermReference): void {
        if ("variable" in t) {
            this.index.set(ref, { variable: t.variable })
        } else {
            const label = t.label
            const args = t.args.map(this.addTerm.bind(this))
            this.index.set(ref, { label, args })
        }
    }

    addTerm(t: Term): TermReference {
        let hash = hashTerm(t)
        if (hash in this.index.keys) {
            return hash
        } else {
            this.makeNewEntryAt(t, hash)
            return hash
        }
    }

    protected getHead(ref: TermReference): IndexData {
        const indexData = this.index.get(ref)
        if (indexData) {
            return indexData
        } else {
            throw this.InvalidReferenceError(ref)
        }
    }

    getTerm(ref: TermReference): Term {
        const indexData = this.index.get(ref)
        if (indexData) {
            return this.getTermFromIndexData(indexData)
        } else {
            throw this.InvalidReferenceError(ref)
        }
    }

    hasInIndex(t: Term): boolean {
        return this.index.has(hashTerm(t))
    }

    getTermReference(t: Term): TermReference | undefined {
        if (this.hasInIndex(t)) {
            return hashTerm(t)
        } else {
            return undefined
        }
    }

    termHasVariable(ref: TermReference, v: VariableName): boolean {
        const head = this.getHead(ref)
        if ("variable" in head) {
            return v === head.variable
        } else {
            const appearsInArg = head.args.map(arg => this.termHasVariable(arg, v))
            return appearsInArg.includes(true)
        }
    }

    dump(): any {
        return this.index
    }
}
