import { InteractiveLevel } from "../InteractiveLevel";
import { DEFAULT_SETTINGS, PinkHole } from "../TutorialSetup";

export const tutorial07: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>These <PinkHole /> nodes can be tricky, they create a fresh number upon connection.<br></br> Give it a try! </>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
