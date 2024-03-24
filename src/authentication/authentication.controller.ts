import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {RegisterUserDto } from './dto/register.user.dto';
import { SignInDto } from './dto/sign.in.dto';
import { UsersService } from './users/users.service';
import { Public } from './public.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}
  @Post('sign-up')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.create(registerUserDto);
  }
@Public()
@Post('sign-in')
async signIn(@Body() signInDto: SignInDto) {
  return this.authService.signIn(signInDto);
}
}
