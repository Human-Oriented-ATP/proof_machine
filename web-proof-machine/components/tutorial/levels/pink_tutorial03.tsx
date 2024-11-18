import { InteractiveLevel, TUTORIAL_SETTINGS } from "../InteractiveLevel";

export const pink_tutorial03: InteractiveLevel = {
    settings: TUTORIAL_SETTINGS,
    steps: [{
        content: {
            jsx: <>The letters created by mystery gadgets travel through connections just like numbers do.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
