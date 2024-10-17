import Button from '../primitive/buttons/Default';
import { HighlightedButton } from "../primitive/buttons/Highlighted";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getNextProblem } from 'lib/study/LevelConfiguration';
import { StudyConfiguration } from 'lib/study/Types';

function getProblemFromPathname(pathname: string): string {
    const pathComponents = pathname.split("/")
    return pathComponents[pathComponents.length - 1]
}

interface MenuButtonsProps {
    configuration: StudyConfiguration
}

export function MenuButtons({ configuration }: MenuButtonsProps) {
    const levelCompleted = false
    const showHelpWindow = () => { }

    const router = useRouter();
    const path = usePathname();

    const currentProblem = getProblemFromPathname(path);

    function getNextLevelHref(): undefined | string {
        const nextProblem = getNextProblem(configuration, currentProblem);
        if (nextProblem !== undefined) {
            return `../game/${nextProblem}`;
        } else {
            return undefined
        }
    }

    function getStudyHomeHref(): string {
        return `../`;
    }

    const nextLevelHref = getNextLevelHref();

    return <>
        <div className='m-1'>
            <Button onClick={showHelpWindow}>Help</Button>
        </div>
        <div className='m-1'>
            <Button onClick={() => router.push(getStudyHomeHref())}>Main menu</Button>
        </div>
        {nextLevelHref !== undefined && <div className='m-1'>
            <Link href={nextLevelHref}>
                <HighlightedButton disabled={!levelCompleted}
                    title={levelCompleted ? "" : "Connect all gadgets and remove broken connections to continue."}>
                    Next level
                </HighlightedButton>
            </Link>
        </div>
        }
    </>;
}
