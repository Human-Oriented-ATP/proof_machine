import Button from "./Button"
import { DummyHandle } from "./DummyHandle"

export interface HelpScreenProps {
    visible: boolean
    closeHelp: () => void
}

export function HelpScreen(props: HelpScreenProps) {
    if (!props.visible) {
        return <></>
    }

    return <div className="w-screen h-screen fixed top-0 left-0 bg-black/80">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 min-w-[700px] bg-[#fcfcfc] rounded-md text-center p-5">
            <h2 className="text-xl">Game Help</h2>
            <ul className="text-left leading-10 p-3">
                <li>Press shift to select multiple gadgets</li>
                <li>Press the delete key to remove selected gadgets</li>
                <li><span>Click on a handle</span> <DummyHandle position="inline" /> <span>to draw a connection line</span></li>
                <li>To remove a line, click on the handle that it leads to</li>
            </ul>
            <Button onClick={props.closeHelp}>Close Help</Button>
        </div>
    </div >
}