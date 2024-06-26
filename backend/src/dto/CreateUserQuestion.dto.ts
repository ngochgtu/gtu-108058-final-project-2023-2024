import {IsNotEmpty, IsString, MaxLength} from 'class-validator';

export class CreateUserQuestionDto {
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly question_id: string;

    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly answer: string;
}