import { SetState } from '../Types';

export interface HoleFocusState {
    focussedHole: string | undefined
}

export interface HoleFocusActions {
    focus: (term: string) => void
    removeFocus: () => void
};

export type HoleFocusSlice = HoleFocusState & HoleFocusActions

export const holeFocusSlice = (set: SetState<HoleFocusSlice>): HoleFocusSlice => {
    return {
        focussedHole: undefined,
        focus: (variableName: string) => set({ focussedHole: variableName }),
        removeFocus: () => set({ focussedHole: undefined })
    }
}