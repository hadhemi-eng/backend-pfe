import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

@Entity()
export class User {
  private readonly logger = new Logger(User.name);

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 30 })
    prenomRepresentantLegal: string;

    @Column({ type: 'varchar', length: 30 })
    nomRepresentantLegal: string;

    @Column({ type: 'varchar', length: 20 }) // Change type to varchar for telephone number
    telRepresentantLegal: string;

    @Column({ type: 'varchar', length: 15 })
    ville: string;

    @Column({ type: 'varchar', length: 15 })
    Gouvernorat: string;
  
    @Column({ type: 'int' })
    matriculeFiscale: number;

    @Column({ type: 'varchar', length: 40 })
    email: string;

    @Column({ type: 'varchar', length: 15 })
    username: string;

    @Column({ type: 'varchar', length: 200 })
    password: string;

    async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
}
