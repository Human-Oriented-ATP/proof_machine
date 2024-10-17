import { InteractiveLevel } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";
import { DEFAULT_SETTINGS } from "../InteractiveLevel";

export const pink_tutorial05: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>If this one is too hard, you can go back to the main menu and try a different level.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};