import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';
import { Adherent } from './entities/adherent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adress } from './entities/adress.entity';

@Injectable()
export class AdherentService {
  constructor(
    @InjectRepository(Adherent) private readonly adherentRepository: Repository<Adherent>,
    @InjectRepository(Adress) private readonly adressRepository: Repository<Adress>,
  ) {}
  async create(createAdherentDto: CreateAdherentDto) {
    const adherent: Adherent = new Adherent();
    adherent.prenom = createAdherentDto.prenom;
    adherent.nom = createAdherentDto.nom;
    const address: Adress = new Adress();
  address.ville = createAdherentDto.ville;
  address.region = createAdherentDto.Gouvernorat;

  // Assign the address to the adherent
  const savedAddress = await this.adressRepository.save(address);
  adherent.adress = savedAddress;

    adherent.tel = createAdherentDto.tel;
    adherent.mail = createAdherentDto.email;
    return this.adherentRepository.save(adherent);
  }

  findAll() {
    return this.adherentRepository.find();
  }

  async findOne(id: number) {
    const adherent = await this.adherentRepository.findOneBy({id:id});
    if (!adherent) {
      throw new NotFoundException('Adherent not found');
    }
    return adherent;
  }
  async filterAdherentsByFirstName(searchTerm: string): Promise<any[]> {
    return (await this.adherentRepository.find()).filter(adherent =>
      adherent.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  async filterAdherentsByName(searchTerm: string): Promise<any[]> {
    return (await this.adherentRepository.find()).filter(adherent =>
      adherent.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  async filterAdherentsByPhone(searchTerm: number): Promise<any[]> {
    return (await this.adherentRepository.find()).filter(adherent =>
      adherent.tel.toString().includes(searchTerm.toString())
    );
  }
  async update(id: number, updateAdherentDto: UpdateAdherentDto) {
    const adherent = await this.adherentRepository.findOneBy({id:id});
    if (!adherent) {
      throw new NotFoundException('Adherent not found');
    }

    // Apply updates from the DTO to the adherent entity
    if (updateAdherentDto.prenom) {
      adherent.prenom = updateAdherentDto.prenom;
    }
    if (updateAdherentDto.nom) {
      adherent.nom = updateAdherentDto.nom;
    }
    if (updateAdherentDto.tel) {
      adherent.tel = updateAdherentDto.tel;
    }
    if (updateAdherentDto.email) {
      adherent.mail = updateAdherentDto.email;
    }
    // Apply other updates as needed

    // Save the updated adherent entity back to the database
    return this.adherentRepository.save(adherent);
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
