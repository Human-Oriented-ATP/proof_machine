import { InteractiveLevel } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";
import { DEFAULT_SETTINGS } from "../InteractiveLevel";

export const pink_tutorial01: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>These mystery gadgets with <PinkHole /> circles can be tricky, they create new letters.<br></br> Give it a try! </>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
