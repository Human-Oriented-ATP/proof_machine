import { InteractiveLevel } from "../InteractiveLevel";
import { DEFAULT_SETTINGS, PinkHole } from "../TutorialSetup";

export const pink_tutorial02: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>If the rest of the numbers in a cell are the same, <PinkHole /> becomes the same number. </>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
