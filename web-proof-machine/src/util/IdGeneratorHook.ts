import { useRef } from "react"

export function useIdGenerator(prefix: string): [() => string, () => void] {
    const counter = useRef(0)

    function getId(): string {
        counter.current = counter.current + 1
        return prefix + counter.current
    }

    function reset(): void {
        counter.current = 0
    }

    return [getId, reset]
}