import { InteractiveLevel, RESET_DISABLED } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";

export const pink_tutorial02: InteractiveLevel = {
    settings: RESET_DISABLED,
    steps: [{
        content: {
            jsx: <>If the rest of the numbers in a cell are the same, the pink circle <PinkHole /> becomes the same letter. </>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
