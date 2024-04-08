import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CotisationService } from './cotisation.service';
import { CreateCotisationDto } from './dto/create-cotisation.dto';
import { UpdateCotisationDto } from './dto/update-cotisation.dto';
import { Public } from 'src/authentication/public.decorator';

@Controller('cotisation')
export class CotisationController {
  constructor(private readonly cotisationService: CotisationService) {}
  @Post()
  create(@Body() createCotisationDto: CreateCotisationDto) {
    return this.cotisationService.create(createCotisationDto);
  }

  @Get()
  findAll() {
    return this.cotisationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotisationService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCotisationDto: UpdateCotisationDto) {
    return this.cotisationService.update(+id, updateCotisationDto);
  }
}
