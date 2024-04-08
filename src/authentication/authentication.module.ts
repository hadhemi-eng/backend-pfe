import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersService } from './users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { Adress } from 'src/adherent/entities/adress.entity';
import { LocalStrategy } from './local.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Adress]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersService, LocalStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}

