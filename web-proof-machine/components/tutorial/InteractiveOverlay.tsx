import { useGameStateContext } from "lib/state/StateContextProvider";
import { DelayedDragIndicator, DragIndicatorProps, ElementPosition } from "./DragIndicator";
import { JsxAndDragIndicator, InteractiveLevel, InteractiveStep, OverlayPosition, GadgetSelector } from "./InteractiveLevel";
import { GameSlice } from "lib/state/Store";

const selector = (state: GameSlice) => {
    return {
        tutorialStep: state.tutorialStep,
        tutorialSteps: state.setup.tutorialSteps,
    }
}

function DragIndicator({ dragIndicator }: { dragIndicator: DragIndicatorProps<OverlayPosition> }) {
    // function getDragIndicatorProps(dragIndicator: DragIndicatorProps<GadgetPosition>): DragIndicatorProps<OverlayPosition> {
    //     return {
    //         origin: toOverlayPosition(dragIndicator.origin),
    //         destination: "absolutePosition" in dragIndicator.destination ?
    //             { absolutePosition: toOverlayPosition(dragIndicator.destination.absolutePosition) }
    //             : dragIndicator.destination,
    //         drawLine: dragIndicator.drawLine,
    //         endWithClick: dragIndicator.endWithClick
    //     }
    // }

    //{props.content.dragIndicator && !props.hideInteractiveContent && 
    // return <DelayedDragIndicator {...getDragIndicatorProps(props.content.dragIndicator)} />
    return <></>
}

export function InteractiveContent() {
    const { tutorialStep, tutorialSteps } = useGameStateContext(selector)

    const currentContent = tutorialSteps[tutorialStep]?.content

    // need: content, getGadgetElementId, hideInteractiveContent
    // function toOverlayPosition(position: GadgetPosition): OverlayPosition {
    //     const elementId = props.getGadgetElementId(position.gadget)
    //     if (!elementId) {
    //         throw new Error(`Element not found for gadget ${position.gadget}`)
    //     } else {
    //         return { elementId, anchorPoint: position.anchorPoint, offset: position.offset }
    //     }
    // }

    console.log({ tutorialSteps })

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
