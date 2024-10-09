import { Connector } from "components/game/gadget/Connector";
import { LevelConfiguration } from "./InteractiveLevel";
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

export const RESTRICTIVE_SETTINGS: LevelConfiguration = {
    zoomEnabled: false,
    proximityConnectEnabled: false,
    gadgetDeletionEnabled: false,
    panEnabled: false
};

export const DELETE_ONLY_SETTINGS = {
    zoomEnabled: false,
    proximityConnectEnabled: false,
    gadgetDeletionEnabled: true
};

export const DEFAULT_SETTINGS = {
    zoomEnabled: true,
    proximityConnectEnabled: true,
    gadgetDeletionEnabled: true
};
