import { CstNode, IToken } from 'chevrotain';
import { AbstractNodeProps, NodePosition, GadgetId } from 'lib/game/Primitives';

export interface CompoundTermNode {
    label: IToken[]
    args: CstNode[]
}

export interface ArgumentNode {
    Number?: IToken[]
    Variable?: IToken[]
    compoundTerm?: CstNode[]
}

export interface StatementNode {
    conclusion?: CstNode[]
    hypotheses?: CstNode[]
}

export interface ProblemNode {
    statements: CstNode[]
}
export interface NodeDisplayProps extends AbstractNodeProps {
    position: NodePosition
    gadgetId: GadgetId
    useDummyHandle: boolean
    isGoalNode: boolean
}
