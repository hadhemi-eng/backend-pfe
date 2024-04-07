import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, MinLength, IsDate, IsDateString } from 'class-validator';
import { Adherent } from '../entities/adherent.entity';

enum AdherentState {
  ACTIVE = 'active',
  WAITING = 'en attente',
  REJECTED = 'rejeté',
}

enum AdherentEtat {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
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
  @IsEmail({}, { message: 'Please provide a valid Email.' })
  email: string;

  @IsString()
  ville: string;

  @IsString()
  Gouvernorat: string;

  @IsDateString()
  dateInscription: Date;

  @IsEnum(AdherentState)
  state: AdherentState;

  @IsEnum(AdherentEtat)
  etat: AdherentEtat;
}

export class AdherentDTO {
  id: number;
  prenom: string;
  nom: string;
  tel: number;
  email: string; // Renamed from mail to email
  dateInscription: Date;
  state: AdherentState;
  etat: AdherentEtat;
  adress: { ville: string; adresse: string };

  constructor(adherent: Adherent) {
    this.id = adherent.id;
    this.prenom = adherent.prenom;
    this.nom = adherent.nom;
    this.tel = adherent.tel;
    this.email = adherent.mail; // Renamed from adherent.mail to adherent.email
    this.dateInscription = adherent.dateInscription;
    this.state = adherent.state;
    this.etat = adherent.etat;
    this.adress = {
      ville: adherent.adress.ville,
      adresse: adherent.adress.adresse,
    };
  }
}
