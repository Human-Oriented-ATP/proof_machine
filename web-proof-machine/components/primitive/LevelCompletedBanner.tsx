import { useState } from 'react';
import { LevelCompletedActionButtons } from './LevelCompletedActionButtons';

interface LevelCompletedBannerProps {
    isOpen: boolean;
}

export default function LevelCompletedBanner(props: LevelCompletedBannerProps) {
    return <>
        {props.isOpen && (
            <div className="flex items-center justify-center z-10">
                <div className="flex items-center bg-white p-1 shadow-lg w-full text-left">
                    <div className='grow m-1'>
                        <h2 className='text-xl'>Level completed!</h2>
                    </div>
                    <LevelCompletedActionButtons />
                </div>
            </div>
        )}
    </>
};

export const useLevelCompletedBanner = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);

    return { isOpen, open };
}
