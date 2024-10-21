import { HolePosition } from "lib/game/GadgetInternalConnections";
import { GadgetId } from "lib/game/Primitives";
import { getCenterRelativeToParent, Point } from "lib/util/Point";

function calculateOutputHolePosition(gadget: HTMLElement, holeIndex: number) {
    const outputNodeContainer = gadget.childNodes[1];
    const outputNode = outputNodeContainer.childNodes[0].childNodes[0];
    const holeElement = outputNode.childNodes[holeIndex];
    return getCenterRelativeToParent(holeElement as HTMLElement);
}
function calculateInputHolePosition(gadget: HTMLElement, nodeIndex: number, holeIndex: number) {
    const inputNodeContainer = gadget.childNodes[0];
    const nodeElement = inputNodeContainer.childNodes[nodeIndex].childNodes[0];
    const holeElement = nodeElement.childNodes[holeIndex];
    return getCenterRelativeToParent(holeElement as HTMLElement);
}
function calculateHolePositionFromGadgetHTMLElement(gadget: HTMLElement, hole: HolePosition) {
    const [nodeIndex, holeIndex] = hole;
    if (nodeIndex === "output") {
        return calculateOutputHolePosition(gadget, holeIndex);
    } else {
        return calculateInputHolePosition(gadget, nodeIndex, holeIndex);
    }
}

export function calculateHolePosition(gadgetId: GadgetId, hole: HolePosition): Point {
    const gadget = document.getElementById(gadgetId);
    if (gadget) {
        return calculateHolePositionFromGadgetHTMLElement(gadget, hole);
    } else {
        throw new Error("Couldn't find gadget with id " + gadgetId);
    }
}
