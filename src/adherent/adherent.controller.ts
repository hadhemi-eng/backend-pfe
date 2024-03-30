import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdherentService } from './adherent.service';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';
import { Public } from 'src/authentication/public.decorator';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { validate } from 'class-validator';

@Controller('adherent')
export class AdherentController {
  constructor(private readonly adherentService: AdherentService) {}
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
  @Get()
  findAll() {
    return this.adherentService.findAll();
  }
  @Get('/filterByName/:searchItem')
  filterByName(@Param('searchItem') searchItem: string) {
    return this.adherentService.filterAdherentsByName(searchItem);
  }
  @Get('/filterByFirstName/:searchItem')
  filterByFirstName(@Param('searchItem') searchItem: string) {
    return this.adherentService.filterAdherentsByFirstName(searchItem);
  } 
   @Get('/filterByPhone/:searchItem')
  filterBySearchItem(@Param('searchItem') searchItem: number) {
    return this.adherentService.filterAdherentsByPhone(searchItem);
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
}
