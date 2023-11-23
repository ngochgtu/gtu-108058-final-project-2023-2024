import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength,} from "class-validator";

export class CreateUsersPoints{
    @IsEmail()
    @MaxLength(500)
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @IsNumber()
    points: number;
    @IsNotEmpty()
    @IsString()
    skill: Array<string>
}