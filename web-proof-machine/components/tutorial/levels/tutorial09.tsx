import { InteractiveLevel } from "../InteractiveLevel";
import { DEFAULT_SETTINGS, OpenTargetConnector } from "../TutorialSetup";

export const tutorial09: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>The new numbers created by ?s behave normally, and can even occur in the other nodes of a ? gadget</>
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
