import { InteractiveLevel, TUTORIAL_SETTINGS } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";

export const pink_tutorial01: InteractiveLevel = {
    settings: TUTORIAL_SETTINGS,
    steps: [{
        content: {
            jsx: <>These mystery gadgets with pink circles <PinkHole /> can be tricky, they create letters.<br></br> Give it a try! </>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
