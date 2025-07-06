import { Column, Entity, Not, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cafeteria {
    @PrimaryGeneratedColumn()
    id :number;

    @Column({nullable: false})
    
    name: string;

    @Column({nullable: false})
    location: string;
}
