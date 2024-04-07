import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdherentModule } from './adherent/adherent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adherent } from './adherent/entities/adherent.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './authentication/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Adress } from './adherent/entities/adress.entity';
import { User } from './authentication/entities/user';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication/authentication.controller';
import { JwtGuard } from './authentication/jwt-auth.guard';
import { LocalStrategy } from './authentication/local.strategy';

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
  JwtModule.register({
    secretOrPrivateKey: 'secretKey',
    signOptions: {
      expiresIn: '10000',
    },
  }),
  AdherentModule,
  AuthenticationModule],
  controllers: [AppController,AuthenticationController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },{
    provide: APP_GUARD,
    useClass: JwtGuard,
  },
  LocalStrategy,],
})
export class AppModule {}
