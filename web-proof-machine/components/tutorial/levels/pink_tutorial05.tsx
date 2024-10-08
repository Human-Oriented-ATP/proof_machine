import { InteractiveLevel } from "../InteractiveLevel";
import { DEFAULT_SETTINGS, PinkHole } from "../TutorialSetup";

export const pink_tutorial05: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>If this one is to hard, you can go back to the main menu and try a different level.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
