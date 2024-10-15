import { InteractiveLevel } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";
import { DEFAULT_SETTINGS } from "../InteractiveLevel";

export const pink_tutorial01: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>These <PinkHole /> circles can be tricky, they create a fresh number upon connection.<br></br> Give it a try! </>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
