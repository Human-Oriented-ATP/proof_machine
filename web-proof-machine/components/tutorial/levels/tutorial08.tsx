import { InteractiveLevel } from "../InteractiveLevel";
import { DEFAULT_SETTINGS, OpenTargetConnector } from "../TutorialSetup";

export const tutorial08: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>If the rest of the numbers in a cell are the same, ? becomes the same number. </>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
