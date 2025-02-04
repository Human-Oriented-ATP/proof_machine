export type CellPosition = number;
export const OUTPUT_POSITION: CellPosition = -1;

export function isOutputPosition(position: CellPosition): boolean {
    return position === OUTPUT_POSITION;
}

export function isInputPosition(position: CellPosition): boolean {
    return !isOutputPosition(position);
}