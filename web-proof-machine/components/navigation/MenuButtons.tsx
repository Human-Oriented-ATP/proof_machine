import Button from '../primitive/buttons/Default';
import { HighlightedButton } from "../primitive/buttons/Highlighted";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGameStateContext } from 'lib/state/StateContextProvider';
import { useShallow } from 'zustand/react/shallow';
import { GameSlice } from 'lib/state/Store';
import { useCallback, useEffect, useState } from 'react';

const selector = (state: GameSlice) => ({
    levelIsCompleted: state.levelIsCompleted,
    openHelpPopup: state.openHelpPopup,
    reset: state.reset,
    uploadHistory: state.uploadHistory,
    isTutorialLevel: state.setup.settings.isTutorialLevel,
    skipTime: state.setup.settings.skipTime,
})

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedSeconds = remainingSeconds.toString().padStart(2, "0");
    return `${minutes}:${paddedSeconds}`;
}

export function MenuButtons() {
    const { levelIsCompleted, openHelpPopup, reset, uploadHistory, isTutorialLevel, skipTime } = useGameStateContext(useShallow(selector))

    const router = useRouter();

    const { nextProblem } = useGameStateContext((state) => state.setup)
    const nextLevelHref = nextProblem ? `../game/${nextProblem}` : undefined

    const showMenuButton = skipTime === null && !isTutorialLevel
    const showSkipButton = skipTime !== null && nextLevelHref !== undefined

    const restartLevel = useCallback(() => {
        const confirmed = confirm("Are you sure that you want to restart the level? All progress will be lost.")
        if (confirmed) {
            uploadHistory()
            reset()
        }
    }, [])

    const mainButtonAction = useCallback(() => {
        uploadHistory()
        router.push('../')
    }, [])

    const [timeUntilSkip, setTimeUntilSkip] = useState(skipTime || 0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeUntilSkip <= 0) {
                clearInterval(interval)
                return
            }
            setTimeUntilSkip((prev) => prev - 1)
        }, 1000)
    }, [skipTime])

    return <>
        <div className='m-1'>
            <Button onClick={openHelpPopup}>Help</Button>
        </div>
        {showMenuButton &&
            <div className='m-1'>
                <Button onClick={mainButtonAction}>Main menu</Button>
            </div>
        }
        {!isTutorialLevel &&
            <div className='m-1'>
                <Button onClick={restartLevel}>Restart level</Button>
            </div>
        }
        {showSkipButton && <div className='m-1'>
            <Link href={nextLevelHref} onClick={uploadHistory}>
                <Button disabled={timeUntilSkip > 0}
                    title={timeUntilSkip <= 0 ? "" : `You can skip this level in ${formatTime(timeUntilSkip)}.`}>
                    Skip level
                </Button>
            </Link>
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
