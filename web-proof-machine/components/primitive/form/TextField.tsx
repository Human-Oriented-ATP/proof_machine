export function TextField(props) {
    return <label className="block pb-4">
        <div className="pb-1 font-bold">{props.label}</div>
        <input type="text" className="w-full border-2 border-black rounded-lg p-2" {...props} />
    </label>
}