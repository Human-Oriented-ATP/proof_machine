import { useState } from "react"

export function useIdGenerator(prefix: string) {
    const [idCounter, setIdCounter] = useState(0)

    function getId(): string {
        setIdCounter(idCounter + 1)
        return prefix + idCounter
    }

    return getId
}