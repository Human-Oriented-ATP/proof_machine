export class DisjointSetWithAssignment<T, S> {
    private parent: Map<T, T>
    private rank: Map<T, number>
    private assignments: Map<T, S>

    constructor() {
        this.parent = new Map()
        this.rank = new Map()
        this.assignments = new Map()
    }

    private makeSet(x: T): void {
        this.parent.set(x, x)
        this.rank.set(x, 0)
    }

    private performPathCompression(x: T) {
        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.findRepresentative(this.parent.get(x)!));
        }
    }

    findRepresentative(x: T): T {
        if (!this.parent.has(x)) {
            this.makeSet(x)
        }
        this.performPathCompression(x)
        return this.parent.get(x)!;
    }

    getAllValues(): T[] {
        return Array.from(this.parent.keys())
    }

    valueToBeAssigned(s1: S | undefined, s2: S | undefined) {
        if (s1 === undefined) {
            return s2
        } else {
            return s1
        }
    }

    setIfNotUndefined(key: T, value: S | undefined) {
        if (value !== undefined) {
            this.assignments.set(key, value)
        }
    }

    unite(x: T, y: T) { // need to be careful with assignment
        let rootX = this.findRepresentative(x);
        let rootY = this.findRepresentative(y);

        if (rootX !== rootY) {
            let valueX = this.assignments.get(rootX)
            let valueY = this.assignments.get(rootY)

            const value = this.valueToBeAssigned(valueX, valueY)

            let rankX = this.rank.get(rootX)!;
            let rankY = this.rank.get(rootY)!;

            if (rankX < rankY) {
                this.parent.set(rootX, rootY);
                this.setIfNotUndefined(rootY, value)
            } else if (rankX > rankY) {
                this.parent.set(rootY, rootX);
                this.setIfNotUndefined(rootX, value)
            } else {
                this.parent.set(rootY, rootX);
                this.setIfNotUndefined(rootX, value)
                this.rank.set(rootX, rankX + 1);
            }
        }
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

    getAssignedValues(): S[] {
        return new Array(...this.assignments.values())
    }

    getAssignedKeys(): T[] {
        return new Array(...this.assignments.keys())
    }

}
