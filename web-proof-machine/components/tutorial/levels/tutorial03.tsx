import { InteractiveLevel } from "../InteractiveLevel";
import { OpenTargetConnector } from "../TutorialSetup";
import { RESTRICTIVE_SETTINGS } from "../InteractiveLevel";

export const tutorial03: InteractiveLevel = {
    settings: RESTRICTIVE_SETTINGS,
    steps: [{
        content: {
            jsx: <>Connect a gadget to the open connector <OpenTargetConnector />. </>,
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
