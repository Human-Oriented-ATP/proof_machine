import { InteractiveLevel, RESET_DISABLED } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";

export const pink_tutorial04: InteractiveLevel = {
    settings: RESET_DISABLED,
    steps: [{
        content: {
            jsx: <>You sometimes need multiple copies of a gadget with a pink circle <PinkHole />.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
