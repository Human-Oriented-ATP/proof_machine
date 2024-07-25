import { twJoin } from "tailwind-merge"

interface CustomHandleProps {
    type: "source" | "target"
    isConnected?: boolean
    isInline?: boolean
}

export function CustomHandle({ type, isConnected = false, isInline = false }: CustomHandleProps) {
    const polygonPoints = type === "source" ? "3,2 14,2 19,10 14,18 3,18" : "10,10 5,2 17,2 22,10 17,18 5,18"

    return <svg className={twJoin("stroke-[1.5px] stroke-black pointer-events-none fill-white", isInline && "inline")} width="24" height="20" xmlns="http://www.w3.org/2000/svg">
        <polygon points={polygonPoints} />
        {type === "target" && isConnected ? <polyline points="1,2 6,10 1,18" fill="none" /> : <></>}
    </svg>
}