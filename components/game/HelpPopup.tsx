import { useGameStateContext } from 'lib/state/StateContextProvider';
import { GameSlice } from 'lib/state/Store';
import { HelpContent } from './HelpContent';
import Button from 'components/primitive/buttons/Default';
import { useShallow } from 'zustand/react/shallow';

const selector = (state: GameSlice) => ({
    isOpen: state.helpPopupIsOpen,
    close: state.closeHelpPopup
})

export function HelpPopup() {
    const { isOpen, close } = useGameStateContext(useShallow(selector))

    if (isOpen) {
        return <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30" onClick={close}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center" onClick={e => e.stopPropagation()}>
                <div><HelpContent /></div>
                <Button onClick={close}>Close</Button>
            </div>
        </div>
    } else {
        return <></>
    }
}