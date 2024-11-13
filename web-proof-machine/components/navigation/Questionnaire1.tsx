"use client"

import { RadioButtons } from "components/primitive/form/RadioButtons";
import { SubmitButton } from "components/primitive/form/SubmitButton";
import { TextArea } from "components/primitive/form/TextArea";
import { TextField } from "components/primitive/form/TextField";
import { useState } from "react";

function isCompletedForm(formData) {
    return formData.educationLevel && formData.mathTraining && formData.firstLanguage;
}

export function Questionnaire1() {
    const [formData, setFormData] = useState({
        educationLevel: '',
        mathTraining: '',
        firstLanguage: '',
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
            // Send the form data to the server
            console.log(formData);
        }
    };

    const educationOptions = {
        legend: 'What is your highest level of education completed?',
        options: [
            { value: 'highschool', label: 'High school diploma or equivalent' },
            { value: 'college', label: 'Some College, no degree' },
            { value: 'bachelors', label: "Bachelor's Degree" },
            { value: 'masters', label: "Master's Degree" },
            { value: 'doctor', label: "Doctoral Degree" },
        ],
    }

    const mathematicalTrainingOptions = {
        legend: 'What is your level of mathematical training?',
        options: [
            { value: 'highschool', label: 'High school level' },
            { value: 'undergraduate', label: 'Undergraduate level' },
            { value: 'graduate', label: 'Graduate level or higher' },
        ],
    }

    return <>
        <div className="w-screen flex flex-col items-center">
            <h1 className="text-xl py-14">Please answer a few questions about yourself before continuing!</h1>
            <form onSubmit={handleSubmit}>
                <RadioButtons name="educationLevel" {...educationOptions} onChange={handleChange} />
                <RadioButtons name="mathTraining" {...mathematicalTrainingOptions} onChange={handleChange} />
                <TextField label="Please tell us your first language:" name="firstLanguage" onChange={handleChange} />
                <TextArea label="Please provide any feedback you might have about the game and the clarity of instructions:"
                    name="feedback" onChange={handleChange} />
                <SubmitButton onSubmit={handleSubmit} />
            </form>
        </div>
    </>;
}