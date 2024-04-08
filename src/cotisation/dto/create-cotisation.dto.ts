import {
    IsAlphanumeric,
    IsDateString,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
export class CreateCotisationDto {
    @IsString()
    @IsNotEmpty()
    type: string;
  
    @IsInt()
    montant: number;
    @IsDateString()
    date: Date;
}
