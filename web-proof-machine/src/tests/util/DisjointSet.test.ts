import { DisjointSet } from "../../util/DisjointSet"

test("Adding a new element", () => {
    const x = new DisjointSet<number>()
    const y = x.findRepresentative(3)
    expect(y).toBe(3);
})

test("Union test", () => {
    const x = new DisjointSet<number>()
    x.unite(1, 2)
    expect(x.findRepresentative(1)).toBe(x.findRepresentative(2));
})

test("Union transitive test", () => {
    const x = new DisjointSet<number>()
    x.unite(1, 2)
    x.unite(2, 3)
    expect(x.findRepresentative(1)).toBe(x.findRepresentative(3));
})
