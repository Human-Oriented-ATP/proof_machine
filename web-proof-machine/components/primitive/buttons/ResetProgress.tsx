import { resetProgress } from "lib/study/CompletedProblems";
import { useRouter } from "next/navigation";
import Button from "./Default";


export function ResetProgressButton() {
    const router = useRouter();
    return <Button onClick={() => { resetProgress(); alert("Progress has been reset."); router.refresh(); }}>
        Reset progress
    </Button>;
}
