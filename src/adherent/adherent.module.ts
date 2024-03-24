import { Module } from '@nestjs/common';
import { AdherentService } from './adherent.service';
import { AdherentController } from './adherent.controller';
import { Adherent } from './entities/adherent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adherent]),
  TypeOrmModule.forFeature([Adress])],
  controllers: [AdherentController],
  providers: [AdherentService],
})
export class AdherentModule {}
