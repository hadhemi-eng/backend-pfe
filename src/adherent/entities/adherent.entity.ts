import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Adress } from './adress.entity';
@Entity()
export class Adherent {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 30 })
    prenom: string;

    @Column({ type: 'varchar', length: 30 })
    nom: string;

    @Column({ type: 'int' })
    tel: number;

    @Column({ type: 'varchar', length: 30 })
    mail: string;
    
    @ManyToOne(() => Adress)
    @JoinColumn({ name: "adress_id" })
    public adress!: Adress;

}