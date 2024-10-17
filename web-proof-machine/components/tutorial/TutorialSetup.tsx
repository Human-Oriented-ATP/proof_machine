import { Connector } from "components/game/gadget/Connector";
import { BasicHole } from "components/game/gadget/Hole";

export function SourceConnector() {
    return <div className="inline-block translate-y-[-2px]"><Connector type={"source"} isInline={true} /></div>;
}

export function TargetConnector() {
    return <div className="inline-block translate-y-[-2px]"><Connector type={"target"} isInline={true} /></div>;
}

export function BrokenTargetConnector() {
    return <div className="inline-block translate-y-[-2px]"><Connector type={"target"} isInline={true} isBroken={true} /></div>;
}

export function OpenTargetConnector() {
    return <div className="inline-block translate-y-[-2px]"><Connector type={"target"} isInline={true} isOpen={true} /></div>;
}

export function PinkHole() {
    return <div className="inline-block"><BasicHole value={"?"} isFunctionHole={true} /></div>;
}