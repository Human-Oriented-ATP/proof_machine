"use server"

import { sql } from "@vercel/postgres";
import { getPlayerId } from "./synchronizeHistory";

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
    "use server"
    const playerId = await getPlayerId();
    const result = await sql`SELECT * FROM questionnaire_responses WHERE respondent_id = ${playerId}`;
    return result.rows.length > 0;
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
    "use server"
    const playerId = await getPlayerId();
    const result = await sql`SELECT * FROM questionnaire_responses WHERE respondent_id = ${playerId} AND difficulty IS NOT NULL`;
    return result.rows.length > 0;
}