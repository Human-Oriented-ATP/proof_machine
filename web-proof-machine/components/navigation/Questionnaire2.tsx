"use client"

import { RadioButtons } from "components/primitive/form/RadioButtons";
import { SubmitButton } from "components/primitive/form/SubmitButton";
import { TextArea } from "components/primitive/form/TextArea";
import { submitQuestionnaire2 } from "lib/study/submitQuestionnaire";
import { clientSideCookies } from "lib/util/ClientSideCookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function isCompletedForm(formData) {
    return formData.difficulty && formData.enjoyableness && formData.strategies
}

const difficultyOptions = {
    legend: 'How difficult do you find the game?',
    options: [
        { value: -2, label: 'Very difficult' },
        { value: -1, label: 'Difficult' },
        { value: 0, label: 'Neutral' },
        { value: 1, label: 'Easy' },
        { value: 2, label: 'Very easy' },
    ],
}

const funOptions = {
    legend: 'How enjoyable do you find the game?',
    options: [
        { value: -2, label: 'Very enjoyable' },
        { value: -1, label: 'Enjoyable' },
        { value: 0, label: 'Neutral' },
        { value: 1, label: 'Unenjoyable' },
        { value: 2, label: 'Very unenjoyable' },
    ]
}

export function Questionnaire2({ redirectTo = "../" }: { redirectTo?: string }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        difficulty: undefined,
        enjoyableness: undefined,
        strategies: '',
        feedback2: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isCompletedForm(formData)) {
            alert("Please fill out all fields before submitting!");
        } else {
            submitQuestionnaire2(JSON.stringify(formData));
            clientSideCookies.set('questionnaire2Submitted', '1');
            router.push(redirectTo)
        }
    };

    useEffect(() => {
        if (clientSideCookies.get('questionnaire2Submitted')) {
            router.push(redirectTo);
        }
    }, [])

    return <div className="w-screen flex flex-col items-center">
        <div className="max-w-screen-md">
            <h1 className="text-xl pt-14">Thank you for playing this long! Could you please answer the following questions?</h1>
            <div className="text-left p-4">This questionnaire marks the end of your participation in the study.<br />
                After submission you will be provided with a code which you can enter on Prolific.</div>
            <form onSubmit={handleSubmit}>
                <RadioButtons name="difficulty" {...difficultyOptions} onChange={handleChange} />
                <RadioButtons name="enjoyableness" {...funOptions} onChange={handleChange} />
                <TextArea label="Can you describe strategies that are helpful to you in playing the game?"
                    name="strategies" onChange={handleChange} />
                <TextArea label="Please provide any feedback you might have about the game/the study:"
                    name="feedback2" onChange={handleChange} />
                <SubmitButton onSubmit={handleSubmit} text="Submit" />
            </form>
            {/* <div className="text-center text-sm pt-4 pb-20">After submitting you will be redirected to the main page and can continue playing as you like.</div> */}
        </div>
    </div>
}