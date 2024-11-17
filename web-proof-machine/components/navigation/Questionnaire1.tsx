"use client"

import { RadioButtons } from "components/primitive/form/RadioButtons";
import { SubmitButton } from "components/primitive/form/SubmitButton";
import { TextArea } from "components/primitive/form/TextArea";
import { TextField } from "components/primitive/form/TextField";
import { submitQuestionnaire1 } from "lib/study/submitQuestionnaire";
import { clientSideCookies } from "lib/util/ClientSideCookies";
import { useRouter } from "next/navigation";
import { useState } from "react";

function isCompletedForm(formData) {
    return formData.educationLevel && formData.mathTraining && formData.firstLanguage;
}

export default function Questionnaire1() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        educationLevel: '',
        mathTraining: '',
        specialty: '',
        firstLanguage: '',
        prolific: '',
        feedback: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isCompletedForm(formData)) {
            alert("Please fill out all fields before submitting!");
        } else {
            submitQuestionnaire1(JSON.stringify(formData));
            clientSideCookies.set('questionnaire1Submitted', '1');
            console.log(formData);
            router.push('./tim_easy10');
        }
    };

    const educationOptions = {
        legend: 'What is your highest level of education completed?',
        options: [
            { value: 0, label: 'High school diploma or equivalent' },
            { value: 1, label: 'Some College, no degree' },
            { value: 2, label: "Bachelor's Degree" },
            { value: 3, label: "Master's Degree" },
            { value: 4, label: "Doctoral Degree" },
        ],
    }

    const mathematicalTrainingOptions = {
        legend: 'What is your level of mathematical training?',
        options: [
            { value: 0, label: 'High school level' },
            { value: 1, label: 'Undergraduate level' },
            { value: 2, label: 'Graduate level or higher' },
        ],
    }


    const mathRegularityOptions = {
        legend: 'Over the past two years, how regularly did you engage with mathematically-demanding problems?',
        options: [
            { value: 1, label: 'Every day' },
            { value: 2, label: 'A couple of times per week' },
            { value: 3, label: 'A couple of times per month' },
            { value: 4, label: 'A couple of times per year' },
            { value: 5, label: 'Never' },
        ],
    }

    return <>
        <div className="w-screen flex flex-col items-center">
            <h1 className="text-xl pt-14">You've completed the tutorial!</h1>
            <div className="text-left p-4">Please answer a few questions about yourself before continuing.</div>
            <form onSubmit={handleSubmit}>
                <RadioButtons name="educationLevel" {...educationOptions} onChange={handleChange} />
                <RadioButtons name="mathTraining" {...mathematicalTrainingOptions} onChange={handleChange} />
                <RadioButtons name="mathRegularity" {...mathRegularityOptions} onChange={handleChange} />
                <TextArea label="Please briefly describe what kinds of mathematics problems you work on (and why you work on them):" name="specialty" onChange={handleChange} />
                <TextField label="Please tell us your first language:" name="firstLanguage" onChange={handleChange} />
                <TextArea label="Please provide any feedback you might have about the game and the clarity of instructions:"
                    name="feedback" onChange={handleChange} />
                <TextField label="If you are a Prolific user, please enter your Prolific ID" name="prolific" onChange={handleChange} />
                <SubmitButton onSubmit={handleSubmit} />
            </form>
        </div>
    </>;
}