import { ReactFlowProvider } from "reactflow"
import { Game } from "./components/Game"

export default function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactFlowProvider>
                <Game></Game>
            </ReactFlowProvider>
        </div>
    );
}