import { InteractiveLevel } from "../InteractiveLevel";
import { DEFAULT_SETTINGS, OpenTargetConnector } from "../TutorialSetup";

export const tutorial07: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>These ? nodes can be tricky, they create a fresh number upon connection.<br></br> Give it a try! </>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
