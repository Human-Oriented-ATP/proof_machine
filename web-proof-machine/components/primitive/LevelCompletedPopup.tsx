import { useState } from 'react';
import Button from './Button';
import { LevelCompletedActionButtons } from './LevelCompletedActionButtons';

interface LevelCompletedPopupProps {
    isOpen: boolean;
    close: () => void;
}

export default function LevelCompletedPopup(props: LevelCompletedPopupProps) {
    return <>
        {props.isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm bg-white/30">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center">
                    <h2 className='text-2xl'>Level completed!</h2>
                    <div className="text-lg p-6"></div>
                    <div className="">
                        <div className='float-left'>
                            <Button onClick={props.close}>Show game</Button>
                        </div>
                        <LevelCompletedActionButtons />
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
