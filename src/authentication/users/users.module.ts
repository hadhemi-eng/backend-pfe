import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { UsersService } from './users.service';
import { Adress } from 'src/adherent/entities/adress.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Adress])],
    providers: [UsersService],
    exports: [UsersService],
  })
export class UsersModule {}
