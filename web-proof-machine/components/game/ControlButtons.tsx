import { ControlButton, Controls, ReactFlowInstance } from "@xyflow/react";
import { Crosshair1Icon } from '@radix-ui/react-icons'

export interface CustomControlProps {
    rf: ReactFlowInstance
}

export function ControlButtons(props: CustomControlProps): JSX.Element {
    function fitView() {
        props.rf.fitView({ padding: 0.5 })
    }

    return <Controls showInteractive={false} showFitView={false} position="bottom-right">
        <ControlButton onClick={() => fitView()}><Crosshair1Icon /></ControlButton>
    </Controls >
}