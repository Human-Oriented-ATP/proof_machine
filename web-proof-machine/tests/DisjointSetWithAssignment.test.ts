import { expect, test } from 'vitest'
import { DisjointSetWithAssignment } from "../lib/util/DisjointSetWithAssignment"

test("Adding a new element", () => {
    const x = new DisjointSetWithAssignment<number, number>()
    const y = x.findRepresentative(3)
    expect(y).toBe(3);
})

test("Union test", () => {
    const x = new DisjointSetWithAssignment<number, number>()
    x.unite(1, 2)
    expect(x.findRepresentative(1)).toBe(x.findRepresentative(2));
})

test("Union transitive test", () => {
    const x = new DisjointSetWithAssignment<number, number>()
    x.unite(1, 2)
    x.unite(2, 3)
    expect(x.findRepresentative(1)).toBe(x.findRepresentative(3));
})

test("Assigning an element", () => {
    const set = new DisjointSetWithAssignment<number, string>()
    set.assign(3, "3")
    expect(set.getAssignedValue(3)).toBe("3");
})

test("Unassigning value gives undefined", () => {
    const set = new DisjointSetWithAssignment<number, string>()
    expect(set.getAssignedValue(3)).toBe(undefined);
})

test("Assigning, then union", () => {
    const set = new DisjointSetWithAssignment<number, string>()
    set.assign(1, "foo")
    set.unite(1, 2)
    expect(set.getAssignedValue(2)).toBe("foo");
})

test("Union, then assigning", () => {
    const set = new DisjointSetWithAssignment<number, string>()
    set.unite(1, 2)
    set.assign(1, "foo")
    expect(set.getAssignedValue(2)).toBe("foo");
})

test("isAssigned true", () => {
    const set = new DisjointSetWithAssignment<number, string>()
    set.assign(1, "foo")
    expect(set.isAssigned(1)).toBe(true);
})

test("isAssigned false", () => {
    const set = new DisjointSetWithAssignment<number, string>()
    expect(set.isAssigned(1)).toBe(false);
})
