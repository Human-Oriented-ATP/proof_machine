import { InteractiveLevel, TUTORIAL_SETTINGS } from "../InteractiveLevel";

export const pink_tutorial05: InteractiveLevel = {
    settings: TUTORIAL_SETTINGS,
    steps: [{
        content: {
            jsx: <>If this one is too hard, you can use the skip button to continue with the next level.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
