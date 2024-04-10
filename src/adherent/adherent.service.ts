import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AdherentDTO, CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';
import { Adherent } from './entities/adherent.entity';
import { InjectConnection, InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, Repository, getConnection } from 'typeorm';
import { Adress } from './entities/adress.entity';

@Injectable()
export class AdherentService {
  private readonly logger = new Logger(AdherentService.name);

  adherents: any;
  constructor(
    @InjectRepository(Adherent) private readonly adherentRepository: Repository<Adherent>,
    @InjectRepository(Adress) private readonly adressRepository: Repository<Adress>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  async create(createAdherentDto: CreateAdherentDto) {
    const adherent: Adherent = new Adherent();
    adherent.prenom = createAdherentDto.prenom;
    adherent.nom = createAdherentDto.nom;
    const address: Adress = new Adress();
  address.ville = createAdherentDto.ville;
  address.adresse = createAdherentDto.Gouvernorat;

  // Assign the address to the adherent
  const savedAddress = await this.adressRepository.save(address);
  adherent.adress = savedAddress;

    adherent.tel = createAdherentDto.tel;
    adherent.mail = createAdherentDto.email;
    return this.adherentRepository.save(adherent);
  }

  async findAll() {
    return (await this.adherentRepository.find({ relations: ['adress'] ,order: { dateInscription: 'DESC'}})).map(adherent => new AdherentDTO(adherent));
  }

  async findOne(id: number) {
    const adherent = await this.adherentRepository.findOneBy({id:id});
    if (!adherent) {
      throw new NotFoundException('Adherent not found');
    }
    return adherent;
  }
 
  async update(id: number, updateAdherentDto: UpdateAdherentDto) {
    const adherent = await this.adherentRepository.findOneBy({id:id});
    if (!adherent) {
      throw new NotFoundException('Adherent not found');
    }
  
    // Update adherent properties if they are not null or undefined in the DTO
    if (updateAdherentDto.prenom !== null && updateAdherentDto.prenom !== undefined) {
      adherent.prenom = updateAdherentDto.prenom;
    }
    if (updateAdherentDto.nom !== null && updateAdherentDto.nom !== undefined) {
      adherent.nom = updateAdherentDto.nom;
    }
    if (updateAdherentDto.tel !== null && updateAdherentDto.tel !== undefined) {
      adherent.tel = updateAdherentDto.tel;
    }
    if (updateAdherentDto.email !== null && updateAdherentDto.email !== undefined) {
      adherent.mail = updateAdherentDto.email;
    }
    // Repeat the pattern for other properties
    if (updateAdherentDto.ville !== null && updateAdherentDto.ville !== undefined) {
      adherent.adress.ville = updateAdherentDto.ville;
    }
    if (updateAdherentDto.Gouvernorat !== null && updateAdherentDto.Gouvernorat !== undefined) {
      adherent.adress.adresse = updateAdherentDto.Gouvernorat;
    }
    if (updateAdherentDto.dateInscription !== null && updateAdherentDto.dateInscription !== undefined) {
      adherent.dateInscription = updateAdherentDto.dateInscription;
    }
    if (updateAdherentDto.state !== null && updateAdherentDto.state !== undefined) {
      adherent.state = updateAdherentDto.state;
    }
    if (updateAdherentDto.etat !== null && updateAdherentDto.etat !== undefined) {
      adherent.etat = updateAdherentDto.etat;
    }  
    // Save and return the updated adherent
    return this.adherentRepository.save(adherent);
  }
  async executeCustomQuery(nom: string,prenom: string,tel: string): Promise<Adherent[]> {
        // Utiliser TypeORM pour construire la requête de manière sécurisée
        const queryBuilder = this.adherentRepository.createQueryBuilder('adherent');
    
        if (nom !== undefined) {
            queryBuilder.andWhere('adherent.nom = :nom', { nom });
        }
    
        if (prenom !== undefined) {
            queryBuilder.andWhere('adherent.prenom = :prenom', { prenom });
        }
    
        if (tel !== undefined) {
            queryBuilder.andWhere('adherent.tel = :tel', { tel });
        }
    
        // Exécuter la requête et renvoyer les résultats
        const result= queryBuilder.getMany();
        this.logger.log(`Filtered Adherents: ${result}`);
        return result;
    
  }

  remove(id: number) {
    return this.adherentRepository
    .createQueryBuilder()
    .delete()
    .from(Adherent)
    .where('id = :id', { id })
    .execute()
  ;
  }
}
