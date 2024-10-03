"use client"

import { clientSideCookies } from "lib/util/ClientSideCookies";

export function markLevelCompleted(problemId: string) {
    const currentlyCompleted = clientSideCookies.get("completed")
    const newValue = currentlyCompleted === undefined ? problemId : `${currentlyCompleted},${problemId}`
    clientSideCookies.set("completed", newValue, 365)
}

export function getCompletedProblems(): string[] {
    const completedProblemsString = clientSideCookies.get("completed")
    if (completedProblemsString === null) {
        return []
    } else {
        return completedProblemsString.split(",")
    }
}

export async function resetProgress() {
    clientSideCookies.delete("completed")
}