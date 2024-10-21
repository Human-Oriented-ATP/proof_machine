import { GetState, SetState } from '../Types';

export interface HelpPopupState {
    helpPopupIsOpen: boolean
}

export interface HelpPopupActions {
    openHelpPopup: () => void
    closeHelpPopup: () => void
};

export type HelpPopupSlice = HelpPopupState & HelpPopupActions

export const helpPopupSlice = (set: SetState<HelpPopupSlice>): HelpPopupSlice => {
    return {
        helpPopupIsOpen: false,
        openHelpPopup: () => {
            set({ helpPopupIsOpen: true })
        },
        closeHelpPopup: () => {
            set({ helpPopupIsOpen: false })
        }
    }
}