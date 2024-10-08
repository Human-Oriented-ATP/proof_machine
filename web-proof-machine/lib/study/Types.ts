export type ProblemCategory = {
    name: string;
    problems: string[];
    categoryUnlockThreshold?: number;
    numberOfUnlockedProblems?: number; 
};

export interface StudyConfiguration {
    name: string;
    displayNamesAs: "name" | "number"
    displayUnlistedProblems: boolean
    categories: ProblemCategory[]
}