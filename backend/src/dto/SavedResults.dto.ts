import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

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

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string; 
    @IsNotEmpty() 
    skill: Array<string>;
    @IsNotEmpty()
    @IsNumber()  
    points: number;
    @IsNotEmpty()
    @IsNumber()  
    counter: number;  
}