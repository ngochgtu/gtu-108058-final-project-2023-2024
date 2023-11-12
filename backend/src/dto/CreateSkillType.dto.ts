import {IsNotEmpty, IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateSkillTypeDto {
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly status: string;
}