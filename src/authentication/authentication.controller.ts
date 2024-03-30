import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {RegisterUserDto } from './dto/register.user.dto';
import { SignInDto } from './dto/sign.in.dto';
import { UsersService } from './users/users.service';
import { Public } from './public.decorator';
import { validate } from 'class-validator';

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
    // Validate the signInDto object
    const validationErrors = await validate(signInDto);
    
    // Check if validation has failed
    if (validationErrors.length > 0) {
      // If validation fails, create an array of error messages
      const errorMessage = validationErrors.map(error => Object.values(error.constraints)).join(', ');
      
      // Throw an HttpException with the error message and status code 400 (Bad Request)
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
    
    // If validation succeeds, proceed with sign-in
    return this.authService.signIn(signInDto);
  }
}
