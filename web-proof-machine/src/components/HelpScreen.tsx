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
            <button onClick={props.closeHelp}>Close Help</button>
        </div>
    </div>
}