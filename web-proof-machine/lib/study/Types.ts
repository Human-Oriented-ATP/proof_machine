export type ProblemCategory = {
    name: string;
    problems: string[];
    unlockCategoryThreshold?: number;
    problemLookAhead: number; 
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
    isUnlocked: boolean
}