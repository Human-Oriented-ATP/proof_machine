import { InteractiveLevel, RESET_DISABLED } from "../InteractiveLevel";

export const tutorial06: InteractiveLevel = {
    settings: RESET_DISABLED,
    steps: [{
        content: {
            jsx: <>If you move gadgets very close together they connect automatically.</>,
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
