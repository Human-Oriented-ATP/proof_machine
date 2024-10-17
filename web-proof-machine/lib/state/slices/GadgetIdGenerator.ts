import { CreateState } from "../Types"

export type GadgetIdGeneratorState = {
    nextGadgetId: number
}

export type GadgetIdGeneratorActions = {
    generateNewGadgetId: () => string
}

export type GadgetIdGeneratorSlice = GadgetIdGeneratorState & GadgetIdGeneratorActions

export const gadgetIdGeneratorSlice: CreateState<GadgetIdGeneratorSlice> = (set, get) => {
    return {
        nextGadgetId: 0,
        generateNewGadgetId: () => {
            const id = `gadget_${get().nextGadgetId}`;
            set({ nextGadgetId: get().nextGadgetId + 1 });
            return id;
        }
    }
}