import { CheckCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { GameLevelButtonProps } from "lib/study/Types";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import Button from "./Default";

function AdjustableButton( { displayNamesAs = "", ...props }) {
    let classNames = "w-28 text-sm md:w-36 md:text-base";
    if (displayNamesAs === "number") {
        classNames = "w-16";
    }
    return <Button {...props} moreClassnames={twJoin("h-16", classNames)} />;
}

export function GameLevelButton(props: GameLevelButtonProps) {
    if (!props.isBlocked) {
        return <div className="relative">
            <Link href={props.href}>
                {props.isSolved ?
                    <CheckCircledIcon className="w-6 h-6 float-right rounded-full bg-green absolute right-0 bottom-0 translate-x-1 translate-y-1" /> : <></>}
                <AdjustableButton displayNamesAs={props.config.displayNamesAs}>{props.label}</AdjustableButton>
            </Link>
        </div>;
    } else {
        return <div className="relative">
            <AdjustableButton highlightOnHover={false}>
                <LockClosedIcon className="w-6 h-6 inline" />
            </AdjustableButton>
        </div>;
    }
}
