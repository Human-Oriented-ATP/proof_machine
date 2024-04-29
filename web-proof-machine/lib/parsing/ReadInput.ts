import { InitializationData } from "../game/Initialization"
import { buildAst } from "./Semantics"
import { readFileSync } from "fs"

const problemsFolder = "../../../problems/"

export function readProblemFile(fileName: string): InitializationData {
    const text = readFileSync(`${problemsFolder}/${fileName}.pl`).toString()
    return buildAst(text)
}