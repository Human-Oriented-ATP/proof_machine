import { useGameStateContext } from "lib/state/StateContextProvider";
import { DelayedDragIndicator, DragIndicatorProps, ElementPosition } from "./DragIndicator";
import { GadgetPosition } from "./InteractiveLevel";
import { GameSlice } from "lib/state/Store";
import { GadgetId } from "lib/game/Primitives";

const selector = (state: GameSlice) => {
    return {
        tutorialStep: state.tutorialStep,
        tutorialSteps: state.setup.tutorialSteps,
    }
}

function toElementPosition(position: GadgetPosition, getSomeGadgetWithAxiom: (gadget: string) => GadgetId): ElementPosition {
    if ("elementId" in position) {
        return position
    } else {
        if (position.gadget === "ANY_GADGET") {
            throw Error("Position ANY_GADGET cannot be used for drag indicator. ")
        } else if ("axiom" in position.gadget) {
            const gadgetId = getSomeGadgetWithAxiom(position.gadget.axiom)
            return { elementId: gadgetId, anchorPoint: position.anchorPoint, offset: position.offset }
        } else {
            return { elementId: position.gadget.gadgetId, anchorPoint: position.anchorPoint, offset: position.offset }
        }
    }
}

function DragIndicator({ dragIndicator }: { dragIndicator: DragIndicatorProps<GadgetPosition> }) {
    const getSomeGadgetWithAxiom = useGameStateContext(state => state.getSomeGadgetWithAxiom)

    const props: DragIndicatorProps<ElementPosition> = {
        origin: toElementPosition(dragIndicator.origin, getSomeGadgetWithAxiom),
        destination: "absolutePosition" in dragIndicator.destination ?
            { absolutePosition: toElementPosition(dragIndicator.destination.absolutePosition, getSomeGadgetWithAxiom) }
            : dragIndicator.destination,
        drawLine: dragIndicator.drawLine,
        endWithClick: dragIndicator.endWithClick
    }

    return <DelayedDragIndicator {...props} />
}

export function InteractiveContent() {
    const { tutorialStep, tutorialSteps } = useGameStateContext(selector)

    const currentContent = tutorialSteps[tutorialStep]?.content

    return <div>
        {currentContent?.jsx &&
            <div className="absolute text-xl top-24 left-44 md:w-full md:text-center md:left-0 md:px-44">
                <span className="backdrop-blur-sm">{currentContent.jsx}</span>
            </div>
        }
        {currentContent?.dragIndicator && <DragIndicator dragIndicator={currentContent?.dragIndicator} />}
    </div>
}

export function InteractiveOverlay() {
    return <div className="fixed left-0 top-0 w-full h-full z-10 pointer-events-none">
        <InteractiveContent />
    </div>
}
