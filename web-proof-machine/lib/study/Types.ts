type Problems = {
    [key: string]: string[];
};

interface StudyConfiguration {
    problems: Problems
}

interface GameLevelButtonProps {
    label: string
    href: string
    isSolved: boolean
    isBlocked: boolean
}