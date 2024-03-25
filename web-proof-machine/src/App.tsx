import { ReactFlowProvider } from "reactflow"
import { Game } from "./components/Game"
import { Term } from "./game/TermIndex";
import { Equation, TermUnifier } from "./game/TermUnifier";

export default function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactFlowProvider>
                <Game></Game>
            </ReactFlowProvider>
        </div>
    );
}