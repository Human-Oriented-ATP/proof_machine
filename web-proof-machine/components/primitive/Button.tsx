export default function Button(props) {
    return <button className="border-2 border-black rounded-lg p-2.5 m-2.5 hover:bg-black hover:text-white"
        {...props}>
        {props.children}
    </button>
}