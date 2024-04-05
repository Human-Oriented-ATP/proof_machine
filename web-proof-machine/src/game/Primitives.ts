import { Term } from "./Term"

export type HoleValue = "" | "x" | "?" | number

/** In addition to storing a `HoleValue`, 
 * `HoleProps` keeps track of whether the hole represents
 *  a non-variable term with uninstantiated variables that 
 *  needs to be rendered separately. */
export interface HoleProps {
    value: HoleValue
    isFunctionValue: boolean
}

export type Color = string //"r" | "g" | "b" | "y" | "w"

/** The data required to describe a node:
 *  - a list of holes
 *  - a color                            */
export interface AbstractNodeProps {
    values: HoleProps[]
    color: Color
    term?: Term
}

/** The data associated with a node with 
 *  concrete details like its identifier. */
export interface NodeDisplayProps extends AbstractNodeProps {
    isInput: boolean
}

/*

Each axiom in the game is modelled as a *gadget*:
a list of input nodes together with an optional output node.

This means that each axiom is assumed to be either a Horn clause or a goal.

*/

/* A string-based identifier for a gadget. */
export type GadgetId = string

/** A means of identifying a node in a gadget.
 *  An input node in the gadget is referred to by its index in the list.
 *  The output node, if it exists, is referred to by the string "output". */
export type NodePosition = number | "output"
/** A means of identifying a hole in a gadget
 * by specifying the index of the node it is a part of
 * along with its index in the list of holes in that node.
 */
export type HolePosition = [NodePosition, number]

/** An `InternalConnection` is a pair of hole positions.
 * It indicates when two holes in a gadget represent the same variable.
 */
export interface InternalConnection {
    from: HolePosition
    to: HolePosition
}

export interface GadgetProps {
    id: GadgetId
    inputs: AbstractNodeProps[]
    output?: AbstractNodeProps
    connections: InternalConnection[]
}