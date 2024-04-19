export interface Point {
    x: number
    y: number
}

export function pointToString(point: Point): string {
    return point.x + " " + point.y
}

export function addOffsetX(p: Point, dx: number): Point {
    return { x: p.x + dx, y: p.y }
}

export function getCenterRelativeToParent(e: HTMLElement): Point {
    const left = e.offsetLeft;
    const top = e.offsetTop;
    const width = e.offsetWidth
    const height = e.offsetHeight
    return { x: left + width / 2, y: top + height / 2 }
}