import { QueryResultRow } from "@vercel/postgres";
import { GameEvent } from "lib/GameHistory";

interface GameEventDisplayProps {
    event: GameEvent
}

export function GameEventDisplay(props: GameEventDisplayProps): JSX.Element {
    if ("GadgetAdded" in props.event) {
        const id = props.event.GadgetAdded.gadgetId
        const axiom = JSON.stringify(props.event.GadgetAdded.axiom)
        return <div>+G {id}</div>
    } else if ("EquationAdded" in props.event) {
        const from = JSON.stringify(props.event.EquationAdded.from)
        const to = JSON.stringify(props.event.EquationAdded.to)
        return <div>+E {from} {to}</div>
    } else if ("GadgetRemoved" in props.event) {
        const id = props.event.GadgetRemoved.gadgetId
        return <div>-G {id}</div>
    } else if ("EquationRemoved" in props.event) {
        const from = JSON.stringify(props.event.EquationRemoved.from)
        const to = JSON.stringify(props.event.EquationRemoved.to)
        return <div>-E {from} {to}</div>
    } else {
        return <div>Completed</div>
    }
}

export function HistoryDisplay(row: QueryResultRow) {
    const startDate = new Date(row.row.start)
    const latestUpdateDate = new Date(row.row.latest)
    return <div className="p-4">
        <div className="flex space-x-5 p-1">
            <div>Start: {startDate.toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
            <div>Latest update: {latestUpdateDate.toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
        </div>
        <div className="p-1 font-mono">
            {row.row.history.map((event: GameEvent) => <GameEventDisplay event={event} />)}
        </div>
    </div>
}