import { InteractiveLevel } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";
import { DEFAULT_SETTINGS } from "../InteractiveLevel";

export const pink_tutorial03: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>The letters created by <PinkHole /> can even occur in the circles of another gadget with <PinkHole />.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
