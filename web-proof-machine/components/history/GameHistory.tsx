import { QueryResultRow } from "@vercel/postgres";
import { GameEvent } from "lib/study/GameHistory";
import { axiomToString } from "lib/game/GameLogic";

interface GameEventDisplayProps {
    event: [GameEvent, Date]
}

export function GameEvent(props: GameEventDisplayProps): JSX.Element {
    const [event, timestamp] = props.event
    const time = new Date(timestamp).toLocaleTimeString('de-DE', { timeZone: 'UTC' })
    if ("GadgetAdded" in event) {
        const id = event.GadgetAdded.gadgetId
        const axiom = event.GadgetAdded.axiom
        return <div>{time} +G {id} <span className="text-sm">{axiom}</span></div>
    } else if ("EquationAdded" in event) {
        const from = JSON.stringify(event.EquationAdded.from)
        const to = JSON.stringify(event.EquationAdded.to)
        return <div>{time} +E {from} {to}</div>
    } else if ("GadgetRemoved" in event) {
        const id = event.GadgetRemoved.gadgetId
        return <div>{time} -G {id}</div>
    } else if ("EquationRemoved" in event) {
        const from = JSON.stringify(event.EquationRemoved.from)
        const to = JSON.stringify(event.EquationRemoved.to)
        return <div>{time} -E {from} {to}</div>
    } else {
        return <div>{time} Completed</div>
    }
}

export function GameHistory(row: QueryResultRow) {
    const startDate = new Date(row.row.start)
    const latestUpdateDate = new Date(row.row.latest)
    return <div className="p-4">
        <div className="flex space-x-5">
            <div>Start: {startDate.toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
            <div>Latest update: {latestUpdateDate.toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
        </div>
        <div className="p-1 font-mono">
            {row.row.history.map((event => <div className="p-2"><GameEvent event={event} /></div>))}
        </div>
    </div>
}