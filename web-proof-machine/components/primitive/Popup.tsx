import { useState } from 'react';
import Button from './buttons/Default';

interface SingleButtonPopupProps {
    isOpen: boolean;
    close: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<SingleButtonPopupProps> = (props) => {
    return (
        <>
            {props.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm bg-white/30" onClick={props.close}>
                    <div className="bg-white p-6 rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                        <div>{props.children}</div>
                        <Button onClick={props.close}>Close</Button>
                    </div>
                </div>
            )}
        </>
    );
};

export const usePopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, open, close };
}

export default Popup;