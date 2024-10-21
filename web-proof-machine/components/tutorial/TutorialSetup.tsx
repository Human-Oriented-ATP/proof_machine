import { Connector } from "components/game/gadget/Connector";
import { StaticHole } from "components/game/gadget/StaticHole";

export function SourceConnector() {
    return <div className="inline-block translate-y-[-2px]"><Connector type={"source"} isInline={true} /></div>;
}

export function TargetConnector() {
    return <div className="inline-block translate-y-[-2px]"><Connector type={"target"} isInline={true} /></div>;
}

export function BrokenTargetConnector() {
    return <div className="inline-block translate-y-[-2px]"><Connector type={"target"} isInline={true} status={"BROKEN"} /></div>;
}

export function OpenTargetConnector() {
    return <div className="inline-block translate-y-[-2px]"><Connector type={"target"} isInline={true} status={"OPEN"} /></div>;
}

export function PinkHole() {
    return <div className="inline-block"><StaticHole value={"?"} isFunctionHole={true} /></div>;
}
