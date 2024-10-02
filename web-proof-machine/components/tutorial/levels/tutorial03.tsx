import { InteractiveLevel } from "../InteractiveLevel";
import { RESTRICTIVE_SETTINGS, OpenTargetConnector } from "../TutorialSetup";

export const tutorial03: InteractiveLevel = {
    settings: RESTRICTIVE_SETTINGS,
    steps: [{
        content: {
            jsx: <>To move forward, close the open connector <OpenTargetConnector />. </>,
        },
        trigger: { ConnectionAdded: { to: ["goal_gadget", 0] } }
    }, {
        content: {
            jsx: <>To finish the level, close <i><b>all</b></i> open connectors <OpenTargetConnector />.</>,
        },
        trigger: {
            GameCompleted: null
        }
    }]
};
