import { Term } from "./Term"

export type HoleValue = "" | "x" | number

export interface HoleProps {
    value: HoleValue
    isFunctionValue: boolean
}

export type Color = string //"r" | "g" | "b" | "y" | "w"

export interface AbstractNodeProps {
    values: HoleProps[]
    color: Color
    term?: Term
}

export interface NodeDisplayProps extends AbstractNodeProps {
    isInput: boolean
}

export type GadgetId = string

export type NodePosition = number | "output"
export type HolePosition = [NodePosition, number]

export interface InternalConnection {
    from: HolePosition
    to: HolePosition
}

export interface GadgetProps {
    id: GadgetId
    inputs: AbstractNodeProps[]
    output: AbstractNodeProps
    connections: InternalConnection[]
}