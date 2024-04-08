import { Injectable } from '@nestjs/common';
import { CreateCotisationDto } from './dto/create-cotisation.dto';
import { UpdateCotisationDto } from './dto/update-cotisation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cotisation } from './entities/cotisation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CotisationService { constructor(
  @InjectRepository(Cotisation) private readonly cotisationRepository: Repository<Cotisation>,
) {}
async create(createCotisationDto: CreateCotisationDto) {
  return this.cotisationRepository.save(createCotisationDto);
}

async findAll() {
  return this.cotisationRepository.find();
}

async findOne(id: number) {
  return this.cotisationRepository.findOneBy({id:id});
}

async update(id: number, updateCotisationDto: UpdateCotisationDto) {
  return this.cotisationRepository.update(id, updateCotisationDto);
}

async remove(id: number) {
  return this.cotisationRepository.delete(id);
}
}