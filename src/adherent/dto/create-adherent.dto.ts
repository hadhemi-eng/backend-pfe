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

// Define the regular expression for password validation
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateAdherentDto {
  @IsString()
  @MinLength(2, { message: 'prenom must have at least 2 characters.' })
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @MinLength(2, { message: 'nom must have at least 2 characters.' })
  @IsNotEmpty()
  nom: string;

  @IsInt()
  tel: number;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid Email.' }) // Pass an empty object instead of null
  email: string;

  @IsString()
  ville: string;

  @IsString()
  Gouvernorat: string;
}
