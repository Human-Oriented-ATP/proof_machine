import { InteractiveLevel, TUTORIAL_SETTINGS } from "../InteractiveLevel";

export const pink_tutorial05: InteractiveLevel = {
    settings: TUTORIAL_SETTINGS,
    steps: [{
        content: {
            jsx: <>If this one is too hard, you can go back to the main menu and try a different level.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
