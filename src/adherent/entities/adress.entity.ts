import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("adress")
export class Adress {
    @PrimaryGeneratedColumn()
    public adress_id: number;

    @Column()
    public ville!: string;

    @Column()
    public adresse!: string;
}