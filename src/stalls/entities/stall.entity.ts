import { Cafeteria } from "src/cafeteria/entities/cafeteria.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stall {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    cafetria_id:number;

    @Column({type: 'varchar', length: 100})
    name:string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 10.0 })
    university_share_percent: number;

    @ManyToOne(() => Cafeteria, (cafeteria) => cafeteria.stalls, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cafeteria_id' })
    cafeteria: Cafeteria;

    @OneToMany(() => User, (user) => user.stall)
    users: User[];
}