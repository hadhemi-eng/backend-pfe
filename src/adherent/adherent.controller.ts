import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdherentService } from './adherent.service';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';
import { Public } from 'src/authentication/public.decorator';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@Controller('adherent')
export class AdherentController {
  constructor(private readonly adherentService: AdherentService) {}
  @Post()
  create(@Body() createAdherentDto: CreateAdherentDto) {
    return this.adherentService.create(createAdherentDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adherentService.findAll();
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
