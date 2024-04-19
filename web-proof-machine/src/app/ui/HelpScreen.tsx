import { DummyHandle } from "./DummyHandle"

export interface HelpScreenProps {
    visible: boolean
    closeHelp: () => void
}

export function HelpScreen(props: HelpScreenProps) {
    if (!props.visible) {
        return <></>
    }

    return <div className="helpBackground">
        <div className="helpWindow">
            <h2>Game Help</h2>
            <ul>
                <li>Press shift to select multiple gadgets</li>
                <li>Press the delete key to remove selected gadgets</li>
                <li><span>Click on a handle</span> <DummyHandle position="inline" /> <span>to draw a connection line</span></li>
                <li>To remove a line, click on the handle that it leads to</li>
            </ul>
            <button onClick={props.closeHelp}>Close Help</button>
        </div>
    </div >
}