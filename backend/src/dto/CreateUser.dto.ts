import {IsNotEmpty, IsString, MaxLength} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly username: string;
}