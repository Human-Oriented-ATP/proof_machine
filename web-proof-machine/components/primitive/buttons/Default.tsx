import { twJoin } from "tailwind-merge"

export default function Button({ highlightOnHover = true, moreClassnames = "", ...props }) {
    return <button className={twJoin("border-2 border-black rounded-lg p-2.5", highlightOnHover && "hover:bg-black hover:text-white", moreClassnames)}
        {...props}>
        {props.children}
    </button>
}