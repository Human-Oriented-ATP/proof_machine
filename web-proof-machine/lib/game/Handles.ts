import { CellPosition, OUTPUT_POSITION } from 'lib/game/CellPosition';
import { Term } from './Term';

export function makeHandleId(position: CellPosition, gadgetId: string): string {
    return `handle_${JSON.stringify(position)}_of_${gadgetId}`;
}

export function isTargetHandle(handleId: string): boolean {
    return handleId.slice(0, 10) !== `handle_${OUTPUT_POSITION}_`;
}

export function getTermOfHandle(handleId: string, gadgetTerms: Map<CellPosition, Term>) {
    const position = handleId.split("_")[1];
    for (const [termPosition, term] of gadgetTerms) {
        if (JSON.stringify(termPosition) === position) {
            return term;
        }
    }
    throw Error("Term not found for handle " + handleId);
}

export function getGadgetIdFromHandle(handleId: string): string {
    return handleId.split("_of_")[1];
}

export function getNodePositionFromHandle(handleId: string): CellPosition {
    const position = handleId.split("_")[1];
    return JSON.parse(position);
}

