export type Problems = {
    [key: string]: string[];
};

export interface StudyConfiguration {
    problems: Problems
}

export interface GameLevelButtonProps {
    label: string
    href: string
    isSolved: boolean
    isBlocked: boolean
}