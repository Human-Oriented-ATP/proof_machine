import { InteractiveLevel } from "../InteractiveLevel";
import { DEFAULT_SETTINGS, PinkHole } from "../TutorialSetup";

export const pink_tutorial04: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>You sometimes need multiple copies of a gadget with <PinkHole />.</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
