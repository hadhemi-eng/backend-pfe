import { Module } from '@nestjs/common';
import { CotisationService } from './cotisation.service';
import { CotisationController } from './cotisation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotisation } from './entities/cotisation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cotisation])],
  controllers: [CotisationController],
  providers: [CotisationService],
})
export class CotisationModule {}
