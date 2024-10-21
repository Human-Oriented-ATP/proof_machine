import { NodePosition, OUTPUT_POSITION } from './Primitives';
import { Term } from './Term';

export function makeHandleId(position: NodePosition, gadgetId: string): string {
    return `handle_${JSON.stringify(position)}_of_${gadgetId}`;
}

export function isTargetHandle(handleId: string): boolean {
    return handleId.slice(0, 10) !== `handle_${OUTPUT_POSITION}_`;
}

export function getTermOfHandle(handleId: string, gadgetTerms: Map<NodePosition, Term>) {
    const position = handleId.split("_")[1];
    for (const [termPosition, term] of gadgetTerms) {
        if (JSON.stringify(termPosition) === position) {
            return term;
        }
    }
    throw Error("Term not found for handle " + handleId);
}

export function getNodePositionFromHandle(handleId: string): NodePosition {
    const position = handleId.split("_")[1];
    return JSON.parse(position);
}

