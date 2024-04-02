import { TermReference } from "./TermIndex"

export type HoleValue = "" | "x" | number

export interface HoleProps {
    value: HoleValue
    isFunctionValue: boolean
}

export type Color = string //"r" | "g" | "b" | "y" | "w"

export interface AbstractNodeProps {
    values: HoleProps[]
    color: Color
    handleId?: string
}

export interface NodeDisplayProps extends AbstractNodeProps {
    isInput: boolean
    withoutHandles: boolean
}

export type GadgetId = string

export type NodePosition = number | "output"
export type HolePosition = [NodePosition, number]

export interface InternalConnection {
    from: HolePosition
    to: HolePosition
}

export interface AbstractGadgetProps {
    id: GadgetId
    inputs: AbstractNodeProps[]
    output: AbstractNodeProps
    connections: InternalConnection[]
}

export interface GadgetDisplayProps extends AbstractGadgetProps {
    isInPalette: boolean
}

export interface FlowNodeProps {
    termReferenceFromHandleId: (ref: TermReference) => string
}