import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
export class RegisterUserDto {
    @IsString()
    @MinLength(2, { message: 'prenomRepresentantLegal must have atleast 2 characters.' })
    @IsNotEmpty()
    prenomRepresentantLegal: string;
  
    @IsString()
    @MinLength(2, { message: 'nomRepresentantLegal must have atleast 2 characters.' })
    @IsNotEmpty()
    nomRepresentantLegal: string;
  
    @IsInt()
    telRepresentantLegal: number;

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsAlphanumeric(null, {
      message: 'Username does not allow other than alpha numeric chars.',
    })
    username: string;
  
    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsString()
    ville: string;

    @IsString()
    Gouvernorat: string;

    @IsInt()
    matriculeFiscale: number;
  
    @IsNotEmpty()
    @Matches(passwordRegEx, {
      message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
    })
    password: string;
}
