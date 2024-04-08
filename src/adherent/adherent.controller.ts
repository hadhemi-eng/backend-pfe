import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Logger, NotFoundException } from '@nestjs/common';
import { AdherentService } from './adherent.service';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';
import { Public } from 'src/authentication/public.decorator';
import { JwtGuard } from 'src/authentication/jwt-auth.guard';
import { validate } from 'class-validator';
import { CreateCotisationDto } from 'src/cotisation/dto/create-cotisation.dto';

@Controller('adherent')
export class AdherentController {
  private readonly logger = new Logger(AdherentController.name);
  constructor(private readonly adherentService: AdherentService) {}
  @Public()
  @Post()
  create(@Body() createAdherentDto: CreateAdherentDto) {
    validate(createAdherentDto).then(errors => {
      if (errors.length > 0) {
          console.log('Validation failed. Errors: ', errors);
      } else {
          console.log('Validation successful. Adherent DTO is valid.');
          // Proceed with further operations if validation is successful
      }
  });
    return this.adherentService.create(createAdherentDto);
  }
  @Public()
  @Get()
  filterAdherents(
    @Query('nom') nom: string,
    @Query('prenom') prenom: string,
    @Query('tel') tel: string
  ) {
    if (nom || prenom || tel) {
    let filterCriteria: any = {};
    if (nom) filterCriteria.nom = nom;
    if (prenom) filterCriteria.prenom = prenom;
    if (tel) filterCriteria.tel = tel;
    this.logger.error(filterCriteria)
    return this.adherentService.filterAdherentsByCriteria(filterCriteria);
  } else {
    return this.adherentService.findAll();
  }
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adherentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdherentDto: UpdateAdherentDto) {
    return this.adherentService.update(+id, updateAdherentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adherentService.remove(+id);
  }
/*   @Public()
  @Post()
  async createCotisationForAdherent(@Param('id') id: string, @Body() createCotisationDto: CreateCotisationDto) {
    validate(createCotisationDto).then(errors => {
      if (errors.length > 0) {
          console.log('Validation failed. Errors: ', errors);
      } else {
          console.log('Validation successful. cotisation DTO is valid.');
          // Proceed with further operations if validation is successful
      }
  });
  const adherent = await this.adherentService.findOne(Number(id));
  if (!adherent) {
    throw new NotFoundException('Adherent not found');
  }
    return this.adherentService.create(createAdherentDto);
  } */

}
