export function RadioButtons(props) {
    return <fieldset className="pb-4">
        <legend className="font-bold">{props.legend}</legend>
        <div className="pl-2">
            {props.options.map((option, id) => {
                return <label key={id} className="block">
                    <input type="radio" value={option.value} {...props} />
                    <span className="pl-2">{option.label}</span>
                </label>
            })}
        </div>
    </fieldset>
}