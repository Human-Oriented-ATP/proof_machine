import { ControlButton, Controls } from "reactflow";
import { HomeIcon, QuestionMarkIcon } from '@radix-ui/react-icons'
import { useRouter } from "next/navigation";

export interface CustomControlProps {
    showHelpWindow: () => void
}

export function ControlButtons(props: CustomControlProps): JSX.Element {
    const router = useRouter()

    return <Controls showInteractive={false} position="bottom-right">
        <ControlButton onClick={props.showHelpWindow}><QuestionMarkIcon /></ControlButton>
        <ControlButton onClick={() => router.push("../")}><HomeIcon /></ControlButton>
    </Controls >
}