import { ReactFlowProvider } from "reactflow"
import { Game } from "./components/Game"
import { useTermUnifier } from "./game/TermUnifierHook";
import { Term } from "./game/TermIndex";

export default function App() {
    const [addTerm, addEquation, getTerm] = useTermUnifier()

    const c0: Term = { label: "c0", args: [] }

    const t1Ref: number = addTerm(c0)

    console.log(getTerm(t1Ref))

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactFlowProvider>
                <Game></Game>
            </ReactFlowProvider>
        </div>
    );
}