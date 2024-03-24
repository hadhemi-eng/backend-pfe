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
export class CreateAdherentDto {
    @IsString()
    @MinLength(2, { message: 'prenomRepresentantLegal must have atleast 2 characters.' })
    @IsNotEmpty()
    prenom: string;
  
    @IsString()
    @MinLength(2, { message: 'nomRepresentantLegal must have atleast 2 characters.' })
    @IsNotEmpty()
    nom: string;

  
    @IsInt()
    tel: number;
  
    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsString()
    ville: string;

    @IsString()
    Gouvernorat: string;
  }

