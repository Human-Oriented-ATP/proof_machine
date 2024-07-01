import { ControlButton, Controls, ReactFlowInstance, getNodesBounds } from "reactflow";
import { Crosshair1Icon, HomeIcon, QuestionMarkIcon } from '@radix-ui/react-icons'
import { useRouter } from "next/navigation";

export interface CustomControlProps {
    rf: ReactFlowInstance
    showHelpWindow: () => void
}

export function ControlButtons(props: CustomControlProps): JSX.Element {
    const router = useRouter()

    function fitView() {
        props.rf.fitView({ padding: 0.5 })
    }

    return <Controls showInteractive={false} showFitView={false} position="bottom-right">
        <ControlButton onClick={() => fitView()}><Crosshair1Icon /></ControlButton>
        <ControlButton onClick={props.showHelpWindow}><QuestionMarkIcon /></ControlButton>
        <ControlButton onClick={() => router.push("../")}><HomeIcon /></ControlButton>
    </Controls >
}