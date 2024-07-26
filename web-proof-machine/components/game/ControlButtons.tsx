import { ControlButton, Controls, ReactFlowInstance } from "@xyflow/react";
import { Crosshair1Icon, MinusIcon, PlusIcon } from '@radix-ui/react-icons'

export interface CustomControlProps {
    rf: ReactFlowInstance
}

export function ControlButtons(props: CustomControlProps): JSX.Element {
    function fitView() {
        props.rf.fitView({ padding: 0.5 })
    }

    const buttonClassNames = "!w-10 !h-10 border-black border-2 rounded-lg m-0.5 hover:bg-black hover:text-white"
    const svgClassNames = "!max-w-none !max-h-none h-full"

    return <Controls showZoom={false} showInteractive={false} showFitView={false} position="bottom-right">
        <ControlButton className={buttonClassNames} onClick={() => props.rf.zoomIn()}><PlusIcon className={svgClassNames} /></ControlButton>
        <ControlButton className={buttonClassNames} onClick={() => props.rf.zoomOut()}><MinusIcon className={svgClassNames} /></ControlButton>
        <ControlButton className={buttonClassNames} onClick={() => fitView()}><Crosshair1Icon className={svgClassNames} /></ControlButton>
    </Controls >
}