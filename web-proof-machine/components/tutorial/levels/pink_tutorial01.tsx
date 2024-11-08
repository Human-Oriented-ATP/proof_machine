import { InteractiveLevel } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";
import { DEFAULT_SETTINGS } from "../InteractiveLevel";

export const pink_tutorial01: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>These mystery gadgets with pink circles <PinkHole /> can be tricky, they create letters.<br></br> Give it a try! </>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
