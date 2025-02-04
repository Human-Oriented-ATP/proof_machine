import { InteractiveLevel, TUTORIAL_SETTINGS } from "../InteractiveLevel";

export const tutorial06: InteractiveLevel = {
    settings: TUTORIAL_SETTINGS,
    steps: [{
        content: {
            jsx: <>If you move gadgets very close together they connect automatically.</>,
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
