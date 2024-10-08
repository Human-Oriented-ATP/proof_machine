import { CheckCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import Button from "./Default";

function AdjustableButton({ isSquare = false, ...props }) {
    let classNames = "w-28 text-sm md:w-36 md:text-base";
    if (isSquare === true) {
        classNames = "w-16";
    }
    return <Button {...props} moreClassnames={twJoin("h-16", classNames)} />;
}

export interface GameLevelButtonProps {
    label: string
    href: string
    isSolved: boolean
    isUnlocked: boolean
    isSquare: boolean
}

export function LockedButton() {
    return <AdjustableButton highlightOnHover={false} isSquare={true}>
        <LockClosedIcon className="w-6 h-6 inline" />
    </AdjustableButton>
}

export function GameLevelButton(props: GameLevelButtonProps) {
    if (props.isUnlocked) {
        return <Link href={props.href}>
                {props.isSolved ?
                    <CheckCircledIcon className={twJoin("w-6 h-6 float-right rounded-full bg-green absolute right-0 bottom-0 translate-y-1", 
                                                props.isSquare && " translate-x-1", !props.isSquare && " translate-x-3")} /> : <></>}
                <AdjustableButton isSquare={props.isSquare}>{props.label}</AdjustableButton>
            </Link>
    } else {
        return <LockedButton />
    }
}
