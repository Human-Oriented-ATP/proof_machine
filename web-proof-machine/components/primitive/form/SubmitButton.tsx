import Button from "../buttons/Default";

export function SubmitButton(props) {
    return <div className="py-6 flex flex-row justify-center">
        <Button onClick={props.onSubmit} moreClassnames="bg-green">{props.text}</Button>
    </div>
}