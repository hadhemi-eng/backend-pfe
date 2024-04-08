import { Adherent } from 'src/adherent/entities/adherent.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cotisation {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int'})
  montant: number;

  @Column({ type: 'varchar', length: 15 })
  type: string;

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   date: Date;
   @ManyToOne(() => Adherent, adherent => adherent.cotisationList)
   adherent: Adherent;

}
