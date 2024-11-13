export function TextArea(props) {
    return <label className="block pb-4">
        <div className="pb-1 font-bold">{props.label}</div>
        <textarea className="w-full w-full border-2 border-dark-gray rounded-lg p-2 h-48" {...props} />
    </label>
}