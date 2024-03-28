import { DisjointSet } from "./DisjointSet";

export class DisjointSetWithAssignment<T, S> extends DisjointSet<T> {
    private assignments: Map<T, S>;

    constructor() {
        super()
        this.assignments = new Map()
    }

    assign(t: T, value: S) {
        const representative = this.findRepresentative(t)
        this.assignments.set(representative, value)
    }

    getAssignedValue(t: T): S | undefined {
        const representative = this.findRepresentative(t)
        return this.assignments.get(representative)
    }

    isAssigned(t: T): boolean {
        const representative = this.findRepresentative(t)
        return this.assignments.has(representative)
    }

    forEachAssignment(callbackfn: (value: S, key: T, map: Map<T, S>) => void, thisArg?: any): void {
        this.assignments.forEach(callbackfn, thisArg);
    }

}
