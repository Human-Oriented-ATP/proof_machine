type DisplayNamesAs = "name" | "number"

export type ProblemCategory = {
    name: string;
    problems: string[];
};

export interface StudyConfiguration {
    name: string;
    displayNamesAs: DisplayNamesAs
    displayUnlistedProblems: boolean
    categories: ProblemCategory[]
}

export interface GameLevelButtonProps {
    label: string
    href: string
    isSolved: boolean
    isBlocked: boolean
}