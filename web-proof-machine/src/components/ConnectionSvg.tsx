import { Point, pointToString, addOffsetX } from "../util/Point";

const CONTROL_POINT_OFFSET = 50;

export interface ConnectionDrawingData {
    start: Point;
    end: Point;
    from_input: boolean;
    to_output: boolean;
}

export interface ConnectionSvgProps {
    connections: ConnectionDrawingData[];
}

export function connectionPath(props: ConnectionDrawingData): JSX.Element {
    const svg_start_sequence = "M " + pointToString(props.start);
    let offset_start = props.from_input
        ? CONTROL_POINT_OFFSET
        : -CONTROL_POINT_OFFSET;
    let controlPoint1 = addOffsetX(props.start, offset_start);
    let offset_end = props.to_output
        ? -CONTROL_POINT_OFFSET
        : CONTROL_POINT_OFFSET;
    let controlPoint2 = addOffsetX(props.end, offset_end);
    const svg_curve =
        "C " +
        pointToString(controlPoint1) +
        ", " +
        pointToString(controlPoint2) +
        ", " +
        pointToString(props.end);

    const path_command = svg_start_sequence + " " + svg_curve;

    return (
        <path
            d={path_command}
            stroke="black"
            strokeWidth="3px"
            fill="transparent"
        />
    );
}

export function ConnectionSvg({ ...props }: ConnectionSvgProps) {
    function drawConnections(): JSX.Element[] {
        const pathElements = props.connections.map((connection) =>
            connectionPath(connection)
        );
        return pathElements;
    }

    return <svg className="connectionSvg">{drawConnections()}</svg>;
}
