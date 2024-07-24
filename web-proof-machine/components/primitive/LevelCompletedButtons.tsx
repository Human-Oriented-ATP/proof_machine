import Button, { HighlightedButton } from './Button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useConfiguration, getNextProblem } from 'lib/study/LevelConfiguration';

function getProblemFromPathname(pathname: string): string {
    const pathComponents = pathname.split("/")
    return pathComponents[pathComponents.length - 1]
}

export function LevelCompletedButtons({ levelCompleted }: { levelCompleted: boolean }) {
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
            <div className='m-1'>
                <Button onClick={() => router.push(getStudyHomeHref())}>Main menu</Button>
            </div>
            <div className='m-1'>
                <Link href={nextLevelHref}>
                    <HighlightedButton disabled={!levelCompleted} >Next level</HighlightedButton>
                </Link>
            </div>
        </>;
    } else {
        return <div className='float-right'>
            <HighlightedButton onClick={() => router.push(getStudyHomeHref())}>Main menu</HighlightedButton>
        </div>;
    }
}
