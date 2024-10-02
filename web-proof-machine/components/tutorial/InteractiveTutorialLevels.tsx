import { InteractiveLevel } from "./InteractiveLevel";
import { tutorial01 } from "./levels/tutorial01";
import { tutorial01a } from "./levels/tutorial01a";
import { tutorial02 } from "./levels/tutorial02";
import { tutorial03 } from "./levels/tutorial03";
import { tutorial04 } from "./levels/tutorial04";
import { tutorial05 } from "./levels/tutorial05";
import { tutorial06 } from "./levels/tutorial06";

export const interactiveTutorialLevels: Map<string, InteractiveLevel> = new Map([
    ["tutorial01", tutorial01],
    ["tutorial01a", tutorial01a],
    ["tutorial02", tutorial02],
    ["tutorial03", tutorial03],
    ["tutorial04", tutorial04],
    ["tutorial05", tutorial05],
    ["tutorial06", tutorial06]
])