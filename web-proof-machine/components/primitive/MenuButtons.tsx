import Button, { HighlightedButton } from './Button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useConfiguration, getNextProblem } from 'lib/study/LevelConfiguration';
import { QuestionMarkIcon } from '@radix-ui/react-icons';

function getProblemFromPathname(pathname: string): string {
    const pathComponents = pathname.split("/")
    return pathComponents[pathComponents.length - 1]
}

interface MenuButtonsProps {
    levelCompleted: boolean;
    showHelpWindow: () => void;
}

export function MenuButtons({ levelCompleted, showHelpWindow }: MenuButtonsProps) {
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
                <Button onClick={showHelpWindow}>Help</Button>
            </div>
            <div className='m-1'>
                <Button onClick={() => router.push(getStudyHomeHref())}>Main menu</Button>
            </div>
            <div className='m-1'>
                <Link href={nextLevelHref}>
                    <HighlightedButton disabled={!levelCompleted}
                        title={levelCompleted ? "" : "Connect all gadgets and remove broken connections to continue."}>
                        Next level
                    </HighlightedButton>
                </Link>
            </div>
        </>;
    } else {
        return <div>
            <HighlightedButton onClick={() => router.push(getStudyHomeHref())}>Main menu</HighlightedButton>
        </div>;
    }
}
