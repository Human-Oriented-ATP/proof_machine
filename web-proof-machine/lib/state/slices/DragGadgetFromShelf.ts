import { XYPosition } from '@xyflow/react';
import { GetState, SetState } from '../Types';

interface GadgetDndFromShelfData {
    id: string;
    position: XYPosition;
}

export interface GadgetDndFromShelfState {
    gadgetBeingDraggedFromShelf: GadgetDndFromShelfData | undefined;
}

export interface GadgetDndFromShelfActions {
    setGadgetBeingDraggedFromShelf: (dragFromShelfData: GadgetDndFromShelfData) => void;
    initializeSyntheticDraggging: () => void;
}

export type GadgetDndFromShelfSlice = GadgetDndFromShelfState & GadgetDndFromShelfActions;

function triggerSyntheticDragEvent(gadgetBeingDragged: GadgetDndFromShelfData): void {
    const { id, position } = gadgetBeingDragged;
    const gadgetNodeToBeDragged = document.querySelector(`[data-id='${id}']`);
    gadgetNodeToBeDragged?.dispatchEvent(new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: position.x,
        clientY: position.y,
    }));
}

export const gadgetDndFromShelfSlice = (set: SetState<GadgetDndFromShelfSlice>, get: GetState<GadgetDndFromShelfSlice>): GadgetDndFromShelfSlice => {
    return {
        gadgetBeingDraggedFromShelf: undefined,

        initializeSyntheticDraggging: () => {
            const { gadgetBeingDraggedFromShelf } = get();
            if (gadgetBeingDraggedFromShelf !== undefined) {
                triggerSyntheticDragEvent(gadgetBeingDraggedFromShelf);
                // props.setUserIsDraggingOrNavigating(true)
            }
            set({ gadgetBeingDraggedFromShelf: undefined });
        },

        setGadgetBeingDraggedFromShelf: (gadgetBeingDraggedFromShelf: GadgetDndFromShelfData) => {
            set({ gadgetBeingDraggedFromShelf });
        },
    };
};
