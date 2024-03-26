import { ReactFlowProvider } from "reactflow"
import { Game } from "./components/Game"
import { useTermUnifier } from "./game/TermUnifierHook";
import { Term } from "./game/TermIndex";

export default function App() {
    const [getTermValue, isValidConnection, addTerm, removeTerm, addEquation, removeEquation] = useTermUnifier()

    const c0: Term = { label: "c0", args: [] }

    const t1Ref: number = addTerm(c0)

    console.log(getTermValue(t1Ref))

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactFlowProvider>
                <Game></Game>
            </ReactFlowProvider>
        </div>
    );
}