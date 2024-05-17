export type ProblemCategory = {
    name: string;
    problems: string[];
};

export interface StudyConfiguration {
    name: string;
    displayNamesAs: string
    displayUnlistedProblems: boolean
    categories: ProblemCategory[]
}

export interface GameLevelButtonProps {
    label: string
    href: string
    isSolved: boolean
    isBlocked: boolean
}