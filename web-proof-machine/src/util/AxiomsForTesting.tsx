import { AbstractGadgetProps, AbstractNodeProps } from "../game/Primitives";

const node: AbstractNodeProps = {
    holes: [{ value: "", isFunctionValue: false }],
    color: "blue",
};

const node2: AbstractNodeProps = {
    holes: [
        { value: "", isFunctionValue: false },
        { value: "", isFunctionValue: false },
        { value: 42, isFunctionValue: false },
    ],
    color: "green",
};

export const axiom: AbstractGadgetProps = {
    inputNodes: [node, node2],
    outputNode: node2,
    connections: [
        { from: [0, 0], to: ["output", 0] },
        { from: [1, 0], to: ["output", 1] },
        { from: [1, 1], to: ["output", 1] },
    ],
};

export const axiom2: AbstractGadgetProps = {
    inputNodes: [],
    outputNode: node2,
    connections: [],
};
