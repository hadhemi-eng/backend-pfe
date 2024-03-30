import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/register.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly adminRepository: Repository<User>,
  ) {}
    async create(registerUserDto: RegisterUserDto): Promise<User> {
        const { username, password } = registerUserDto;
    
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user = new User();
        user.username = username;
        user.password = hashedPassword;
    
        return this.adminRepository.save(user);
      }


      async findOne(id: number): Promise<User > {
        return this.adminRepository.findOneBy({id:id});
    }
    
    async findByEmail(email: string): Promise<User> {
      try {
        return await this.adminRepository.findOne({ where: { email } });
      } catch (error) {
        console.error('Error executing findByEmail query:', error);
        throw error; // Rethrow the error to propagate it to the caller
      }

    }
}
