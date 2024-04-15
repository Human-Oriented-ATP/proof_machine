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

export interface SentenceNode {
    conclusion?: CstNode[]
    hypotheses?: CstNode[]
}

export interface ProblemNode {
    statements: CstNode[]
}