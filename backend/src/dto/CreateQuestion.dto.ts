import {IsNotEmpty, IsString, MaxLength} from 'class-validator';

export class CreateQuestionDto {

    @IsString()
    @IsNotEmpty()
    skill_names: string[];

    @IsString()
    @MaxLength(2000)
    @IsNotEmpty()
    question: string;

    @IsString()
    @IsNotEmpty()
    fake_answers: string[];

    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    answer: string;

    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    openai_question: string;
}