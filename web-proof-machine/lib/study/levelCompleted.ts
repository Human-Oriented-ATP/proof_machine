"use server"

import { cookies } from "next/headers";

const MILLISECONDS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365

export async function markLevelCompleted(problemId: string) {
    const currentlyCompleted = cookies().get("completed")
    const newValue = currentlyCompleted === undefined ? problemId : `${currentlyCompleted.value},${problemId}`
    cookies().set("completed", newValue, { expires: new Date(Date.now() + MILLISECONDS_IN_A_YEAR) })
}

export async function getCompletedProblems(): Promise<string> {
    const completed = cookies().get("completed")
    if (completed === undefined) {
        return ""
    } else {
        return completed.value
    }
}

export async function resetProgress() {
    cookies().delete("completed")
}