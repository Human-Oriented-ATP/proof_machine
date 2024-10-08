import { InteractiveLevel } from "../InteractiveLevel";
import { DEFAULT_SETTINGS, OpenTargetConnector, PinkHole } from "../TutorialSetup";

export const pink_tutorial03: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>The new numbers created by <PinkHole /> can even occur in the circles of another gadget with <PinkHole />.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
