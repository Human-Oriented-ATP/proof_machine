"use client" 

import Button from "components/primitive/buttons/Default";
import { resetProgress } from "lib/study/CompletedProblems";
import { useRouter } from "next/navigation";

export function ResetProgressButton() {
    const router = useRouter();
    return <Button onClick={() => { resetProgress(); alert("Progress has been reset."); router.refresh() }}>
        Reset progress</Button>
}
