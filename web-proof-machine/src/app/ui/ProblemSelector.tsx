import { useCallback, useState } from "react";
import { GameLoader } from "./GameLoader";

interface ProblemSelectionPaneProps {
    problems: string[]
    setProblem: (problem: string) => void
}

function ProblemSelectionPane(props: ProblemSelectionPaneProps) {
    function makeProblemSelectionButton(name: string): JSX.Element {
        return <button onClick={e => props.setProblem(name)}>{name}</button>
    }

    return <div className="problemSelectionPane">
        <h2>Choose the game you want to play:</h2>
        <div className="problemSelectionButtons">
            {props.problems.map(makeProblemSelectionButton)}
        </div>
    </div>
}

interface ProblemSelectorProps {
    problems: string[]
}

export default function ProblemSelector(props: ProblemSelectorProps) {
    const [selectedProblem, setProblem] = useState("")

    const goToHomeScreen = useCallback(() => {
        setProblem("")
    }, [setProblem])

    if (selectedProblem) {
        return <GameLoader problemFile={selectedProblem} goToHomeScreen={goToHomeScreen}></GameLoader>
    } else {
        return <ProblemSelectionPane problems={props.problems} setProblem={setProblem}></ProblemSelectionPane>
    }
}