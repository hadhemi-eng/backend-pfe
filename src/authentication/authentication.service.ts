import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { SignInDto } from './dto/sign.in.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from './dto/admin.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const passwordIsValid = await user.validatePassword(password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    const responseDto: ResponseDto = {
      data: {
        prenomRepresentantLegal: user.prenomRepresentantLegal,
        nomRepresentantLegal: user.nomRepresentantLegal,
        telRepresentantLegal:Number(user.telRepresentantLegal),
        email:user.email,
        matriculeFiscale:user.matriculeFiscale,
        ville:user.ville,
        Gouvernorat:user.Gouvernorat
      },
      jwt: accessToken,
    };
    return responseDto;
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && (await user.validatePassword(password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
