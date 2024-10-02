export type ProblemCategory = {
    name: string;
    problems: string[];
};

export interface StudyConfiguration {
    name: string;
    displayNamesAs: "name" | "number"
    displayUnlistedProblems: boolean
    categories: ProblemCategory[]
}

export interface GameLevelButtonProps {
    config: StudyConfiguration
    label: string
    href: string
    isSolved: boolean
    isBlocked: boolean
}