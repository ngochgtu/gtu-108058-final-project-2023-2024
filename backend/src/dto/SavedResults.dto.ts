import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateSavedResult{
    @IsNotEmpty()
    saved_result: Array<{
        skill_names: string[];
        question: string;
        fake_answers: string[];
        answer: string;
        difficulty: string;
        session_id: string;
        usersAnswers: string | null; 
    }>;
    @IsNotEmpty()
    sessionId: string;
}