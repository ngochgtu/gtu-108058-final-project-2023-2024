import {IsNotEmpty, IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateSkillDto {
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(2000)
    @IsNotEmpty()
    readonly type: string;
}