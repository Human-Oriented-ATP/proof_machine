import { InteractiveLevel } from "../InteractiveLevel";
import { DEFAULT_SETTINGS, PinkHole } from "../TutorialSetup";

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
