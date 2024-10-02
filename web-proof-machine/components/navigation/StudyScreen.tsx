"use client"

import { StudyConfiguration } from "lib/study/Types";
import { ProblemSelection } from "./ProblemSelection";

export default function StudyScreen({ config }: { config: StudyConfiguration }) {
    return <div className="w-screen text-center pt-10">
        <div>
            <h1 className="text-2xl p-8">Welcome to the Gadgets Game!</h1>
            <ProblemSelection config={config} />
        </div>
    </div>
}