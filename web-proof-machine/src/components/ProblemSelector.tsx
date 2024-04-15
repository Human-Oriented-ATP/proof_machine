import { useCallback, useState } from "react";
import { GameLoader } from "./GameLoader";

const problems = ["problem1", "tim_easyproblem1"]

interface ProblemSelectionPaneProps {
    setProblem: (problem: string) => void
}

function ProblemSelectionPane(props: ProblemSelectionPaneProps) {
    function makeProblemSelectionButton(name: string): JSX.Element {
        return <button onClick={e => props.setProblem(name)}>{name}</button>
    }

    return <div className="problemSelectionPane">
        <div className="problemSelectionText">Choose the game you'd like to play:</div>
        <div className="problemSelectionButtons">
            {problems.map(makeProblemSelectionButton)}
        </div>
    </div>
}

export function ProblemSelector() {
    const [selectedProblem, setProblem] = useState("")

    const goToHomeScreen = useCallback(() => {
        setProblem("")
    }, [setProblem])

    if (selectedProblem) {
        return <GameLoader problemFile={selectedProblem} goToHomeScreen={goToHomeScreen}></GameLoader>
    } else {
        return <ProblemSelectionPane setProblem={setProblem}></ProblemSelectionPane>
    }
}