import {CstNode, IToken} from 'chevrotain';

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