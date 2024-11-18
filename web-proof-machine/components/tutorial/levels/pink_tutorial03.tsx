import { InteractiveLevel, RESET_DISABLED } from "../InteractiveLevel";

export const pink_tutorial03: InteractiveLevel = {
    settings: RESET_DISABLED,
    steps: [{
        content: {
            jsx: <>The letters created by mystery gadgets travel through connections just like numbers do.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
