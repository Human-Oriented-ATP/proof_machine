import Button, { HighlightedButton } from './Button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useConfiguration, getNextProblem, useConfigurationIdentifier } from 'lib/study/LevelConfiguration';

function getProblemFromPathname(pathname: string): string {
    const pathComponents = pathname.split("/")
    return pathComponents[pathComponents.length - 1]
}

export function LevelCompletedActionButtons() {
    const router = useRouter();
    const path = usePathname();

    const currentProblem = getProblemFromPathname(path);
    const config = useConfiguration();

    function getNextLevelHref(): undefined | string {
        if (config) {
            const nextProblem = getNextProblem(config, currentProblem);
            return `../game/${nextProblem}`;
        }
        else {
            return undefined;
        }
    }

    function getStudyHomeHref(): string {
        return `../`;
    }

    const nextLevelHref = getNextLevelHref();

    if (nextLevelHref !== undefined) {
        return <>
            <div className='float-right'>
                <Link href={nextLevelHref}>
                    <HighlightedButton>Next level</HighlightedButton>
                </Link>
            </div>
            <div className='float-right mr-4'>
                <Button onClick={() => router.push(getStudyHomeHref())}>Main menu</Button>
            </div>
        </>;
    } else {
        return <div className='float-right'>
            <HighlightedButton onClick={() => router.push(getStudyHomeHref())}>Main menu</HighlightedButton>
        </div>;
    }
}
