import {IsNumber, IsString,MaxLength, IsEmail, IsNotEmpty } from 'class-validator';


export class CreateUsersDto {
    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: string
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @MaxLength(20)
    password: string;
    @IsString()
    @IsNotEmpty()
    skill: string;
    @IsNumber()
    @IsNotEmpty()
    points: number;

}