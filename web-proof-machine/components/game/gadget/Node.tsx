import { GadgetId } from '../../../lib/game/Primitives';
import { Hole } from './Hole';
import { twMerge } from 'tailwind-merge';
import { makeHandleId } from 'lib/game/Handles';
import { Term } from 'lib/game/Term';
import { CustomHandle } from './CustomHandle';
import { getNodeClassNameFromAbbreviation } from 'lib/util/NodeColors';

export type NodePosition = number

export function isOutputPosition(position: NodePosition): boolean {
    return position === -1
}

export function isInputPosition(position: NodePosition): boolean {
    return !isOutputPosition(position)
}

export const OUTPUT_POSITION: NodePosition = -1

export interface NodeProps {
    term: Term
    gadgetId: GadgetId
    position: NodePosition
    isOnShelf: boolean
    isGoalNode: boolean
}

export function Node(props: NodeProps) {
    const handleType = isOutputPosition(props.position) ? "source" : "target"
    const handleId = !props.isOnShelf ? makeHandleId(props.position, props.gadgetId) : undefined

    if ("variable" in props.term) {
        console.error("Term cannot be rendered as node:" + props.term)
        return <>???</>
    } else {
        const backgroundClassName = getNodeClassNameFromAbbreviation(props.term.label)
        return <div className="flex items-center">
            <div className={twMerge("m-1 border-black border-2 rounded-lg p-0.5", backgroundClassName, props.isGoalNode && "outline outline-offset-2 outline-2")}>
                {props.term.args.map((arg, idx) => <Hole key={idx} term={arg}></Hole>)}
            </div>
            <CustomHandle type={handleType} handleId={handleId}></CustomHandle>
        </div>
    }
}
