import Button from "../buttons/Default";

export function SubmitButton(props) {
    return <div className="pt-2 pb-20 flex flex-row justify-center">
        <Button onClick={props.onSubmit} moreClassnames="bg-green">Continue</Button>
    </div>
}