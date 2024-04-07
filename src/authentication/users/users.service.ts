import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/register.user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dto/user.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly adminRepository: Repository<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
    const { username, password, email, ...otherProperties } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingUser = await this.adminRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.email = email;
  
    // Assign other properties from DTO to the user entity
    Object.assign(user, otherProperties);

    this.adminRepository.save(user);
    const userResponse: UserResponseDto = {
      username: user.username,
      email: user.email,
      prenomRepresentantLegal: user.prenomRepresentantLegal,
      nomRepresentantLegal: user.nomRepresentantLegal,
      telRepresentantLegal: Number(user.telRepresentantLegal),
      ville: user.ville,
      Gouvernorat: user.Gouvernorat,
      matriculeFiscale: user.matriculeFiscale
  };

  return userResponse;
  }

  async findOne(id: number): Promise<User | null> {
    try {
      return await this.adminRepository.findOneBy({id:id});
    } catch (error) {
      console.error('Error executing findOne query:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.adminRepository.findOne({ where: { email } });
    } catch (error) {
      console.error('Error executing findByEmail query:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
}
