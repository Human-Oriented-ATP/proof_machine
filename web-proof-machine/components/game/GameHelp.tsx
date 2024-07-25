import { DummyHandle } from "../primitive/DummyHandle"

export function GameHelp() {
    return <>
        <h2 className="text-lg">Game Help</h2>
        <ul className="text-left leading-10 p-3">
            <li>Press shift to select multiple gadgets</li>
            <li>Press the delete key to remove selected gadgets</li>
            <li><span>Click on a handle</span> <DummyHandle position="source" /> <span>to draw a connection line</span></li>
            <li>To remove a line, click on the handle that it leads to</li>
        </ul>
    </>
}