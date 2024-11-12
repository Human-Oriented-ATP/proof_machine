import { DEFAULT_SETTINGS, InteractiveLevel } from "../InteractiveLevel";
import { PinkHole } from "../TutorialSetup";

export const mystery_tutorial03: InteractiveLevel = {
    settings: DEFAULT_SETTINGS,
    steps: [{
        content: {
            jsx: <>Try this one on your own! <br />
                The ordering of the numbers below <PinkHole /> is important as well.</>,
        },
    }]
};
