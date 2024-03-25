import { hash } from '../util/Hash';

type VariableName = string
type FunctionName = string

export type Term =
    | { variable: VariableName }
    | { label: FunctionName, args: Term[] }

function hashTerm(t: Term): number {
    return hash(JSON.stringify(t))
}

type TermReference = number

type IndexData =
    | { variable: VariableName }
    | { label: string, args: TermReference[] }

export class TermIndex {
    index: Map<TermReference, IndexData>;

    constructor() {
        this.index = new Map()
    }

    getTermFromIndexData(indexData: IndexData): Term {
        if ("variable" in indexData) {
            return { variable: indexData.variable }
        } else {
            const label = indexData.label
            const args = indexData.args.map(this.getTerm)
            return { label, args }
        }
    }

    getTerm(ref: TermReference): Term {
        const indexData = this.index.get(ref)
        if (indexData) {
            return this.getTermFromIndexData(indexData)
        } else {
            throw Error("Invalid reference:" + ref)
        }
    }

    hasInIndex(t: Term): boolean {
        return hashTerm(t) in this.index
    }

    static makeNewEntryAt(termIndex: TermIndex, t: Term, ref: TermReference): void {
        if ("variable" in t) {
            termIndex.index.set(ref, { variable: t.variable })
        } else {
            const label = t.label
            const args = t.args.map((term) => TermIndex.addTermToIndex(termIndex, term))
            termIndex.index.set(ref, { label, args })
        }
    }

    static addTermToIndex(termIndex: TermIndex, t: Term): TermReference {
        console.log(t)
        let hash = hashTerm(t)
        if (hash in termIndex.index.keys) {
            return hash
        } else {
            TermIndex.makeNewEntryAt(termIndex, t, hash)
            return hash
        }
    }

    addTerm(t: Term): TermReference {
        return TermIndex.addTermToIndex(this, t)
    }

    dump(): any {
        return this.index
    }
}
