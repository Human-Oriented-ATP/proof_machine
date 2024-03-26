export type HoleValue = "" | number

export interface HoleProps {
    value: HoleValue
    isFunctionValue: boolean
}

export type Color = "red" | "green" | "blue" | "white" | "yellow"

export type NodeId = string

export interface AbstractNodeProps {
    holes: HoleProps[]
    color: Color
}

export interface NodeDisplayProps extends AbstractNodeProps {
    id: NodeId
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
    inputNodes: AbstractNodeProps[]
    outputNode?: AbstractNodeProps
    connections: InternalConnection[]
}

export interface GadgetDisplayProps extends AbstractGadgetProps {
    id: GadgetId
    isAxiom: boolean
}