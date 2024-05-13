"use client"

import { getPlayerId } from "lib/synchronizeHistory"
import { useEffect, useState } from "react"

export default async function PlayerIdDisplay() {
    const [playerId, setPlayerId] = useState("")

    useEffect(() => {
        async function loadPlayerId() {
            try {
                const playerId = await getPlayerId()
                setPlayerId(playerId)
            } catch (e) {
                console.log("Error retrieving player id.")
                console.log(e)
            }
        }
        loadPlayerId()
    }, [])

    return <span>{playerId}</span>
}