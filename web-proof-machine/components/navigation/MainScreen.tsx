"use client"

import Link from "next/link"
import Button from "../primitive/Button"
import { resetProgress } from "lib/study/CompletedProblems"
import { ProblemSelection } from "./ProblemSelection"
import { useEffect } from "react"
import { setConfiguration } from "lib/study/LevelConfiguration"
import { useRouter } from "next/navigation"

const CONFIG_IDENTIFIER = "all-problems"

export default function MainScreen() {
    const router = useRouter()

    useEffect(() => {
        setConfiguration(CONFIG_IDENTIFIER)
    }, [])

    return <div className="w-screen text-center pt-10">
        <h1 className="text-2xl p-4">Welcome to the Gadgets Game!</h1>

        <h2 className="text-xl p-4">You might find the following interesting:</h2>
        <div>
            {/* <Button onClick={() => createTable({})}>Create Table</Button> */}
            <div className="m-1.5 inline-block">
                <Link href="pilot1">
                    <Button><span className="text-red">Participate in pilot 1</span></Button>
                </Link>
            </div>
            <div className="m-1.5 inline-block">
                <Button onClick={() => { resetProgress(); alert("Progress in the pilot has been reset."); router.refresh() }}>
                    Reset progress</Button>
            </div>
            <div className="m-1.5 inline-block">
                <Link href="view">
                    <Button>View Game History</Button>
                </Link>
            </div>
        </div>

        <h2 className="text-xl p-4">Choose the game you want to play:</h2>
        <div>
            <ProblemSelection configIdentifier={CONFIG_IDENTIFIER} />
        </div>
    </div>
}