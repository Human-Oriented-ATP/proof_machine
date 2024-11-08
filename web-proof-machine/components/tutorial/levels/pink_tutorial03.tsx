import { InteractiveLevel } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";
import { DEFAULT_SETTINGS } from "../InteractiveLevel";

export const pink_tutorial03: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>The letters created by mystery gadgets travel through connections just like numbers do.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
