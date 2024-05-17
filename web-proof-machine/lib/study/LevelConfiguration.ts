"use client"

import { StudyConfiguration } from "./Types";

import pilot1 from "study_setup/pilot1.json"
import allProblems from "study_setup/all-problems.json"
import { clientSideCookies } from "lib/util/ClientSideCookies";

export function setConfiguration(configString: string): void {
    clientSideCookies.set("config", configString, 365)
}

export function getActiveConfigurationIdentifier(): string | null {
    const config = clientSideCookies.get("config")
    return config
}

export function getActiveConfiguration(): StudyConfiguration | null {
    const configIdentifier = getActiveConfigurationIdentifier()
    switch (configIdentifier) {
        case "pilot1":
            return pilot1
        case "all-problems":
            return allProblems
    }
    return null
}