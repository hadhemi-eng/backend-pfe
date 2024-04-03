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
import { Adherent } from '../entities/adherent.entity';

// Define the regular expression for password validation
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
enum AdherentState {
  ACTIVE = 'active',
  WAITING = 'waiting',
  REJECTED = 'rejected',
}
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
export class AdherentDTO {
  id: number;
  prenom: string;
  nom: string;
  tel: number;
  mail: string;
  dateInscription: Date;
  state: AdherentState;
  adress: { ville: string, adresse: string };

  constructor(adherent: Adherent) {
    this.id = adherent.id;
    this.prenom = adherent.prenom;
    this.nom = adherent.nom;
    this.tel = adherent.tel;
    this.mail = adherent.mail;
    this.dateInscription = adherent.dateInscription;
    this.state = adherent.state;
    this.adress = {
      ville: adherent.adress.ville,
      adresse: adherent.adress.adresse
    };
  }
}