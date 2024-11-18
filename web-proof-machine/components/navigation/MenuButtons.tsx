import Button from '../primitive/buttons/Default';
import { HighlightedButton } from "../primitive/buttons/Highlighted";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGameStateContext } from 'lib/state/StateContextProvider';
import { useShallow } from 'zustand/react/shallow';
import { GameSlice } from 'lib/state/Store';

const selector = (state: GameSlice) => ({
    levelIsCompleted: state.levelIsCompleted,
    openHelpPopup: state.openHelpPopup,
    reset: state.reset,
    resetButtonEnabled: state.setup.settings.resetButtonEnabled,
})

export function MenuButtons() {
    const { levelIsCompleted, openHelpPopup, reset, resetButtonEnabled } = useGameStateContext(useShallow(selector))

    const router = useRouter();

    const { nextProblem } = useGameStateContext((state) => state.setup)
    const nextLevelHref = nextProblem ? `../game/${nextProblem}` : undefined

    const restartLevel = () => {
        const confirmed = confirm("Are you sure that you want to restart the level? All progress will be lost.")
        if (confirmed) {
            reset()
        }
    }

    return <>
        <div className='m-1'>
            <Button onClick={openHelpPopup}>Help</Button>
        </div>
        <div className='m-1'>
            <Button onClick={() => router.push('../')}>Main menu</Button>
        </div>
        {resetButtonEnabled &&
            <div className='m-1'>
                <Button onClick={restartLevel}>Restart level</Button>
            </div>
        }
        {nextLevelHref !== undefined && <div className='m-1'>
            <Link href={nextLevelHref}>
                <HighlightedButton disabled={!levelIsCompleted}
                    title={levelIsCompleted ? "" : "Connect all gadgets and remove broken connections to continue."}>
                    Next level
                </HighlightedButton>
            </Link>
        </div>
        }
    </>;
}
