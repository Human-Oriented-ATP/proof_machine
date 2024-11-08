import Button from '../primitive/buttons/Default';
import { HighlightedButton } from "../primitive/buttons/Highlighted";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGameStateContext } from 'lib/state/StateContextProvider';
import { useShallow } from 'zustand/react/shallow';

export function MenuButtons() {
    const levelCompleted = useGameStateContext(useShallow((state) => state.levelIsCompleted))
    const openHelpPopup = useGameStateContext(useShallow((state) => state.openHelpPopup))

    const router = useRouter();

    const { nextProblem } = useGameStateContext((state) => state.setup)
    const nextLevelHref = nextProblem ? `../game/${nextProblem}` : undefined

    return <>
        <div className='m-1'>
            <Button onClick={openHelpPopup}>Help</Button>
        </div>
        <div className='m-1'>
            <Button onClick={() => router.push('../')}>Main menu</Button>
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
