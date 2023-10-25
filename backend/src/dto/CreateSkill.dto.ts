import {IsNotEmpty, IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateSkillDto {
    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    readonly type: string;
}