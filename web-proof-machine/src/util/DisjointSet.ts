export class DisjointSet<T> {
    private parent: Map<T, T>
    private rank: Map<T, number>

    constructor() {
        this.parent = new Map()
        this.rank = new Map()
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

    unite(x: T, y: T): void {
        let rootX = this.findRepresentative(x);
        let rootY = this.findRepresentative(y);

        if (rootX !== rootY) {
            let rankX = this.rank.get(rootX)!;
            let rankY = this.rank.get(rootY)!;

            if (rankX < rankY) {
                this.parent.set(rootX, rootY);
            } else if (rankX > rankY) {
                this.parent.set(rootY, rootX);
            } else {
                this.parent.set(rootY, rootX);
                this.rank.set(rootX, rankX + 1);
            }
        }
    }
}
