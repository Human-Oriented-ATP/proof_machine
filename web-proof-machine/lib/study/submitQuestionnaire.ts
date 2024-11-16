"use server"

import { sql } from "@vercel/postgres";
import { getPlayerId } from "./synchronizeHistory";
import { StudyConfiguration } from "./Types";
import { cookies } from "next/headers";
import { getProblemList } from "./LevelConfiguration";

const STUDY_DURATION = 45 * 60 * 1000;

export async function submitQuestionnaire1(formData: string) {
    "use server"
    const playerId = await getPlayerId();
    const questionnaire = JSON.parse(formData);
    console.log(questionnaire);
    await sql`INSERT INTO questionnaire_responses (respondent_id, education_level, math_training, math_regularity, 
        specialty, first_language, prolific_id, feedback)
        VALUES (${playerId}, ${questionnaire.educationLevel}, ${questionnaire.mathTraining}, ${questionnaire.mathRegularity}, 
        ${questionnaire.specialty}, ${questionnaire.firstLanguage}, ${questionnaire.prolific}, ${questionnaire.feedback})`;
}

export async function hasSubmittedQuestionnaire1() {
    const submitted = cookies().get("questionnaire1Submitted");
    return submitted?.value === '1';
}

export async function submitQuestionnaire2(formData) {
    "use server"
    const playerId = await getPlayerId();
    const questionnaire = JSON.parse(formData);
    await sql`UPDATE questionnaire_responses
    SET 
        difficulty = ${questionnaire.difficulty}, 
        enjoyableness = ${questionnaire.enjoyableness}, 
        strategies = ${questionnaire.strategies}, 
        feedback2 = ${questionnaire.feedback2}
    WHERE respondent_id = ${playerId};
`;
}

export async function hasSubmittedQuestionnaire2() {
    const submitted = cookies().get("questionnaire2Submitted");
    return submitted?.value === '1';
}

export async function hasCompleted80PercentOfProblems(config: StudyConfiguration) {
    "use server"
    const problems = getProblemList(config);
    const completed = cookies().get("completed");
    if (completed === undefined) {
        return false
    } else {
        const completedProblems = completed.value.split(",");
        const ratioSolved = completedProblems.length / problems.length;
        return ratioSolved >= 0.8;
    }
}

export async function timeIsOver() {
    "use server"
    const startTime = cookies().get("start_time");
    if (!startTime) {
        return false
    } else {
        const startDate = new Date(startTime.value)
        return startDate.valueOf() + STUDY_DURATION < Date.now().valueOf();
    }
}

export async function progressSufficientForQuestionnaire2(config) {
    "use server"
    const completed = await hasCompleted80PercentOfProblems(config)
    const timeOver = await timeIsOver();
    return completed || timeOver;
}
