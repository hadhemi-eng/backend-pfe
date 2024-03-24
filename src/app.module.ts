import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdherentModule } from './adherent/adherent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adherent } from './adherent/entities/adherent.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './authentication/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Adress } from './adherent/entities/adress.entity';
import { User } from './authentication/entities/user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '1234',
    username: 'postgres',
    entities: [Adherent, Adress,User],
    database: 'pfeHadhemi',
    synchronize: true,
    logging: true,
  }),
  UsersModule,
  AdherentModule,
  AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
