import { XYPosition } from "@xyflow/react"

function containsPoint(rect: DOMRect, point: XYPosition): boolean {
    return rect.left <= point.x && point.x <= rect.right && rect.top <= point.y && point.y <= rect.bottom
}

export function isAboveGadgetShelf(position: XYPosition): boolean {
    const paletteElement = document.getElementById("gadget_shelf")!
    const paletteRect = paletteElement?.getBoundingClientRect()
    return containsPoint(paletteRect, position)
}
