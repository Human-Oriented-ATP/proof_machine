import { CustomHandle } from "./CustomHandle"

export function GameHelp() {
    return <>
        <h2 className="text-lg">Game Help</h2>
        <ul className="text-left leading-10 p-3">
            <li>Press shift to select multiple gadgets</li>
            <li>Press the delete key to remove selected gadgets</li>
            <li>Click on a handle <CustomHandle type="source" isInline={true} /> to draw a connection line</li>
            <li>To remove a line, click on the handle <CustomHandle type="target" isInline={true} /> that it leads to</li>
        </ul>
    </>
}