import { IsAlphanumeric, IsEmail, IsNotEmpty, IsInt, IsString, MinLength } from 'class-validator';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class RegisterUserDto {
    @IsString()
    @MinLength(2, { message: 'prenomRepresentantLegal must have at least 2 characters.' })
    @IsNotEmpty()
    prenomRepresentantLegal: string;

    @IsString()
    @MinLength(2, { message: 'nomRepresentantLegal must have at least 2 characters.' })
    @IsNotEmpty()
    nomRepresentantLegal: string;

    @IsInt()
    telRepresentantLegal: number;

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have at least 3 characters.' })
    username: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide a valid Email.' })
    email: string;

    @IsString()
    ville: string;

    @IsString()
    Gouvernorat: string;

    @IsInt()
    matriculeFiscale: number;

    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    password: string;
}
