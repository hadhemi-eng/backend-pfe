import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Adress } from './adress.entity';
enum AdherentState {
    ACTIVE = 'active',
    WAITING = 'en attente',
    REJECTED = 'rejeté',
  }
  enum AdherentEtat {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }
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

    @Column({ type: 'date' ,default: () => 'CURRENT_TIMESTAMP'})
    dateInscription: Date;

    @Column({ type: 'enum', enum: AdherentState, default: AdherentState.WAITING })
    state: AdherentState;

    @Column({ type: 'enum', enum: AdherentEtat, default: AdherentEtat.ACTIVE })
    etat: AdherentEtat;

    @ManyToOne(() => Adress)
    @JoinColumn({ name: "adress_id" })
    public adress!: Adress;

}
