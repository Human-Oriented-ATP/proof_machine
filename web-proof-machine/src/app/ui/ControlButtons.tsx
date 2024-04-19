import { ControlButton, Controls } from "reactflow";
import { HomeIcon, QuestionMarkIcon } from '@radix-ui/react-icons'

export interface CustomControlProps {
    goToHomeScreen: () => void
    showHelpWindow: () => void
}

export function ControlButtons(props: CustomControlProps): JSX.Element {
    return <Controls showInteractive={false}>
        <ControlButton onClick={props.showHelpWindow}><QuestionMarkIcon /></ControlButton>
        <ControlButton onClick={props.goToHomeScreen}><HomeIcon /></ControlButton>
    </Controls>
}