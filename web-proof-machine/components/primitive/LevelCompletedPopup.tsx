import { useState } from 'react';
import Button, { HighlightedButton } from './Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface LevelCompletedPopupProps {
    isOpen: boolean;
    close: () => void;
}

function LevelCompletedActionButtons({ nextLevelHref }: { nextLevelHref?: string }) {
    const router = useRouter()

    if (nextLevelHref !== undefined) {
        return <>
            <div className='float-right'>
                <Link href={nextLevelHref}>
                    <HighlightedButton>Next level</HighlightedButton>
                </Link>
            </div>
            <div className='float-right mr-4'>
                <Button onClick={() => router.push("../")}>Main menu</Button>
            </div>
        </>
    } else {
        return <div className='float-right'>
            <HighlightedButton onClick={() => router.push("../")}>Main menu</HighlightedButton>
        </div>
    }
}

export default function LevelCompletedPopup(props: LevelCompletedPopupProps) {
    const searchParams = useSearchParams()
    const nextProblem = searchParams.get("next")
    const nextLevelHref = nextProblem == null ? undefined : `../game/${nextProblem}`

    return <>
        {props.isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm bg-white/30">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center">
                    <h2 className='text-2xl'>Level completed!</h2>
                    <div className="text-lg p-6">Well done! You were faster than 90% of other players. That is not at all a white lie to keep you playing.</div>
                    <div className="">
                        <div className='float-left'>
                            <Button onClick={props.close}>Show game</Button>
                        </div>
                        <LevelCompletedActionButtons nextLevelHref={nextLevelHref} />
                    </div>
                </div>
            </div>
        )}
    </>
};

export const useLevelCompletedPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, open, close };
}
