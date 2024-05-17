"use client"

import { useEffect } from "react";
import { ProblemSelection } from "./ProblemSelection";
import { setConfiguration } from "lib/study/LevelConfiguration";

export function StudyScreen({ config }: { config: string }) {

    useEffect(() => {
        setConfiguration(config)
    }, [])

    return <div className="w-screen text-center pt-10">
        <div>
            <h1 className="text-2xl p-8">Welcome to the Gadgets Game!</h1>
            <ProblemSelection />
        </div>
    </div>
}
