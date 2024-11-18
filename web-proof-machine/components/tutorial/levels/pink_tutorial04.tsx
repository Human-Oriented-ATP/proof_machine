import { InteractiveLevel, TUTORIAL_SETTINGS } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";

export const pink_tutorial04: InteractiveLevel = {
    settings: TUTORIAL_SETTINGS,
    steps: [{
        content: {
            jsx: <>You sometimes need multiple copies of a gadget with a pink circle <PinkHole />.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
