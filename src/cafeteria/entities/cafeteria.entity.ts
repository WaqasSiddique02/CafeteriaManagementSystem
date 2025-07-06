import { Stall } from "src/stalls/entities/stall.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cafeteria {
    @PrimaryGeneratedColumn()
    id :number;

    @Column({nullable: false})
    
    name: string;

    @Column({nullable: false})
    location: string;

    @OneToMany(() => Stall, (stall) => stall.cafeteria)
    stalls: Stall[];
}