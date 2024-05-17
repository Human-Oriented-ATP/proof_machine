"use server"

import { promises as fs } from "fs"

export async function loadProblemList(): Promise<string[]> {
    const pathToProblems = process.cwd() + "/problems/"
    const folderContent = await fs.readdir(pathToProblems)
    const prologFiles = folderContent.filter(file => file.toLowerCase().endsWith(".pl"))
    const withExtensionRemoved = prologFiles.map(file => file.slice(0, -3))
    return withExtensionRemoved
}