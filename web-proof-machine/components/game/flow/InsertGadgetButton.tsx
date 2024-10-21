import { Axiom } from "lib/game/Primitives";
import { useGameStateContext } from "lib/state/StateContextProvider";
import { useRef } from "react";

interface InsertGadgetButtonProps extends React.PropsWithChildren<{}> {
    axiom: Axiom;
}

export function InsertGadgetButton({ axiom, children }: InsertGadgetButtonProps): JSX.Element {
    const addGadgetNode = useGameStateContext((state) => state.addGadgetNode);
    const ref = useRef<HTMLDivElement>(null);

    function getPosition() {
        const domRect = (ref.current as HTMLElement).getBoundingClientRect();
        return { x: domRect.left + domRect.width / 2, y: domRect.top + domRect.height / 2 };
    }

    function onMouseDown(e: React.MouseEvent) {
        addGadgetNode(axiom, getPosition());
    }

    // TODO
    const abortAddingGadget = () => { };

    return <div ref={ref} className="flex justify-center px-1" onMouseDown={onMouseDown} onClick={abortAddingGadget}>
        {children}
    </div>;
}
