/*

This file defines the basic types needed for the gadget game.

Each axiom is treated as a *gadget*,
where each gadget can have multiple *nodes* with internal connections between them,
and each node has multiple *holes* which may carry values (usually numbers).

*/


/** The possible values of a hole.
 * 
 * The empty string is used for variables that have not been instantiated.
 * Numbers represent terms involved in the problem state. */   
export type HoleValue = "" | number

/** In addition to storing a `HoleValue`, 
 * `HoleProps` keeps track of whether the hole represents
 *  a non-variable term with uninstantiated variables that 
 *  needs to be rendered separately. */ 
export interface HoleProps {
    value: HoleValue
    isFunctionValue: boolean
}

/** The possible colors of a node */
export type Color = "red" | "green" | "blue" | "white" | "yellow"

/** A string-based identifier for a node. */
export type NodeId = string

/** The data required to describe a node:
 *  - a list of holes
 *  - a color                            */
export interface AbstractNodeProps {
    holes: HoleProps[]
    color: Color
}

/** The data associated with a node with 
 *  concrete details like its identifier. */
export interface NodeDisplayProps extends AbstractNodeProps {
    id: NodeId
    isInput: boolean
    // TODO: Find out what this does
    withoutHandles: boolean
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

/** The data required to describe a gadget:
 * - a list of input nodes
 * - an optional output node (present in axioms but not in the goal)
 * - the connections between the holes in the gadget
 */
export interface AbstractGadgetProps {
    inputNodes: AbstractNodeProps[]
    outputNode?: AbstractNodeProps
    connections: InternalConnection[]
}

/** The data associated with a gadget, together with concrete details like the identifier. */
export interface GadgetDisplayProps extends AbstractGadgetProps {
    id: GadgetId
    isAxiom: boolean
}

/** The data associated with the entire game:
 * - the list of axioms to display in the palette
 * - the goal to prove
 */
export interface AbstractGameProps {
    axioms: AbstractGadgetProps[]
    goal: AbstractNodeProps
}

/*

Terms are built inductively from variables and function applications.

*/

/** Variable names are represented as strings. */
export type VariableName = string
/** Function names are represented as strings. */
export type FunctionName = string

/** Terms are built inductively from variables and function applications. */
export type Term =
    | { variable: VariableName }
    | { label: FunctionName, args: Term[] }


/** An axiom has a list of terms as hypotheses and another list of terms as the conclusions.
 *  Usually we want just a single conclusion (or none at all).
 * However, leaving it as a list makes it easier to parse problem files. */    
export type Axiom = { hypotheses: Term[], conclusions: Term[] }

/** A problem state consists of a goal and a list of axioms that can be used to prove it. */
export type ProblemState = { goal: Term, axioms: Axiom[] }