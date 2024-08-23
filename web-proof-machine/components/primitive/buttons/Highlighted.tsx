
export function HighlightedButton(props) {
    return <button className="border-2 border-black rounded-lg p-2.5 bg-green 
                              disabled:bg-palette-gray disabled:opacity-40 disabled:cursor-not-allowed 
                              enabled:hover:bg-black enabled:hover:text-white"
        {...props}>
        {props.children}
    </button>;
}
