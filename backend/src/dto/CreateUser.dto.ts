import {IsNotEmpty, IsString, MaxLength, IsEmail} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly username: string;
    @IsEmail()
    @MaxLength(500)
    @IsNotEmpty()
    readonly email?: string;
    @MaxLength(500)
    @IsNotEmpty()
    readonly password?: string;
}